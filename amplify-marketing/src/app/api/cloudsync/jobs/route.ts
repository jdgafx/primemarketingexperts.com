// ============================================================================
// CloudSync Jobs API - RESTful Endpoints
// GET /api/cloudsync/jobs - List all jobs
// POST /api/cloudsync/jobs - Create new job
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { JobStore, RemoteStore } from '@/lib/api/store';
import { CreateJobSchema } from '@/lib/api/types';
import { handleApiError, ValidationError, NotFoundError } from '@/lib/api/errors';
import { z } from 'zod';

export async function GET() {
    try {
        const jobs = JobStore.getAll();
        const remotes = RemoteStore.getAll();

        // Enrich jobs with remote names
        const enrichedJobs = jobs.map((job) => ({
            ...job,
            sourceRemote: remotes.find((r) => r.id === job.sourceRemoteId),
            destinationRemote: remotes.find((r) => r.id === job.destinationRemoteId),
        }));

        return NextResponse.json({
            data: enrichedJobs,
            error: null,
            meta: { total: jobs.length },
        });
    } catch (error) {
        const { statusCode, body } = handleApiError(error);
        return NextResponse.json(body, { status: statusCode });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input
        const result = CreateJobSchema.safeParse(body);
        if (!result.success) {
            throw new ValidationError('Invalid job data', {
                errors: result.error.flatten().fieldErrors,
            });
        }

        const { sourceRemoteId, destinationRemoteId } = result.data;

        // Verify remotes exist
        if (!RemoteStore.getById(sourceRemoteId)) {
            throw new NotFoundError('Source remote');
        }
        if (!RemoteStore.getById(destinationRemoteId)) {
            throw new NotFoundError('Destination remote');
        }

        // Create job
        const job = JobStore.create({ ...result.data, status: 'idle' });

        return NextResponse.json({
            data: job,
            error: null,
        }, { status: 201 });
    } catch (error) {
        const { statusCode, body } = handleApiError(error);
        return NextResponse.json(body, { status: statusCode });
    }
}
