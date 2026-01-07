// ============================================================================
// CloudSync Jobs API - Run Job
// POST /api/cloudsync/jobs/[id]/run - Trigger job execution
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { JobStore, JobRunStore } from '@/lib/api/store';
import { handleApiError, NotFoundError, ValidationError } from '@/lib/api/errors';

interface RouteContext {
    params: Promise<{ id: string }>;
}

export async function POST(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { id } = await context.params;
        const job = JobStore.getById(id);

        if (!job) {
            throw new NotFoundError('Job');
        }

        // Check if job is already running
        if (job.status === 'running') {
            throw new ValidationError('Job is already running');
        }

        // Create a new run
        const run = JobRunStore.create(id);

        // Update job status
        JobStore.updateStatus(id, 'running');

        // Simulate async job execution
        simulateJobExecution(id, run.id);

        return NextResponse.json({
            data: {
                job: { ...job, status: 'running' },
                run,
            },
            error: null,
        }, { status: 202 }); // 202 Accepted
    } catch (error) {
        const { statusCode, body } = handleApiError(error);
        return NextResponse.json(body, { status: statusCode });
    }
}

// Simulate job execution (in production, this would be a background worker)
function simulateJobExecution(jobId: string, runId: string) {
    const startTime = Date.now();
    let bytesTransferred = 0;
    let filesTransferred = 0;

    const interval = setInterval(() => {
        // Simulate progress
        bytesTransferred += Math.floor(Math.random() * 10000000);
        filesTransferred += Math.floor(Math.random() * 50);

        JobRunStore.update(runId, {
            bytesTransferred,
            filesTransferred,
            logs: [
                `[${new Date().toISOString()}] Transferred ${filesTransferred} files (${formatBytes(bytesTransferred)})`,
            ],
        });
    }, 1000);

    // Complete after 5-10 seconds
    const duration = 5000 + Math.random() * 5000;
    setTimeout(() => {
        clearInterval(interval);

        const finalBytes = bytesTransferred + Math.floor(Math.random() * 50000000);
        const finalFiles = filesTransferred + Math.floor(Math.random() * 100);

        JobRunStore.update(runId, {
            status: 'completed',
            completedAt: new Date().toISOString(),
            bytesTransferred: finalBytes,
            filesTransferred: finalFiles,
            logs: [
                `[${new Date().toISOString()}] Sync completed successfully`,
                `Total: ${finalFiles} files, ${formatBytes(finalBytes)}`,
                `Duration: ${((Date.now() - startTime) / 1000).toFixed(1)}s`,
            ],
        });

        JobStore.update(jobId, {
            status: 'completed',
            lastRunAt: new Date().toISOString(),
        });
    }, duration);
}

function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
