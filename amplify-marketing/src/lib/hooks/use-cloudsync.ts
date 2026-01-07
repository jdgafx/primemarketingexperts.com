// ============================================================================
// CloudSync React Hooks - Data Fetching & Mutations
// ============================================================================

'use client';

import { useState, useEffect, useCallback } from 'react';
import type { SyncJob, RemoteConfig, DashboardStats, ApiResponse, CreateJobInput, CreateRemoteInput } from '@/lib/api/types';

const API_BASE = '/api/cloudsync';

// ----------------------------- Jobs Hook ------------------------------------

interface EnrichedJob extends SyncJob {
    sourceRemote?: RemoteConfig;
    destinationRemote?: RemoteConfig;
}

interface UseJobsReturn {
    jobs: EnrichedJob[];
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
    createJob: (data: CreateJobInput) => Promise<SyncJob | null>;
    updateJob: (id: string, data: Partial<CreateJobInput>) => Promise<SyncJob | null>;
    deleteJob: (id: string) => Promise<boolean>;
    runJob: (id: string) => Promise<boolean>;
}

export function useJobs(): UseJobsReturn {
    const [jobs, setJobs] = useState<EnrichedJob[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchJobs = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const res = await fetch(`${API_BASE}/jobs`);
            const json: ApiResponse<EnrichedJob[]> = await res.json();

            if (json.error) {
                throw new Error(json.error.message);
            }

            setJobs(json.data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    const createJob = async (data: CreateJobInput): Promise<SyncJob | null> => {
        try {
            const res = await fetch(`${API_BASE}/jobs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const json: ApiResponse<SyncJob> = await res.json();

            if (json.error) {
                throw new Error(json.error.message);
            }

            await fetchJobs();
            return json.data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create job');
            return null;
        }
    };

    const updateJob = async (id: string, data: Partial<CreateJobInput>): Promise<SyncJob | null> => {
        try {
            const res = await fetch(`${API_BASE}/jobs/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const json: ApiResponse<SyncJob> = await res.json();

            if (json.error) {
                throw new Error(json.error.message);
            }

            await fetchJobs();
            return json.data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update job');
            return null;
        }
    };

    const deleteJob = async (id: string): Promise<boolean> => {
        try {
            const res = await fetch(`${API_BASE}/jobs/${id}`, {
                method: 'DELETE',
            });
            const json = await res.json();

            if (json.error) {
                throw new Error(json.error.message);
            }

            // Optimistic update
            setJobs((prev) => prev.filter((j) => j.id !== id));
            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete job');
            return false;
        }
    };

    const runJob = async (id: string): Promise<boolean> => {
        try {
            const res = await fetch(`${API_BASE}/jobs/${id}/run`, {
                method: 'POST',
            });
            const json = await res.json();

            if (json.error) {
                throw new Error(json.error.message);
            }

            // Update job status locally
            setJobs((prev) =>
                prev.map((j) => j.id === id ? { ...j, status: 'running' } : j)
            );

            // Poll for completion
            const pollInterval = setInterval(async () => {
                await fetchJobs();
                const updatedJob = jobs.find((j) => j.id === id);
                if (updatedJob && updatedJob.status !== 'running') {
                    clearInterval(pollInterval);
                }
            }, 2000);

            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to run job');
            return false;
        }
    };

    return {
        jobs,
        isLoading,
        error,
        refetch: fetchJobs,
        createJob,
        updateJob,
        deleteJob,
        runJob,
    };
}

// ----------------------------- Remotes Hook ---------------------------------

interface UseRemotesReturn {
    remotes: RemoteConfig[];
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
    createRemote: (data: CreateRemoteInput) => Promise<RemoteConfig | null>;
    updateRemote: (id: string, data: Partial<CreateRemoteInput>) => Promise<RemoteConfig | null>;
    deleteRemote: (id: string) => Promise<boolean>;
}

export function useRemotes(): UseRemotesReturn {
    const [remotes, setRemotes] = useState<RemoteConfig[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRemotes = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const res = await fetch(`${API_BASE}/remotes`);
            const json: ApiResponse<RemoteConfig[]> = await res.json();

            if (json.error) {
                throw new Error(json.error.message);
            }

            setRemotes(json.data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch remotes');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRemotes();
    }, [fetchRemotes]);

    const createRemote = async (data: CreateRemoteInput): Promise<RemoteConfig | null> => {
        try {
            const res = await fetch(`${API_BASE}/remotes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const json: ApiResponse<RemoteConfig> = await res.json();

            if (json.error) {
                throw new Error(json.error.message);
            }

            await fetchRemotes();
            return json.data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create remote');
            return null;
        }
    };

    const updateRemote = async (id: string, data: Partial<CreateRemoteInput>): Promise<RemoteConfig | null> => {
        try {
            const res = await fetch(`${API_BASE}/remotes/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const json: ApiResponse<RemoteConfig> = await res.json();

            if (json.error) {
                throw new Error(json.error.message);
            }

            await fetchRemotes();
            return json.data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update remote');
            return null;
        }
    };

    const deleteRemote = async (id: string): Promise<boolean> => {
        try {
            const res = await fetch(`${API_BASE}/remotes/${id}`, {
                method: 'DELETE',
            });
            const json = await res.json();

            if (json.error) {
                throw new Error(json.error.message);
            }

            setRemotes((prev) => prev.filter((r) => r.id !== id));
            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete remote');
            return false;
        }
    };

    return {
        remotes,
        isLoading,
        error,
        refetch: fetchRemotes,
        createRemote,
        updateRemote,
        deleteRemote,
    };
}

// ----------------------------- Stats Hook -----------------------------------

interface UseStatsReturn {
    stats: DashboardStats | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export function useStats(): UseStatsReturn {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStats = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const res = await fetch(`${API_BASE}/stats`);
            const json: ApiResponse<DashboardStats> = await res.json();

            if (json.error) {
                throw new Error(json.error.message);
            }

            setStats(json.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch stats');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();

        // Auto-refresh every 30 seconds
        const interval = setInterval(fetchStats, 30000);
        return () => clearInterval(interval);
    }, [fetchStats]);

    return {
        stats,
        isLoading,
        error,
        refetch: fetchStats,
    };
}
