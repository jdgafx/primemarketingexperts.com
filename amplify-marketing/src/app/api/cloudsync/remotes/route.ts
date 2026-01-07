// ============================================================================
// CloudSync Remotes API - RESTful Endpoints
// GET /api/cloudsync/remotes - List all remotes
// POST /api/cloudsync/remotes - Create new remote
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { RemoteStore } from '@/lib/api/store';
import { CreateRemoteSchema } from '@/lib/api/types';
import { handleApiError, ValidationError, ConflictError } from '@/lib/api/errors';

export async function GET() {
    try {
        const remotes = RemoteStore.getAll();

        return NextResponse.json({
            data: remotes,
            error: null,
            meta: { total: remotes.length },
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
        const result = CreateRemoteSchema.safeParse(body);
        if (!result.success) {
            throw new ValidationError('Invalid remote data', {
                errors: result.error.flatten().fieldErrors,
            });
        }

        // Check for duplicate names
        const existing = RemoteStore.getAll().find(
            (r) => r.name.toLowerCase() === result.data.name.toLowerCase()
        );
        if (existing) {
            throw new ConflictError(`Remote with name "${result.data.name}" already exists`);
        }

        // Create remote
        const remote = RemoteStore.create(result.data);

        return NextResponse.json({
            data: remote,
            error: null,
        }, { status: 201 });
    } catch (error) {
        const { statusCode, body } = handleApiError(error);
        return NextResponse.json(body, { status: statusCode });
    }
}
