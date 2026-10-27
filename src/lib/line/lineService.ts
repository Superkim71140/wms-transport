import crypto from 'node:crypto';
import type { QuotationRecord } from '@/types/quotation';
import { updateQuotationNotification, getFailedNotifications } from '@/lib/quotations/quotationStore';

const LINE_PUSH_ENDPOINT = 'https://api.line.me/v2/bot/message/push';
const LINE_REPLY_ENDPOINT = 'https://api.line.me/v2/bot/message/reply';

/**
 * Verify LINE webhook signature using HMAC-SHA256
 */
export function verifyLineSignature(rawBody: string, signature: string | null): boolean {
  const channelSecret = process.env.LINE_CHANNEL_SECRET;
  if (!channelSecret) {
    console.error('[LINEService] LINE_CHANNEL_SECRET is not configured.');
    return false;
  }
  if (!signature) {
    return false;
  }

  try {
    const computedSignature = crypto
      .createHmac('sha256', channelSecret)
      .update(rawBody, 'utf-8')
      .digest('base64');

    const expectedBuffer = Buffer.from(computedSignature, 'base64');
    const actualBuffer = Buffer.from(signature, 'base64');

    if (expectedBuffer.length !== actualBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, actualBuffer);
  } catch (err) {
    console.error('[LINEService] Signature verification error:', (err as Error).message);
    return false;
  }
}

/**
 * Send push message to a target (user or group)
 */
export async function sendLinePushMessage(
  to: string,
  text: string
): Promise<{ success: boolean; error?: string }> {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) {
    return { success: false, error: 'LINE_CHANNEL_ACCESS_TOKEN is not configured.' };
  }

  try {
    const response = await fetch(LINE_PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        to,
        messages: [
          {
            type: 'text',
            text,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `LINE API responded with ${response.status}: ${errorText.slice(0, 200)}`,
      };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

/**
 * Send reply message using replyToken
 */
export async function sendLineReplyMessage(
  replyToken: string,
  text: string
): Promise<{ success: boolean; error?: string }> {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) {
    return { success: false, error: 'LINE_CHANNEL_ACCESS_TOKEN is not configured.' };
  }

  try {
    const response = await fetch(LINE_REPLY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        replyToken,
        messages: [
          {
            type: 'text',
            text,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `LINE Reply API responded with ${response.status}: ${errorText.slice(0, 200)}`,
      };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

/**
 * Format quotation record into a concise LINE notification for staff
 */
export function formatQuotationMessage(quotation: QuotationRecord): string {
  const { customer, jobDetails, id, createdAt } = quotation;
  const createdDate = new Date(createdAt);
  const timeFormatted = createdDate.toLocaleString('th-TH', {
    timeZone: 'Asia/Bangkok',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const originText = [jobDetails.origin.district, jobDetails.origin.province].filter(Boolean).join(' ');
  const destText = [jobDetails.destination.district, jobDetails.destination.province].filter(Boolean).join(' ');

  const lines: string[] = [
    `🚚 [คำขอประเมินราคาใหม่] WMS TRANSPORT`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `🔖 รหัสอ้างอิง: ${id}`,
    `👤 ลูกค้า: ${customer.name || 'ไม่ระบุชื่อ'}`,
    `📞 เบอร์โทร: ${customer.phone}`,
  ];

  if (customer.lineId) {
    lines.push(`💬 LINE ID: ${customer.lineId}`);
  }

  lines.push(`📦 ประเภทงาน: ${jobDetails.jobType}`);
  lines.push(`📍 จุดรับของ: ${originText || 'ไม่ระบุ'}`);
  lines.push(`🏁 จุดส่งของ: ${destText || 'ไม่ระบุ'}`);
  lines.push(`📅 วันที่ต้องการ: ${jobDetails.appointmentDate} (${jobDetails.timeSlot || 'ไม่ระบุช่วงเวลา'})`);

  if (jobDetails.liftingHelp) {
    lines.push(`💪 คนยกของ: ${jobDetails.liftingHelp}`);
  }

  if (jobDetails.floorOrigin || jobDetails.floorDestination) {
    lines.push(
      `🛗 ชั้น/ลิฟต์: ต้นทาง ${jobDetails.floorOrigin || '-'} / ปลายทาง ${jobDetails.floorDestination || '-'}`
    );
  }

  if (jobDetails.motorcycleType || jobDetails.motorcycleModel) {
    lines.push(
      `🏍️ ข้อมูลมอเตอร์ไซค์: ${jobDetails.motorcycleType || ''} ${jobDetails.motorcycleModel || ''} (${jobDetails.isRideable || ''})`.trim()
    );
  }

  if (jobDetails.factoryPackaging || jobDetails.factoryWeight) {
    lines.push(
      `🏭 สินค้าโรงงาน: ${jobDetails.factoryPackaging || '-'} / น้ำหนัก ${jobDetails.factoryWeight || '-'} / ส่งบิลกลับ: ${jobDetails.needsPodReturn ? 'ต้องการ' : 'ไม่ต้องการ'}`
    );
  }

  if (jobDetails.cargoDescription) {
    lines.push(`📝 รายการของ: ${jobDetails.cargoDescription}`);
  }

  lines.push(`━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`⏰ บันทึกคำขอเมื่อ: ${timeFormatted}`);

  return lines.join('\n');
}

/**
 * Dispatch notification to the configured staff group
 */
export async function notifyQuotation(
  quotation: QuotationRecord
): Promise<{ success: boolean; error?: string }> {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  const groupId = process.env.LINE_NOTIFICATION_GROUP_ID;

  if (!token) {
    const errorMsg = 'LINE_CHANNEL_ACCESS_TOKEN is not configured';
    await updateQuotationNotification(quotation.id, {
      status: 'failed',
      lastError: errorMsg,
    });
    return { success: false, error: errorMsg };
  }

  if (!groupId) {
    const errorMsg = 'LINE_NOTIFICATION_GROUP_ID is not configured';
    await updateQuotationNotification(quotation.id, {
      status: 'failed',
      lastError: errorMsg,
    });
    return { success: false, error: errorMsg };
  }

  const messageText = formatQuotationMessage(quotation);
  const result = await sendLinePushMessage(groupId, messageText);

  if (result.success) {
    await updateQuotationNotification(quotation.id, {
      status: 'sent',
      sentAt: new Date().toISOString(),
      lastError: undefined,
    });
    console.log(`[LINEService] Notification sent successfully for quotation ${quotation.id} to group ${groupId.slice(0, 6)}...`);
    return { success: true };
  } else {
    await updateQuotationNotification(quotation.id, {
      status: 'failed',
      retryCount: quotation.notification.retryCount + 1,
      lastError: result.error,
    });
    console.error(`[LINEService] Failed to send notification for ${quotation.id}: ${result.error}`);
    return { success: false, error: result.error };
  }
}

/**
 * Retry all pending or failed notifications
 */
export async function retryFailedNotifications(): Promise<{
  retried: number;
  succeeded: number;
  failed: number;
}> {
  const pending = await getFailedNotifications();
  let succeeded = 0;
  let failed = 0;

  for (const quote of pending) {
    const res = await notifyQuotation(quote);
    if (res.success) {
      succeeded++;
    } else {
      failed++;
    }
  }

  return {
    retried: pending.length,
    succeeded,
    failed,
  };
}
