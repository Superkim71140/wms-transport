import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import {
  verifyLineSignature,
  sendLineReplyMessage,
  retryFailedNotifications,
} from '@/lib/line/lineService';

interface LineWebhookEvent {
  type: string;
  replyToken?: string;
  source?: {
    type?: string;
    userId?: string;
    groupId?: string;
    roomId?: string;
  };
  message?: {
    type?: string;
    id?: string;
    text?: string;
  };
  timestamp?: number;
}

export async function POST(request: Request) {
  try {
    // 1. Read raw body as text for HMAC-SHA256 signature verification
    const rawBody = await request.text();
    const signature = request.headers.get('x-line-signature');

    // 2. Verify signature
    const isValid = verifyLineSignature(rawBody, signature);
    if (!isValid) {
      console.warn('[LINE/Webhook] Unauthorized webhook request with invalid or missing signature.');
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    // 3. Parse JSON payload
    let body: { events?: LineWebhookEvent[] };
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Malformed JSON payload' }, { status: 400 });
    }

    const events = body.events || [];

    // 4. Handle LINE webhook verification request (empty events array)
    if (events.length === 0) {
      console.log('[LINE/Webhook] Received webhook verification ping from LINE Platform. Verified OK.');
      return NextResponse.json({ status: 'ok', message: 'Webhook verified' }, { status: 200 });
    }

    // 5. Process each event
    for (const event of events) {
      const { type, source, replyToken, message } = event;

      // Handle Bot Joining a Group Chat
      if (type === 'join' && source?.type === 'group') {
        const groupId = source.groupId;
        console.log(`[LINE/Webhook] Bot invited to join group: ${groupId?.slice(0, 8)}... (Not auto-authorized)`);

        if (replyToken) {
          const setupPasscode = process.env.LINE_SETUP_PASSCODE;
          const welcomeText = [
            `🚚 WMS TRANSPORT Notification Bot เข้าร่วมกลุ่มเรียบร้อยแล้ว`,
            ``,
            `[ขั้นตอนการตั้งค่ากลุ่มรับการแจ้งเตือนงาน]`,
            `⚠️ เพื่อความปลอดภัย ระบบจะไม่เปิดสิทธิ์ให้กลุ่มที่ดึงบอทเข้าอัตโนมัติ`,
            setupPasscode
              ? `หากกลุ่มนี้คือ "กลุ่มงานของเจ้าหน้าที่ WMS" กรุณาพิมพ์คำสั่ง:\n/wms-id <รหัสผ่านความปลอดภัย>`
              : `หากกลุ่มนี้คือ "กลุ่มงานของเจ้าหน้าที่ WMS" กรุณาพิมพ์คำสั่ง:\n/wms-id`,
            ``,
            `เพื่อรับ Group ID สำหรับนำไปบันทึกในเซิร์ฟเวอร์`,
          ].join('\n');

          await sendLineReplyMessage(replyToken, welcomeText);
        }
      }

      // Handle Group Messages (Admin & Setup Commands)
      if (type === 'message' && source?.type === 'group' && message?.type === 'text') {
        const text = (message.text || '').trim();
        const groupId = source.groupId;
        const configuredGroupId = process.env.LINE_NOTIFICATION_GROUP_ID;
        const setupPasscode = process.env.LINE_SETUP_PASSCODE;

        // Command: /wms-id or /wms-id <passcode>
        if (text.startsWith('/wms-id')) {
          if (!replyToken) continue;

          // If passcode is configured, require timing-safe verification
          if (setupPasscode) {
            const parts = text.split(/\s+/);
            const providedPasscode = parts[1] || '';

            let isMatch = false;
            try {
              const expectedBuf = Buffer.from(setupPasscode, 'utf-8');
              const actualBuf = Buffer.from(providedPasscode, 'utf-8');
              if (expectedBuf.length === actualBuf.length) {
                isMatch = crypto.timingSafeEqual(expectedBuf, actualBuf);
              }
            } catch {
              isMatch = false;
            }

            if (!isMatch) {
              await sendLineReplyMessage(
                replyToken,
                `🔒 ต้องระบุรหัสผ่านสำหรับการขอ Group ID:\nกรุณาพิมพ์ /wms-id <รหัสผ่านความปลอดภัย>`
              );
              continue;
            }
          }

          const responseText = [
            `🔐 รหัส Group ID สำหรับกลุ่มนี้คือ:`,
            `${groupId}`,
            ``,
            `ขั้นตอนการเปิดรับการแจ้งเตือน:`,
            `1. คัดลอก Group ID ด้านบน`,
            `2. นำไปตั้งค่าในไฟล์ .env.local หรือ Hosting Environment Variables:`,
            `   LINE_NOTIFICATION_GROUP_ID=${groupId}`,
            `3. รีสตาร์ทเซิร์ฟเวอร์ระบบ`,
            ``,
            `เมื่อตั้งค่าแล้ว คำขอใบเสนอราคาใหม่ทั้งหมดจากเว็บไซต์ WMS จะส่งตรงมายังกลุ่มนี้โดยอัตโนมัติ`,
          ].join('\n');

          await sendLineReplyMessage(replyToken, responseText);
        }

        // Command: /wms-status
        if (text === '/wms-status') {
          if (!replyToken) continue;

          const isAuthorized = Boolean(configuredGroupId && configuredGroupId === groupId);
          let statusText = '';
          if (!configuredGroupId) {
            statusText = `ℹ️ ระบบยังไม่ได้กำหนด LINE_NOTIFICATION_GROUP_ID ในเซิร์ฟเวอร์\nกรุณาพิมพ์ /wms-id ${setupPasscode ? '<รหัสผ่าน> ' : ''}เพื่อดู Group ID แล้วนำไปบันทึกใน Hosting Environment Variables`;
          } else if (isAuthorized) {
            statusText = `✅ กลุ่มนี้คือ "กลุ่มรับการแจ้งเตือนหลัก" ของ WMS TRANSPORT (สถานะ: ได้รับการยืนยันและเปิดใช้งานสมบูรณ์)`;
          } else {
            statusText = `⚠️ กลุ่มนี้ยังไม่ได้รับอนุญาตให้รับการแจ้งเตือน (Group ID ไม่ตรงกับ LINE_NOTIFICATION_GROUP_ID ในเซิร์ฟเวอร์)`;
          }

          await sendLineReplyMessage(replyToken, statusText);
        }

        // Command: /wms-retry
        if (text === '/wms-retry') {
          if (!replyToken) continue;

          const isAuthorized = Boolean(configuredGroupId && configuredGroupId === groupId);
          if (isAuthorized) {
            const retryRes = await retryFailedNotifications();
            await sendLineReplyMessage(
              replyToken,
              `🔄 ตรวจสอบและส่งซ้ำการแจ้งเตือน:\n- รายการค้างส่งทั้งหมด: ${retryRes.retried}\n- ส่งสำเร็จ: ${retryRes.succeeded}\n- ยังคงล้มเหลว: ${retryRes.failed}`
            );
          } else {
            await sendLineReplyMessage(
              replyToken,
              `⚠️ คำสั่งนี้ใช้งานได้เฉพาะในกลุ่มรับการแจ้งเตือนที่ได้รับการยืนยันและบันทึก LINE_NOTIFICATION_GROUP_ID แล้วเท่านั้น`
            );
          }
        }
      }
    }

    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (err) {
    console.error('[LINE/Webhook] Uncaught webhook handler error:', (err as Error).message);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(
    {
      service: 'WMS TRANSPORT LINE Webhook',
      status: 'active',
      method: 'POST only (HTTPS)',
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}
