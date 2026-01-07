// ============================================================================
// In-Memory Data Store (Development Mode)
// Production: Replace with proper database (PostgreSQL, MongoDB, etc.)
// ============================================================================

// import { v4 as uuidv4 } from 'crypto';
import type { SyncJob, RemoteConfig, JobRun, DashboardStats } from './types';

// Generate UUID using crypto
function generateId(): string {
    return crypto.randomUUID();
}

// ----------------------------- In-Memory Storage ----------------------------

interface DataStore {
    jobs: Map<string, SyncJob>;
    remotes: Map<string, RemoteConfig>;
    jobRuns: Map<string, JobRun>;
}

const store: DataStore = {
    jobs: new Map(),
    remotes: new Map(),
    jobRuns: new Map(),
};

// Seed initial data
function seedData() {
    // Seed remotes
    const localRemote: RemoteConfig = {
        id: generateId(),
        name: 'Local Storage',
        type: 'local',
        path: '/data/backup',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    const s3Remote: RemoteConfig = {
        id: generateId(),
        name: 'AWS S3 Bucket',
        type: 's3',
        path: 'my-backup-bucket',
        credentials: {
            accessKeyId: '***',
            region: 'us-east-1',
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    const gdriveRemote: RemoteConfig = {
        id: generateId(),
        name: 'Google Drive',
        type: 'gdrive',
        path: 'CloudSync Backups',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    store.remotes.set(localRemote.id!, localRemote);
    store.remotes.set(s3Remote.id!, s3Remote);
    store.remotes.set(gdriveRemote.id!, gdriveRemote);

    // Seed jobs
    const dailyBackup: SyncJob = {
        id: generateId(),
        name: 'Daily Backup to S3',
        description: 'Syncs local storage to S3 bucket every day at midnight',
        sourceRemoteId: localRemote.id!,
        destinationRemoteId: s3Remote.id!,
        mode: 'sync',
        schedule: {
            enabled: true,
            cron: '0 0 * * *',
            timezone: 'America/New_York',
        },
        filters: {
            exclude: ['*.tmp', '*.log', 'node_modules/**'],
        },
        options: {
            dryRun: false,
            verbose: true,
            transfers: 8,
            checkers: 16,
            retries: 3,
            lowLevelRetries: 10,
        },
        status: 'scheduled',
        lastRunAt: new Date(Date.now() - 86400000).toISOString(),
        nextRunAt: new Date(Date.now() + 86400000).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    const gdriveMirror: SyncJob = {
        id: generateId(),
        name: 'Mirror to Google Drive',
        description: 'Continuous mirror of important documents',
        sourceRemoteId: localRemote.id!,
        destinationRemoteId: gdriveRemote.id!,
        mode: 'copy',
        schedule: {
            enabled: true,
            interval: 3600,
            timezone: 'UTC',
        },
        options: {
            dryRun: false,
            verbose: true,
            transfers: 4,
            checkers: 8,
            retries: 3,
            lowLevelRetries: 10,
        },
        status: 'idle',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    store.jobs.set(dailyBackup.id!, dailyBackup);
    store.jobs.set(gdriveMirror.id!, gdriveMirror);
}

// Initialize with seed data
seedData();

// ----------------------------- Job Operations -------------------------------

export const JobStore = {
    getAll(): SyncJob[] {
        return Array.from(store.jobs.values());
    },

    getById(id: string): SyncJob | undefined {
        return store.jobs.get(id);
    },

    create(job: Omit<SyncJob, 'id' | 'createdAt' | 'updatedAt'>): SyncJob {
        const now = new Date().toISOString();
        const newJob: SyncJob = {
            ...job,
            id: generateId(),
            status: 'idle',
            createdAt: now,
            updatedAt: now,
        };
        store.jobs.set(newJob.id!, newJob);
        return newJob;
    },

    update(id: string, updates: Partial<SyncJob>): SyncJob | undefined {
        const existing = store.jobs.get(id);
        if (!existing) return undefined;

        const updated: SyncJob = {
            ...existing,
            ...updates,
            id: existing.id,
            createdAt: existing.createdAt,
            updatedAt: new Date().toISOString(),
        };
        store.jobs.set(id, updated);
        return updated;
    },

    delete(id: string): boolean {
        return store.jobs.delete(id);
    },

    updateStatus(id: string, status: SyncJob['status']): SyncJob | undefined {
        return this.update(id, { status });
    },
};

// ----------------------------- Remote Operations ----------------------------

export const RemoteStore = {
    getAll(): RemoteConfig[] {
        return Array.from(store.remotes.values());
    },

    getById(id: string): RemoteConfig | undefined {
        return store.remotes.get(id);
    },

    create(remote: Omit<RemoteConfig, 'id' | 'createdAt' | 'updatedAt'>): RemoteConfig {
        const now = new Date().toISOString();
        const newRemote: RemoteConfig = {
            ...remote,
            id: generateId(),
            createdAt: now,
            updatedAt: now,
        };
        store.remotes.set(newRemote.id!, newRemote);
        return newRemote;
    },

    update(id: string, updates: Partial<RemoteConfig>): RemoteConfig | undefined {
        const existing = store.remotes.get(id);
        if (!existing) return undefined;

        const updated: RemoteConfig = {
            ...existing,
            ...updates,
            id: existing.id,
            createdAt: existing.createdAt,
            updatedAt: new Date().toISOString(),
        };
        store.remotes.set(id, updated);
        return updated;
    },

    delete(id: string): boolean {
        // Check if any jobs use this remote
        const jobs = Array.from(store.jobs.values());
        const inUse = jobs.some(
            (j) => j.sourceRemoteId === id || j.destinationRemoteId === id
        );
        if (inUse) return false;

        return store.remotes.delete(id);
    },
};

// ----------------------------- Job Run Operations ---------------------------

export const JobRunStore = {
    getByJobId(jobId: string): JobRun[] {
        return Array.from(store.jobRuns.values()).filter((r) => r.jobId === jobId);
    },

    create(jobId: string): JobRun {
        const run: JobRun = {
            id: generateId(),
            jobId,
            status: 'running',
            startedAt: new Date().toISOString(),
            bytesTransferred: 0,
            filesTransferred: 0,
            errors: [],
            logs: [],
        };
        store.jobRuns.set(run.id, run);
        return run;
    },

    update(id: string, updates: Partial<JobRun>): JobRun | undefined {
        const existing = store.jobRuns.get(id);
        if (!existing) return undefined;

        const updated = { ...existing, ...updates };
        store.jobRuns.set(id, updated);
        return updated;
    },
};

// ----------------------------- Dashboard Stats ------------------------------

export function getDashboardStats(): DashboardStats {
    const jobs = Array.from(store.jobs.values());
    const runs = Array.from(store.jobRuns.values());

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayRuns = runs.filter((r) => new Date(r.startedAt) >= today);

    return {
        totalJobs: jobs.length,
        activeJobs: jobs.filter((j) => j.status === 'running').length,
        totalRemotes: store.remotes.size,
        bytesTransferredToday: todayRuns.reduce((sum, r) => sum + r.bytesTransferred, 0),
        filesTransferredToday: todayRuns.reduce((sum, r) => sum + r.filesTransferred, 0),
        lastSync: runs.length > 0
            ? runs.sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())[0]?.completedAt
            : undefined,
        uptime: 99.9,
        health: 'healthy',
    };
}
