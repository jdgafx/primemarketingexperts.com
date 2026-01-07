// ============================================================================
// CloudSync Remotes API - Single Remote Operations
// GET /api/cloudsync/remotes/[id] - Get remote by ID
// PUT /api/cloudsync/remotes/[id] - Update remote
// DELETE /api/cloudsync/remotes/[id] - Delete remote
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { RemoteStore, JobStore } from '@/lib/api/store';
import { CreateRemoteSchema } from '@/lib/api/types';
import { handleApiError, ValidationError, NotFoundError, ConflictError } from '@/lib/api/errors';

interface RouteContext {
    params: Promise<{ id: string }>;
}

export async function GET(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { id } = await context.params;
        const remote = RemoteStore.getById(id);

        if (!remote) {
            throw new NotFoundError('Remote');
        }

        return NextResponse.json({
            data: remote,
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
        const result = CreateRemoteSchema.partial().safeParse(body);
        if (!result.success) {
            throw new ValidationError('Invalid remote data', {
                errors: result.error.flatten().fieldErrors,
            });
        }

        // Check for duplicate names (excluding current remote)
        if (result.data.name) {
            const existing = RemoteStore.getAll().find(
                (r) => r.id !== id && r.name.toLowerCase() === result.data.name!.toLowerCase()
            );
            if (existing) {
                throw new ConflictError(`Remote with name "${result.data.name}" already exists`);
            }
        }

        const updated = RemoteStore.update(id, result.data);
        if (!updated) {
            throw new NotFoundError('Remote');
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

        if (!RemoteStore.getById(id)) {
            throw new NotFoundError('Remote');
        }

        // Check if remote is in use
        const jobs = JobStore.getAll();
        const inUse = jobs.find(
            (j) => j.sourceRemoteId === id || j.destinationRemoteId === id
        );

        if (inUse) {
            throw new ConflictError(
                `Cannot delete remote: it is used by job "${inUse.name}"`
            );
        }

        RemoteStore.delete(id);

        return NextResponse.json({
            data: { success: true },
            error: null,
        });
    } catch (error) {
        const { statusCode, body } = handleApiError(error);
        return NextResponse.json(body, { status: statusCode });
    }
}
