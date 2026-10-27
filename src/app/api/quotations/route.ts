import { NextResponse } from 'next/server';
import type { QuotationSubmissionInput, QuotationSubmissionResult } from '@/types/quotation';
import { saveQuotation } from '@/lib/quotations/quotationStore';
import { notifyQuotation } from '@/lib/line/lineService';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as QuotationSubmissionInput;

    // Validate required fields
    if (!body.customerPhone) {
      return NextResponse.json(
        { success: false, message: 'กรุณากรอกหมายเลขโทรศัพท์' },
        { status: 400 }
      );
    }

    const cleanPhone = body.customerPhone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 9 || cleanPhone.length > 10) {
      return NextResponse.json(
        {
          success: false,
          message: 'กรุณากรอกหมายเลขโทรศัพท์ 9-10 หลัก ให้ถูกต้อง',
        },
        { status: 400 }
      );
    }

    if (!body.destinationProvince || !body.destinationProvince.trim()) {
      return NextResponse.json(
        { success: false, message: 'กรุณาระบุจังหวัดปลายทาง' },
        { status: 400 }
      );
    }

    if (!body.appointmentDate || !body.appointmentDate.trim()) {
      return NextResponse.json(
        { success: false, message: 'กรุณาระบุวันที่ต้องการขนย้าย' },
        { status: 400 }
      );
    }

    // 1. Persist the quotation first before reporting success
    const { quotation, isDuplicate } = await saveQuotation({
      ...body,
      customerPhone: cleanPhone,
    });

    // 2. Dispatch notification only if not a duplicate
    let notificationStatus = quotation.notification.status;
    if (!isDuplicate) {
      const notifyResult = await notifyQuotation(quotation);
      notificationStatus = notifyResult.success ? 'sent' : 'failed';
    }

    const result: QuotationSubmissionResult = {
      success: true,
      isDuplicate,
      quoteRef: quotation.id,
      notificationStatus,
      formattedSummary: quotation.summaryText || `[รหัสอ้างอิง: ${quotation.id}]`,
      message: isDuplicate
        ? 'คำขอประเมินราคานี้ได้รับการบันทึกไว้ในระบบเรียบร้อยแล้ว'
        : 'บันทึกข้อมูลขอใบเสนอราคาสำเร็จ',
    };

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error('[API/Quotations] Submission processing error:', (err as Error).message);
    return NextResponse.json(
      {
        success: false,
        message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง หรือติดต่อทาง LINE โดยตรง',
      },
      { status: 500 }
    );
  }
}
