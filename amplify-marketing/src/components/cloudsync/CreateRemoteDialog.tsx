'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, HardDrive, Cloud, FolderSync } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { CreateRemoteInput, RemoteType } from '@/lib/api/types';

interface CreateRemoteDialogProps {
    onSubmit: (data: CreateRemoteInput) => Promise<unknown>;
    trigger?: React.ReactNode;
}

const remoteTypes: { value: RemoteType; label: string; icon: typeof Cloud; color: string }[] = [
    { value: 'local', label: 'Local Storage', icon: HardDrive, color: 'text-white/60' },
    { value: 's3', label: 'AWS S3', icon: Cloud, color: 'text-orange-400' },
    { value: 'gcs', label: 'Google Cloud Storage', icon: Cloud, color: 'text-blue-400' },
    { value: 'gdrive', label: 'Google Drive', icon: Cloud, color: 'text-green-400' },
    { value: 'dropbox', label: 'Dropbox', icon: Cloud, color: 'text-blue-400' },
    { value: 'onedrive', label: 'OneDrive', icon: Cloud, color: 'text-blue-400' },
    { value: 'azure', label: 'Azure Blob', icon: Cloud, color: 'text-cyan-400' },
    { value: 'sftp', label: 'SFTP', icon: FolderSync, color: 'text-amber-400' },
    { value: 'ftp', label: 'FTP', icon: FolderSync, color: 'text-amber-400' },
    { value: 'b2', label: 'Backblaze B2', icon: Cloud, color: 'text-red-400' },
    { value: 'mega', label: 'MEGA', icon: Cloud, color: 'text-red-400' },
    { value: 'webdav', label: 'WebDAV', icon: FolderSync, color: 'text-purple-400' },
];

const pathPlaceholders: Partial<Record<RemoteType, string>> = {
    local: '/path/to/directory',
    s3: 'bucket-name/prefix',
    gcs: 'bucket-name/prefix',
    gdrive: 'folder-name',
    dropbox: '/path/in/dropbox',
    onedrive: '/path/in/onedrive',
    azure: 'container/path',
    sftp: '/remote/path',
    ftp: '/remote/path',
    b2: 'bucket-name/prefix',
    mega: '/path/in/mega',
    webdav: '/remote/path',
};

interface FormData {
    name: string;
    type: RemoteType;
    path: string;
}

export function CreateRemoteDialog({ onSubmit, trigger }: CreateRemoteDialogProps) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            name: '',
            type: 'local',
            path: '',
        },
    });

    const selectedType = watch('type');
    const selectedTypeConfig = remoteTypes.find((t) => t.value === selectedType);
    const TypeIcon = selectedTypeConfig?.icon || Cloud;

    const onFormSubmit = async (data: FormData) => {
        setIsSubmitting(true);

        const remoteData: CreateRemoteInput = {
            name: data.name,
            type: data.type,
            path: data.path,
        };

        await onSubmit(remoteData);
        setIsSubmitting(false);
        setOpen(false);
        reset();
    };

    const defaultTrigger = (
        <button className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-sm transition-all hover:scale-105">
            <Plus className="h-4 w-4" />
            Add Remote
        </button>
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>

            <DialogContent className="bg-zinc-950 border-white/10 max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-white text-2xl font-bold flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center ${selectedTypeConfig?.color || 'text-white/60'}`}>
                            <TypeIcon className="h-5 w-5" />
                        </div>
                        Add Remote
                    </DialogTitle>
                    <DialogDescription className="text-white/60">
                        Configure a new storage location for sync jobs.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5 mt-4">
                    {/* Name */}
                    <div>
                        <Label htmlFor="remote-name" className="text-white/80 text-sm font-medium">
                            Remote Name <span className="text-red-400">*</span>
                        </Label>
                        <Input
                            id="remote-name"
                            {...register('name', { required: 'Name is required' })}
                            placeholder="My Cloud Storage"
                            className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-blue-500"
                        />
                        {errors.name && (
                            <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Type */}
                    <div>
                        <Label className="text-white/80 text-sm font-medium">
                            Remote Type <span className="text-red-400">*</span>
                        </Label>
                        <Select
                            value={selectedType}
                            onValueChange={(v) => setValue('type', v as RemoteType)}
                        >
                            <SelectTrigger className="mt-1.5 bg-white/5 border-white/10 text-white">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-white/10 max-h-[300px]">
                                {remoteTypes.map((type) => {
                                    const Icon = type.icon;
                                    return (
                                        <SelectItem
                                            key={type.value}
                                            value={type.value}
                                            className="text-white focus:bg-white/10 focus:text-white"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Icon className={`h-4 w-4 ${type.color}`} />
                                                {type.label}
                                            </div>
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Path */}
                    <div>
                        <Label htmlFor="remote-path" className="text-white/80 text-sm font-medium">
                            Path <span className="text-red-400">*</span>
                        </Label>
                        <Input
                            id="remote-path"
                            {...register('path', { required: 'Path is required' })}
                            placeholder={pathPlaceholders[selectedType] || '/path'}
                            className="mt-1.5 bg-white/5 border-white/10 text-white font-mono text-sm placeholder:text-white/30 focus:border-blue-500"
                        />
                        {errors.path && (
                            <p className="mt-1 text-xs text-red-400">{errors.path.message}</p>
                        )}
                        <p className="mt-1 text-xs text-white/40">
                            {selectedType === 'local'
                                ? 'Absolute path to directory on local filesystem'
                                : 'Bucket name, container, or path in the cloud storage'
                            }
                        </p>
                    </div>

                    {/* Cloud-specific notice */}
                    {selectedType !== 'local' && (
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm text-blue-300">
                            <strong>Note:</strong> Cloud remotes require rclone configuration.
                            Run <code className="font-mono bg-blue-500/20 px-1 rounded">rclone config</code> to set up credentials.
                        </div>
                    )}

                    <DialogFooter className="gap-2 pt-4 border-t border-white/10">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setOpen(false);
                                reset();
                            }}
                            className="bg-transparent border-white/20 text-white hover:bg-white/10"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold"
                        >
                            {isSubmitting ? 'Adding...' : 'Add Remote'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
