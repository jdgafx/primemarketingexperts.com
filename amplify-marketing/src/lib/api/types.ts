// ============================================================================
// CloudSync API Types - Zod Schemas + TypeScript Interfaces
// ============================================================================

import { z } from 'zod';

// ----------------------------- Remote Types ---------------------------------

export const RemoteTypeSchema = z.enum([
    'local',
    's3',
    'gcs',
    'azure',
    'dropbox',
    'gdrive',
    'onedrive',
    'sftp',
    'ftp',
    'b2',
    'mega',
    'webdav',
]);

export type RemoteType = z.infer<typeof RemoteTypeSchema>;

export const RemoteConfigSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(1, 'Remote name is required').max(50),
    type: RemoteTypeSchema,
    path: z.string().min(1, 'Path is required'),
    credentials: z.record(z.string(), z.string()).optional(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
});

export type RemoteConfig = z.infer<typeof RemoteConfigSchema>;

export const CreateRemoteSchema = RemoteConfigSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export type CreateRemoteInput = z.infer<typeof CreateRemoteSchema>;

// ----------------------------- Job Types ------------------------------------

export const JobScheduleSchema = z.object({
    enabled: z.boolean().default(false),
    cron: z.string().optional(),
    interval: z.number().min(60).optional(), // seconds
    timezone: z.string().default('UTC'),
});

export type JobSchedule = z.infer<typeof JobScheduleSchema>;

export const SyncModeSchema = z.enum([
    'sync',        // Standard sync (mirror)
    'copy',        // Copy without deleting
    'move',        // Move files
    'bisync',      // Bidirectional sync
]);

export type SyncMode = z.infer<typeof SyncModeSchema>;

export const JobStatusSchema = z.enum([
    'idle',
    'running',
    'completed',
    'failed',
    'paused',
    'scheduled',
]);

export type JobStatus = z.infer<typeof JobStatusSchema>;

export const SyncJobSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(1, 'Job name is required').max(100),
    description: z.string().max(500).optional(),
    sourceRemoteId: z.string().uuid(),
    sourcePath: z.string().optional(),
    destinationRemoteId: z.string().uuid(),
    destinationPath: z.string().optional(),
    mode: SyncModeSchema.default('sync'),
    schedule: JobScheduleSchema.optional(),
    filters: z.object({
        include: z.array(z.string()).optional(),
        exclude: z.array(z.string()).optional(),
        minSize: z.string().optional(),
        maxSize: z.string().optional(),
        minAge: z.string().optional(),
        maxAge: z.string().optional(),
    }).optional(),
    options: z.object({
        dryRun: z.boolean().default(false),
        verbose: z.boolean().default(true),
        bandwidth: z.string().optional(), // e.g., "10M"
        transfers: z.number().min(1).max(64).default(4),
        checkers: z.number().min(1).max(64).default(8),
        retries: z.number().min(0).max(10).default(3),
        lowLevelRetries: z.number().min(1).max(20).default(10),
    }).optional(),
    status: JobStatusSchema.default('idle'),
    lastRunAt: z.string().datetime().optional(),
    nextRunAt: z.string().datetime().optional(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
});

export type SyncJob = z.infer<typeof SyncJobSchema>;

export const CreateJobSchema = SyncJobSchema.omit({
    id: true,
    status: true,
    lastRunAt: true,
    nextRunAt: true,
    createdAt: true,
    updatedAt: true,
});

export type CreateJobInput = z.infer<typeof CreateJobSchema>;

export const UpdateJobSchema = CreateJobSchema.partial();

export type UpdateJobInput = z.infer<typeof UpdateJobSchema>;

// ----------------------------- Job Run Types --------------------------------

export const JobRunSchema = z.object({
    id: z.string().uuid(),
    jobId: z.string().uuid(),
    status: JobStatusSchema,
    startedAt: z.string().datetime(),
    completedAt: z.string().datetime().optional(),
    bytesTransferred: z.number().default(0),
    filesTransferred: z.number().default(0),
    errors: z.array(z.string()).default([]),
    logs: z.array(z.string()).default([]),
});

export type JobRun = z.infer<typeof JobRunSchema>;

// ----------------------------- API Response Types ---------------------------

export const ApiErrorSchema = z.object({
    code: z.string(),
    message: z.string(),
    details: z.record(z.string(), z.unknown()).optional(),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;

export interface ApiResponse<T> {
    data: T | null;
    error: ApiError | null;
    meta?: {
        total?: number;
        page?: number;
        limit?: number;
        hasMore?: boolean;
    };
}

// ----------------------------- Dashboard Stats ------------------------------

export const DashboardStatsSchema = z.object({
    totalJobs: z.number(),
    activeJobs: z.number(),
    totalRemotes: z.number(),
    bytesTransferredToday: z.number(),
    filesTransferredToday: z.number(),
    lastSync: z.string().datetime().optional(),
    uptime: z.number(), // percentage
    health: z.enum(['healthy', 'warning', 'critical']),
});

export type DashboardStats = z.infer<typeof DashboardStatsSchema>;
