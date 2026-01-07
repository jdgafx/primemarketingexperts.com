'use client';

import { useState } from 'react';
import {
    Play,
    Pause,
    Trash2,
    Edit,
    ArrowRight,
    Clock,
    RefreshCw,
    CheckCircle,
    XCircle,
    AlertCircle,
    Calendar,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { SyncJob, RemoteConfig } from '@/lib/api/types';

interface JobCardProps {
    job: SyncJob & {
        sourceRemote?: RemoteConfig;
        destinationRemote?: RemoteConfig;
    };
    onRun: (id: string) => Promise<boolean>;
    onDelete: (id: string) => Promise<boolean>;
    onEdit: (job: SyncJob) => void;
}

const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; bg: string }> = {
    idle: { icon: Clock, color: 'text-white/60', bg: 'bg-white/10' },
    running: { icon: RefreshCw, color: 'text-blue-400', bg: 'bg-blue-500/20' },
    completed: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
    failed: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/20' },
    paused: { icon: Pause, color: 'text-amber-400', bg: 'bg-amber-500/20' },
    scheduled: { icon: Calendar, color: 'text-purple-400', bg: 'bg-purple-500/20' },
};

const modeLabels: Record<string, string> = {
    sync: 'Mirror Sync',
    copy: 'Copy Only',
    move: 'Move Files',
    bisync: 'Bidirectional',
};

export function JobCard({ job, onRun, onDelete, onEdit }: JobCardProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isRunning, setIsRunning] = useState(false);

    const status = statusConfig[job.status] || statusConfig.idle;
    const StatusIcon = status.icon;

    const handleRun = async () => {
        setIsRunning(true);
        await onRun(job.id!);
        setIsRunning(false);
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        const success = await onDelete(job.id!);
        if (!success) {
            setIsDeleting(false);
        }
        setShowDeleteConfirm(false);
    };

    const formatSchedule = () => {
        if (!job.schedule?.enabled) return 'Manual';
        if (job.schedule.cron) return `Cron: ${job.schedule.cron}`;
        if (job.schedule.interval) {
            const hours = Math.floor(job.schedule.interval / 3600);
            const mins = Math.floor((job.schedule.interval % 3600) / 60);
            if (hours > 0) return `Every ${hours}h${mins > 0 ? ` ${mins}m` : ''}`;
            return `Every ${mins}m`;
        }
        return 'Manual';
    };

    return (
        <>
            <div className="card-apple p-6 hover-lift group border-glow relative overflow-hidden">
                {/* Running Indicator */}
                {job.status === 'running' && (
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse" />
                )}

                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white truncate group-hover:text-blue-400 transition-colors">
                            {job.name}
                        </h3>
                        {job.description && (
                            <p className="text-sm text-white/40 truncate mt-1">{job.description}</p>
                        )}
                    </div>

                    <Badge
                        variant="secondary"
                        className={`${status.bg} ${status.color} border-0 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 shrink-0 ml-3`}
                    >
                        <StatusIcon className={`h-3 w-3 ${job.status === 'running' ? 'animate-spin' : ''}`} />
                        {job.status}
                    </Badge>
                </div>

                {/* Source → Destination */}
                <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Source</div>
                        <div className="text-white font-medium truncate">
                            {job.sourceRemote?.name || 'Unknown'}
                        </div>
                        <div className="text-xs text-white/40 truncate">{job.sourceRemote?.path}</div>
                    </div>

                    <ArrowRight className="h-5 w-5 text-blue-500 shrink-0" />

                    <div className="flex-1 min-w-0 text-right">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Destination</div>
                        <div className="text-white font-medium truncate">
                            {job.destinationRemote?.name || 'Unknown'}
                        </div>
                        <div className="text-xs text-white/40 truncate">{job.destinationRemote?.path}</div>
                    </div>
                </div>

                {/* Meta Row */}
                <div className="flex items-center justify-between text-xs text-white/40 mb-6">
                    <div className="flex items-center gap-4">
                        <span className="font-medium">{modeLabels[job.mode] || job.mode}</span>
                        <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatSchedule()}
                        </span>
                    </div>
                    {job.lastRunAt && (
                        <span>Last run: {new Date(job.lastRunAt).toLocaleDateString()}</span>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleRun}
                        disabled={job.status === 'running' || isRunning}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {job.status === 'running' || isRunning ? (
                            <>
                                <RefreshCw className="h-4 w-4 animate-spin" />
                                Running...
                            </>
                        ) : (
                            <>
                                <Play className="h-4 w-4" />
                                Run Now
                            </>
                        )}
                    </button>

                    <button
                        onClick={() => onEdit(job)}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
                        aria-label="Edit job"
                    >
                        <Edit className="h-4 w-4" />
                    </button>

                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        disabled={isDeleting}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-all disabled:opacity-50"
                        aria-label="Delete job"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
                <DialogContent className="bg-zinc-950 border-white/10">
                    <DialogHeader>
                        <DialogTitle className="text-white flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-red-400" />
                            Delete Job
                        </DialogTitle>
                        <DialogDescription className="text-white/60">
                            Are you sure you want to delete <strong className="text-white">{job.name}</strong>?
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setShowDeleteConfirm(false)}
                            className="bg-transparent border-white/20 text-white hover:bg-white/10"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-500 text-white"
                        >
                            {isDeleting ? 'Deleting...' : 'Delete Job'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
