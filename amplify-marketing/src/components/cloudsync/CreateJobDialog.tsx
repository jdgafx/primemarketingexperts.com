'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Cloud, ArrowRight, Settings2, Filter, FolderSearch } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { FileBrowser } from './FileBrowser';
import type { RemoteConfig, CreateJobInput, SyncMode } from '@/lib/api/types';

interface CreateJobDialogProps {
    remotes: RemoteConfig[];
    onSubmit: (data: CreateJobInput) => Promise<unknown>;
    trigger?: React.ReactNode;
}

const syncModes: { value: SyncMode; label: string; description: string }[] = [
    { value: 'sync', label: 'Mirror Sync', description: 'Full sync, deletes files at destination not in source' },
    { value: 'copy', label: 'Copy Only', description: 'Copies new/changed files, never deletes' },
    { value: 'move', label: 'Move Files', description: 'Moves files from source to destination' },
    { value: 'bisync', label: 'Bidirectional', description: 'Two-way sync keeping both sides updated' },
];

interface FormData {
    name: string;
    description: string;
    sourceRemoteId: string;
    destinationRemoteId: string;
    sourcePath?: string;
    destinationPath?: string;
    mode: SyncMode;
    scheduleEnabled: boolean;
    scheduleType: 'cron' | 'interval';
    cronExpression: string;
    intervalMinutes: number;
    timezone: string;
    excludePatterns: string;
    transfers: number;
    retries: number;
    dryRun: boolean;
}

export function CreateJobDialog({ remotes, onSubmit, trigger }: CreateJobDialogProps) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [browsingSide, setBrowsingSide] = useState<'source' | 'destination' | null>(null);

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
            description: '',
            sourceRemoteId: '',
            destinationRemoteId: '',
            sourcePath: '',
            destinationPath: '',
            mode: 'sync',
            scheduleEnabled: false,
            scheduleType: 'interval',
            cronExpression: '0 0 * * *',
            intervalMinutes: 60,
            timezone: 'UTC',
            excludePatterns: '',
            transfers: 4,
            retries: 3,
            dryRun: false,
        },
    });

    const scheduleEnabled = watch('scheduleEnabled');
    const scheduleType = watch('scheduleType');
    const sourceRemoteId = watch('sourceRemoteId');
    const destinationRemoteId = watch('destinationRemoteId');
    const sourcePath = watch('sourcePath');
    const destinationPath = watch('destinationPath');
    const selectedMode = watch('mode');

    const selectedSourceRemote = remotes.find(r => r.id === sourceRemoteId);
    const selectedDestRemote = remotes.find(r => r.id === destinationRemoteId);

    const onFormSubmit = async (data: FormData) => {
        setIsSubmitting(true);

        const jobData: CreateJobInput = {
            name: data.name,
            description: data.description || undefined,
            sourceRemoteId: data.sourceRemoteId,
            sourcePath: data.sourcePath || undefined,
            destinationRemoteId: data.destinationRemoteId,
            destinationPath: data.destinationPath || undefined,
            mode: data.mode,
            schedule: data.scheduleEnabled
                ? {
                    enabled: true,
                    timezone: data.timezone,
                    ...(data.scheduleType === 'cron'
                        ? { cron: data.cronExpression }
                        : { interval: data.intervalMinutes * 60 }),
                }
                : undefined,
            filters: data.excludePatterns
                ? { exclude: data.excludePatterns.split('\n').filter(Boolean) }
                : undefined,
            options: {
                dryRun: data.dryRun,
                verbose: true,
                transfers: data.transfers,
                checkers: 8,
                retries: data.retries,
                lowLevelRetries: 10,
            },
        };

        await onSubmit(jobData);
        setIsSubmitting(false);
        setOpen(false);
        reset();
        setShowAdvanced(false);
    };

    const defaultTrigger = (
        <button className="flex items-center gap-2 px-5 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all hover:scale-105 shadow-[0_8px_30px_rgba(37,99,235,0.3)]">
            <Plus className="h-4 w-4" />
            New Job
        </button>
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>

            <DialogContent className="bg-zinc-950 border-white/10 max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-white text-2xl font-bold flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                            <Cloud className="h-5 w-5" />
                        </div>
                        Create Sync Job
                    </DialogTitle>
                    <DialogDescription className="text-white/60">
                        Configure a new synchronization job between two remotes.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 mt-4">
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name" className="text-white/80 text-sm font-medium">
                                Job Name <span className="text-red-400">*</span>
                            </Label>
                            <Input
                                id="name"
                                {...register('name', { required: 'Job name is required' })}
                                placeholder="Daily Backup to Cloud"
                                className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-blue-500 focus:ring-blue-500/20"
                            />
                            {errors.name && (
                                <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="description" className="text-white/80 text-sm font-medium">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                {...register('description')}
                                placeholder="Optional description of what this job does..."
                                rows={2}
                                className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-blue-500 resize-none"
                            />
                        </div>
                    </div>

                    {/* Source & Destination */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-6">
                        <h4 className="text-sm font-bold text-white/60 uppercase tracking-wider flex items-center gap-2">
                            <ArrowRight className="h-4 w-4" />
                            Source & Destination
                        </h4>

                        {browsingSide === 'source' && selectedSourceRemote ? (
                            <div className="animate-in slide-in-from-right-4 fade-in duration-300">
                                <FileBrowser
                                    remote={selectedSourceRemote}
                                    initialPath={sourcePath}
                                    onSelect={(path) => {
                                        setValue('sourcePath', path);
                                        setBrowsingSide(null);
                                    }}
                                    onCancel={() => setBrowsingSide(null)}
                                />
                            </div>
                        ) : browsingSide === 'destination' && selectedDestRemote ? (
                            <div className="animate-in slide-in-from-right-4 fade-in duration-300">
                                <FileBrowser
                                    remote={selectedDestRemote}
                                    initialPath={destinationPath}
                                    onSelect={(path) => {
                                        setValue('destinationPath', path);
                                        setBrowsingSide(null);
                                    }}
                                    onCancel={() => setBrowsingSide(null)}
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-6">
                                {/* Source Selection */}
                                <div className="space-y-3">
                                    <Label className="text-white/80 text-sm font-medium">Source Location <span className="text-red-400">*</span></Label>
                                    <div className="flex gap-2">
                                        <Select
                                            value={sourceRemoteId}
                                            onValueChange={(v) => setValue('sourceRemoteId', v)}
                                        >
                                            <SelectTrigger className="flex-1 bg-white/5 border-white/10 text-white h-10">
                                                <SelectValue placeholder="Select Remote" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-900 border-white/10">
                                                {remotes.map((remote) => (
                                                    <SelectItem
                                                        key={remote.id}
                                                        value={remote.id!}
                                                        disabled={remote.id === destinationRemoteId}
                                                        className="text-white focus:bg-white/10 focus:text-white"
                                                    >
                                                        {remote.name} ({remote.type})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {sourceRemoteId && (
                                        <div className="flex gap-2 animate-in fade-in slide-in-from-top-2">
                                            <div className="relative flex-1">
                                                <Input
                                                    {...register('sourcePath')}
                                                    placeholder="/"
                                                    className="bg-white/5 border-white/10 text-white font-mono text-sm pl-8"
                                                    readOnly
                                                />
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
                                                    <FolderSearch className="h-4 w-4" />
                                                </div>
                                            </div>
                                            <Button
                                                type="button"
                                                onClick={() => setBrowsingSide('source')}
                                                className="bg-white/10 hover:bg-white/20 text-white"
                                            >
                                                Browse
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                {/* Destination Selection */}
                                <div className="space-y-3">
                                    <Label className="text-white/80 text-sm font-medium">Destination Location <span className="text-red-400">*</span></Label>
                                    <div className="flex gap-2">
                                        <Select
                                            value={destinationRemoteId}
                                            onValueChange={(v) => setValue('destinationRemoteId', v)}
                                        >
                                            <SelectTrigger className="flex-1 bg-white/5 border-white/10 text-white h-10">
                                                <SelectValue placeholder="Select Remote" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-900 border-white/10">
                                                {remotes.map((remote) => (
                                                    <SelectItem
                                                        key={remote.id}
                                                        value={remote.id!}
                                                        disabled={remote.id === sourceRemoteId}
                                                        className="text-white focus:bg-white/10 focus:text-white"
                                                    >
                                                        {remote.name} ({remote.type})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {destinationRemoteId && (
                                        <div className="flex gap-2 animate-in fade-in slide-in-from-top-2">
                                            <div className="relative flex-1">
                                                <Input
                                                    {...register('destinationPath')}
                                                    placeholder="/"
                                                    className="bg-white/5 border-white/10 text-white font-mono text-sm pl-8"
                                                    readOnly
                                                />
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
                                                    <FolderSearch className="h-4 w-4" />
                                                </div>
                                            </div>
                                            <Button
                                                type="button"
                                                onClick={() => setBrowsingSide('destination')}
                                                className="bg-white/10 hover:bg-white/20 text-white"
                                            >
                                                Browse
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Sync Mode */}
                        <div>
                            <Label className="text-white/80 text-sm font-medium">Sync Mode</Label>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {syncModes.map((mode) => (
                                    <button
                                        key={mode.value}
                                        type="button"
                                        onClick={() => setValue('mode', mode.value)}
                                        className={`p-3 rounded-xl text-left transition-all ${selectedMode === mode.value
                                                ? 'bg-blue-600/20 border-blue-500 border'
                                                : 'bg-white/5 border border-white/10 hover:bg-white/10'
                                            }`}
                                    >
                                        <div className={`font-bold text-sm ${selectedMode === mode.value ? 'text-blue-400' : 'text-white'}`}>
                                            {mode.label}
                                        </div>
                                        <div className="text-xs text-white/40 mt-1">{mode.description}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Schedule */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-4">
                        <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-white/60 uppercase tracking-wider">Schedule</h4>
                            <Switch
                                checked={scheduleEnabled}
                                onCheckedChange={(v) => setValue('scheduleEnabled', v)}
                            />
                        </div>

                        {scheduleEnabled && (
                            <div className="space-y-4 animate-in fade-in duration-200">
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setValue('scheduleType', 'interval')}
                                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${scheduleType === 'interval'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white/5 text-white/60 hover:bg-white/10'
                                            }`}
                                    >
                                        Interval
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setValue('scheduleType', 'cron')}
                                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${scheduleType === 'cron'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white/5 text-white/60 hover:bg-white/10'
                                            }`}
                                    >
                                        Cron
                                    </button>
                                </div>

                                {scheduleType === 'interval' ? (
                                    <div>
                                        <Label className="text-white/80 text-sm font-medium">Run Every (minutes)</Label>
                                        <Input
                                            type="number"
                                            {...register('intervalMinutes', { min: 1, valueAsNumber: true })}
                                            className="mt-1.5 bg-white/5 border-white/10 text-white"
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <Label className="text-white/80 text-sm font-medium">Cron Expression</Label>
                                        <Input
                                            {...register('cronExpression')}
                                            placeholder="0 0 * * *"
                                            className="mt-1.5 bg-white/5 border-white/10 text-white font-mono"
                                        />
                                        <p className="mt-1 text-xs text-white/40">e.g., "0 0 * * *" for daily at midnight</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Advanced Options Toggle */}
                    <button
                        type="button"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                    >
                        <Settings2 className="h-4 w-4" />
                        {showAdvanced ? 'Hide' : 'Show'} Advanced Options
                    </button>

                    {/* Advanced Options */}
                    {showAdvanced && (
                        <div className="space-y-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 animate-in fade-in duration-200">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-white/80 text-sm font-medium">Parallel Transfers</Label>
                                    <Input
                                        type="number"
                                        {...register('transfers', { min: 1, max: 64, valueAsNumber: true })}
                                        className="mt-1.5 bg-white/5 border-white/10 text-white"
                                    />
                                </div>
                                <div>
                                    <Label className="text-white/80 text-sm font-medium">Retries</Label>
                                    <Input
                                        type="number"
                                        {...register('retries', { min: 0, max: 10, valueAsNumber: true })}
                                        className="mt-1.5 bg-white/5 border-white/10 text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label className="text-white/80 text-sm font-medium flex items-center gap-2">
                                    <Filter className="h-4 w-4" />
                                    Exclude Patterns (one per line)
                                </Label>
                                <Textarea
                                    {...register('excludePatterns')}
                                    placeholder="*.tmp&#10;*.log&#10;node_modules/**"
                                    rows={3}
                                    className="mt-1.5 bg-white/5 border-white/10 text-white font-mono text-sm placeholder:text-white/30 resize-none"
                                />
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                                <div>
                                    <div className="text-sm font-medium text-white">Dry Run</div>
                                    <div className="text-xs text-white/40">Test without making changes</div>
                                </div>
                                <Switch
                                    checked={watch('dryRun')}
                                    onCheckedChange={(v) => setValue('dryRun', v)}
                                />
                            </div>
                        </div>
                    )}

                    <DialogFooter className="gap-2 pt-4 border-t border-white/10">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setOpen(false);
                                reset();
                                setShowAdvanced(false);
                            }}
                            className="bg-transparent border-white/20 text-white hover:bg-white/10"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting || !sourceRemoteId || !destinationRemoteId}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold"
                        >
                            {isSubmitting ? 'Creating...' : 'Create Job'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
