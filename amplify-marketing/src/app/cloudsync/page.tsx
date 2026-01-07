'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    CloudSync,
    RefreshCw,
    ArrowLeft,
    FolderSync,
    HardDrive,
    AlertCircle,
    Inbox,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

import { useJobs, useRemotes, useStats } from '@/lib/hooks/use-cloudsync';
import { StatsBar } from '@/components/cloudsync/StatsBar';
import { JobCard } from '@/components/cloudsync/JobCard';
import { RemoteCard } from '@/components/cloudsync/RemoteCard';
import { CreateJobDialog } from '@/components/cloudsync/CreateJobDialog';
import { CreateRemoteDialog } from '@/components/cloudsync/CreateRemoteDialog';
import type { SyncJob, RemoteConfig } from '@/lib/api/types';

export default function CloudSyncDashboard() {
    const { stats, isLoading: statsLoading, refetch: refetchStats } = useStats();
    const { jobs, isLoading: jobsLoading, error: jobsError, refetch: refetchJobs, createJob, deleteJob, runJob } = useJobs();
    const { remotes, isLoading: remotesLoading, error: remotesError, refetch: refetchRemotes, createRemote, deleteRemote } = useRemotes();

    const [activeTab, setActiveTab] = useState('jobs');
    const [editingJob, setEditingJob] = useState<SyncJob | null>(null);
    const [editingRemote, setEditingRemote] = useState<RemoteConfig | null>(null);

    const handleRefresh = async () => {
        await Promise.all([refetchStats(), refetchJobs(), refetchRemotes()]);
    };

    const handleCreateJob = async (data: Parameters<typeof createJob>[0]) => {
        const result = await createJob(data);
        if (result) {
            await refetchStats();
        }
        return result;
    };

    const handleCreateRemote = async (data: Parameters<typeof createRemote>[0]) => {
        const result = await createRemote(data);
        if (result) {
            await refetchStats();
        }
        return result;
    };

    return (
        <main className="min-h-screen bg-black relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-noise pointer-events-none z-[1]" />
            <div className="fixed inset-0 bg-grid-white mask-radial-faded pointer-events-none opacity-20 z-0" />

            {/* Gradient Orbs */}
            <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10">
                {/* Header */}
                <header className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
                    <div className="container-apple py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/"
                                    className="p-2 rounded-xl hover:bg-white/5 text-white/60 hover:text-white transition-all"
                                    aria-label="Back to home"
                                >
                                    <ArrowLeft className="h-5 w-5" />
                                </Link>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                                        <CloudSync className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-bold text-white tracking-tight">CloudSync</h1>
                                        <p className="text-xs text-white/40">Advanced File Synchronization</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleRefresh}
                                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all group"
                                    aria-label="Refresh data"
                                >
                                    <RefreshCw className={`h-4 w-4 ${statsLoading || jobsLoading || remotesLoading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="container-apple py-8">
                    {/* Stats Bar */}
                    <StatsBar stats={stats} isLoading={statsLoading} />

                    {/* Error Alert */}
                    {(jobsError || remotesError) && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                            <div>
                                <div className="font-bold text-red-400">Error Loading Data</div>
                                <div className="text-sm text-red-300/80">{jobsError || remotesError}</div>
                            </div>
                        </div>
                    )}

                    {/* Tabs */}
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl">
                                <TabsTrigger
                                    value="jobs"
                                    className="px-6 py-2.5 rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/60 font-medium transition-all"
                                >
                                    <FolderSync className="h-4 w-4 mr-2" />
                                    Jobs
                                    <Badge variant="secondary" className="ml-2 bg-white/10 text-white/60 border-0 text-[10px]">
                                        {jobs.length}
                                    </Badge>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="remotes"
                                    className="px-6 py-2.5 rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/60 font-medium transition-all"
                                >
                                    <HardDrive className="h-4 w-4 mr-2" />
                                    Remotes
                                    <Badge variant="secondary" className="ml-2 bg-white/10 text-white/60 border-0 text-[10px]">
                                        {remotes.length}
                                    </Badge>
                                </TabsTrigger>
                            </TabsList>

                            {/* Create Buttons */}
                            <div className="flex items-center gap-3">
                                {activeTab === 'jobs' && (
                                    <CreateJobDialog remotes={remotes} onSubmit={handleCreateJob} />
                                )}
                                {activeTab === 'remotes' && (
                                    <CreateRemoteDialog onSubmit={handleCreateRemote} />
                                )}
                            </div>
                        </div>

                        {/* Jobs Tab */}
                        <TabsContent value="jobs" className="space-y-4 mt-0">
                            {jobsLoading ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="card-apple p-6 animate-pulse">
                                            <div className="flex items-start justify-between mb-6">
                                                <div className="flex-1">
                                                    <div className="h-6 w-48 bg-white/10 rounded mb-2" />
                                                    <div className="h-4 w-32 bg-white/5 rounded" />
                                                </div>
                                                <div className="h-6 w-20 bg-white/10 rounded-full" />
                                            </div>
                                            <div className="h-24 bg-white/5 rounded-xl mb-6" />
                                            <div className="flex gap-2">
                                                <div className="flex-1 h-10 bg-white/10 rounded-xl" />
                                                <div className="h-10 w-10 bg-white/5 rounded-xl" />
                                                <div className="h-10 w-10 bg-white/5 rounded-xl" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : jobs.length === 0 ? (
                                <EmptyState
                                    icon={FolderSync}
                                    title="No sync jobs yet"
                                    description="Create your first sync job to start backing up and synchronizing your files."
                                >
                                    <CreateJobDialog remotes={remotes} onSubmit={handleCreateJob} />
                                </EmptyState>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {jobs.map((job) => (
                                        <JobCard
                                            key={job.id}
                                            job={job}
                                            onRun={runJob}
                                            onDelete={deleteJob}
                                            onEdit={setEditingJob}
                                        />
                                    ))}
                                </div>
                            )}
                        </TabsContent>

                        {/* Remotes Tab */}
                        <TabsContent value="remotes" className="space-y-4 mt-0">
                            {remotesLoading ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="card-apple p-6 animate-pulse">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="h-12 w-12 bg-white/10 rounded-xl" />
                                            </div>
                                            <div className="h-6 w-36 bg-white/10 rounded mb-2" />
                                            <div className="h-5 w-20 bg-white/5 rounded-full mb-4" />
                                            <div className="h-16 bg-white/5 rounded-lg" />
                                        </div>
                                    ))}
                                </div>
                            ) : remotes.length === 0 ? (
                                <EmptyState
                                    icon={HardDrive}
                                    title="No remotes configured"
                                    description="Add your first remote storage location to start syncing files."
                                >
                                    <CreateRemoteDialog onSubmit={handleCreateRemote} />
                                </EmptyState>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {remotes.map((remote) => (
                                        <RemoteCard
                                            key={remote.id}
                                            remote={remote}
                                            onDelete={deleteRemote}
                                            onEdit={setEditingRemote}
                                        />
                                    ))}
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </main>
    );
}

// Empty State Component
function EmptyState({
    icon: Icon,
    title,
    description,
    children,
}: {
    icon: typeof Inbox;
    title: string;
    description: string;
    children?: React.ReactNode;
}) {
    return (
        <div className="card-apple p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 mx-auto mb-6">
                <Icon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-white/40 mb-8 max-w-md mx-auto">{description}</p>
            {children}
        </div>
    );
}
