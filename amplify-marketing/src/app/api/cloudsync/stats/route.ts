// ============================================================================
// CloudSync Dashboard Stats API
// GET /api/cloudsync/stats - Get dashboard statistics
// ============================================================================

import { NextResponse } from 'next/server';
import { getDashboardStats } from '@/lib/api/store';
import { handleApiError } from '@/lib/api/errors';

export async function GET() {
    try {
        const stats = getDashboardStats();

        return NextResponse.json({
            data: stats,
            error: null,
        });
    } catch (error) {
        const { statusCode, body } = handleApiError(error);
        return NextResponse.json(body, { status: statusCode });
    }
}
