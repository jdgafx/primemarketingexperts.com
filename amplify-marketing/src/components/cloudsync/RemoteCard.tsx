'use client';

import { useState } from 'react';
import {
    Trash2,
    Edit,
    HardDrive,
    Cloud,
    FolderSync,
    AlertCircle,
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
import type { RemoteConfig } from '@/lib/api/types';

interface RemoteCardProps {
    remote: RemoteConfig;
    onDelete: (id: string) => Promise<boolean>;
    onEdit: (remote: RemoteConfig) => void;
    inUse?: boolean;
}

const remoteTypeConfig: Record<string, { icon: typeof Cloud; color: string; label: string }> = {
    local: { icon: HardDrive, color: 'text-white/60', label: 'Local' },
    s3: { icon: Cloud, color: 'text-orange-400', label: 'AWS S3' },
    gcs: { icon: Cloud, color: 'text-blue-400', label: 'Google Cloud' },
    azure: { icon: Cloud, color: 'text-cyan-400', label: 'Azure Blob' },
    dropbox: { icon: Cloud, color: 'text-blue-400', label: 'Dropbox' },
    gdrive: { icon: Cloud, color: 'text-green-400', label: 'Google Drive' },
    onedrive: { icon: Cloud, color: 'text-blue-400', label: 'OneDrive' },
    sftp: { icon: FolderSync, color: 'text-amber-400', label: 'SFTP' },
    ftp: { icon: FolderSync, color: 'text-amber-400', label: 'FTP' },
    b2: { icon: Cloud, color: 'text-red-400', label: 'Backblaze B2' },
    mega: { icon: Cloud, color: 'text-red-400', label: 'MEGA' },
    webdav: { icon: FolderSync, color: 'text-purple-400', label: 'WebDAV' },
};

export function RemoteCard({ remote, onDelete, onEdit, inUse = false }: RemoteCardProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const typeConfig = remoteTypeConfig[remote.type] || remoteTypeConfig.local;
    const TypeIcon = typeConfig.icon;

    const handleDelete = async () => {
        setIsDeleting(true);
        setDeleteError(null);

        const success = await onDelete(remote.id!);

        if (!success) {
            setDeleteError('Cannot delete: Remote is in use by a job');
            setIsDeleting(false);
        } else {
            setShowDeleteConfirm(false);
        }
    };

    return (
        <>
            <div className="card-apple p-6 hover-lift group relative overflow-hidden">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${typeConfig.color} group-hover:scale-110 transition-transform duration-300`}>
                        <TypeIcon className="h-6 w-6" />
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onEdit(remote)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                            aria-label="Edit remote"
                        >
                            <Edit className="h-4 w-4" />
                        </button>

                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            disabled={isDeleting}
                            className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
                            aria-label="Delete remote"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Name & Type */}
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                        {remote.name}
                    </h3>
                    <Badge
                        variant="secondary"
                        className="mt-2 bg-white/5 text-white/60 border-0 text-[10px] uppercase tracking-wider font-bold"
                    >
                        {typeConfig.label}
                    </Badge>
                </div>

                {/* Path */}
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Path</div>
                    <div className="text-sm text-white/80 font-mono truncate">{remote.path}</div>
                </div>

                {/* Created Date */}
                {remote.createdAt && (
                    <div className="mt-4 text-xs text-white/30">
                        Added {new Date(remote.createdAt).toLocaleDateString()}
                    </div>
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
                <DialogContent className="bg-zinc-950 border-white/10">
                    <DialogHeader>
                        <DialogTitle className="text-white flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-red-400" />
                            Delete Remote
                        </DialogTitle>
                        <DialogDescription className="text-white/60">
                            Are you sure you want to delete <strong className="text-white">{remote.name}</strong>?
                            {inUse && (
                                <span className="block mt-2 text-amber-400">
                                    ⚠️ This remote may be in use by sync jobs.
                                </span>
                            )}
                        </DialogDescription>
                    </DialogHeader>

                    {deleteError && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            {deleteError}
                        </div>
                    )}

                    <DialogFooter className="gap-2">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setShowDeleteConfirm(false);
                                setDeleteError(null);
                            }}
                            className="bg-transparent border-white/20 text-white hover:bg-white/10"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-500 text-white"
                        >
                            {isDeleting ? 'Deleting...' : 'Delete Remote'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
