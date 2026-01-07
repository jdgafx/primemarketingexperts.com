// ============================================================================
// CloudSync Jobs API - Single Job Operations
// GET /api/cloudsync/jobs/[id] - Get job by ID
// PUT /api/cloudsync/jobs/[id] - Update job
// DELETE /api/cloudsync/jobs/[id] - Delete job
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { JobStore, RemoteStore } from '@/lib/api/store';
import { UpdateJobSchema } from '@/lib/api/types';
import { handleApiError, ValidationError, NotFoundError } from '@/lib/api/errors';

interface RouteContext {
    params: Promise<{ id: string }>;
}

export async function GET(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { id } = await context.params;
        const job = JobStore.getById(id);

        if (!job) {
            throw new NotFoundError('Job');
        }

        const remotes = RemoteStore.getAll();
        const enrichedJob = {
            ...job,
            sourceRemote: remotes.find((r) => r.id === job.sourceRemoteId),
            destinationRemote: remotes.find((r) => r.id === job.destinationRemoteId),
        };

        return NextResponse.json({
            data: enrichedJob,
            error: null,
        });
    } catch (error) {
        const { statusCode, body } = handleApiError(error);
        return NextResponse.json(body, { status: statusCode });
    }
}

export async function PUT(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { id } = await context.params;
        const body = await request.json();

        // Validate input
        const result = UpdateJobSchema.safeParse(body);
        if (!result.success) {
            throw new ValidationError('Invalid job data', {
                errors: result.error.flatten().fieldErrors,
            });
        }

        // Verify remotes if being updated
        if (result.data.sourceRemoteId && !RemoteStore.getById(result.data.sourceRemoteId)) {
            throw new NotFoundError('Source remote');
        }
        if (result.data.destinationRemoteId && !RemoteStore.getById(result.data.destinationRemoteId)) {
            throw new NotFoundError('Destination remote');
        }

        const updated = JobStore.update(id, result.data);
        if (!updated) {
            throw new NotFoundError('Job');
        }

        return NextResponse.json({
            data: updated,
            error: null,
        });
    } catch (error) {
        const { statusCode, body } = handleApiError(error);
        return NextResponse.json(body, { status: statusCode });
    }
}

export async function DELETE(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { id } = await context.params;

        if (!JobStore.getById(id)) {
            throw new NotFoundError('Job');
        }

        JobStore.delete(id);

        return NextResponse.json({
            data: { success: true },
            error: null,
        });
    } catch (error) {
        const { statusCode, body } = handleApiError(error);
        return NextResponse.json(body, { status: statusCode });
    }
}
