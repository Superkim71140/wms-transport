import { NextResponse } from 'next/server';
import { isRequestAuthorized } from '@/lib/seo-monitor/auth';
import {
  executeInspectionBatch,
  calculateInspectionProgress
} from '@/lib/seo-monitor/inspection-service';

export async function GET(request: Request) {
  if (!isRequestAuthorized(request)) {
    return NextResponse.json(
      { error: 'Unauthorized: Authentication required.' },
      { status: 401 }
    );
  }

  try {
    const progress = await calculateInspectionProgress();
    return NextResponse.json({ ok: true, progress });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || 'Failed to calculate inspection progress' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!isRequestAuthorized(request)) {
    return NextResponse.json(
      { error: 'Unauthorized: Authentication required to run inspection batches.' },
      { status: 401 }
    );
  }

  try {
    let batchSize = 10;
    try {
      const body = await request.json();
      if (body && typeof body.batchSize === 'number' && body.batchSize > 0) {
        batchSize = Math.min(body.batchSize, 25);
      }
    } catch {}

    const result = await executeInspectionBatch(batchSize);
    return NextResponse.json({ ok: true, ...result });
  } catch (e: any) {
    const isConflict = e.message?.includes('currently in progress');
    return NextResponse.json(
      { error: e.message || 'Inspection batch execution failed' },
      { status: isConflict ? 409 : 500 }
    );
  }
}

