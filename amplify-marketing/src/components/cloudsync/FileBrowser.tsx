'use client';

import { useState, useEffect } from 'react';
import {
    Folder,
    File,
    ChevronRight,
    Loader2,
    Home,
    ArrowUp,
    Cloud
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { RemoteConfig } from '@/lib/api/types';

interface FileNode {
    name: string;
    path: string;
    isDir: boolean;
    size?: number;
    mimeType?: string;
}

interface FileBrowserProps {
    remote: RemoteConfig;
    initialPath?: string;
    onSelect: (path: string) => void;
    onCancel: () => void;
}

export function FileBrowser({ remote, initialPath = '', onSelect, onCancel }: FileBrowserProps) {
    const [currentPath, setCurrentPath] = useState(initialPath);
    const [nodes, setNodes] = useState<FileNode[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadPath(currentPath);
    }, [currentPath, remote.id]);

    const loadPath = async (path: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/cloudsync/browse?remoteId=${remote.id}&path=${encodeURIComponent(path)}`);
            if (!res.ok) throw new Error('Failed to load directory');
            const json = await res.json();
            setNodes(json.data);
        } catch (err) {
            setError('Could not browse remote');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleNavigate = (path: string) => {
        setCurrentPath(path);
    };

    const handleUp = () => {
        const parent = currentPath.split('/').slice(0, -1).join('/');
        setCurrentPath(parent);
    };

    // Convert path to breadcrumbs
    const breadcrumbs = currentPath.split('/').filter(Boolean);

    return (
        <div className="flex flex-col h-[500px] bg-zinc-950/50 rounded-xl border border-white/10 overflow-hidden">
            {/* Header / Breadcrumbs */}
            <div className="p-3 border-b border-white/10 bg-white/5 flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-white/60 hover:text-white hover:bg-white/10"
                    onClick={() => setCurrentPath('')}
                >
                    <Home className="h-4 w-4" />
                </Button>

                {breadcrumbs.map((part, i) => {
                    const path = breadcrumbs.slice(0, i + 1).join('/');
                    return (
                        <div key={path} className="flex items-center gap-1">
                            <ChevronRight className="h-3 w-3 text-white/20" />
                            <button
                                onClick={() => setCurrentPath(path)}
                                className="text-sm text-white/60 hover:text-white px-1.5 py-0.5 rounded hover:bg-white/5 transition-colors"
                            >
                                {part}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* File List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-full text-white/40 gap-2">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                        <span className="text-sm">Loading...</span>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center h-full text-red-400 gap-2">
                        <span className="text-sm">{error}</span>
                        <Button variant="outline" size="sm" onClick={() => loadPath(currentPath)}>Retry</Button>
                    </div>
                ) : nodes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-white/20">
                        <Folder className="h-12 w-12 mb-2 opacity-20" />
                        <span className="text-sm">Empty Directory</span>
                    </div>
                ) : (
                    <>
                        {currentPath && (
                            <button
                                onClick={handleUp}
                                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-left group"
                            >
                                <div className="h-8 w-8 rounded bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-white/10">
                                    <ArrowUp className="h-4 w-4" />
                                </div>
                                <span className="text-sm text-white/60 group-hover:text-white">..</span>
                            </button>
                        )}

                        {nodes.map((node) => (
                            <button
                                key={node.path}
                                onClick={() => node.isDir ? handleNavigate(node.path) : null}
                                className={cn(
                                    "w-full flex items-center gap-3 p-3 rounded-lg border border-transparent transition-all text-left group",
                                    node.isDir ? "hover:bg-blue-500/10 hover:border-blue-500/20" : "hover:bg-white/5 opacity-60 cursor-default"
                                )}
                            >
                                <div className={cn(
                                    "h-8 w-8 rounded flex items-center justify-center transition-colors",
                                    node.isDir
                                        ? "bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white"
                                        : "bg-white/5 text-white/40"
                                )}>
                                    {node.isDir ? <Folder className="h-4 w-4" /> : <File className="h-4 w-4" />}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className={cn(
                                        "text-sm font-medium truncate transition-colors",
                                        node.isDir ? "text-white group-hover:text-blue-300" : "text-white/60"
                                    )}>
                                        {node.name}
                                    </div>
                                    {!node.isDir && node.size && (
                                        <div className="text-xs text-white/30 truncate">
                                            {(node.size / 1024).toFixed(1)} KB
                                        </div>
                                    )}
                                </div>

                                {node.isDir && (
                                    <ChevronRight className="h-4 w-4 text-white/10 group-hover:text-blue-500/50" />
                                )}
                            </button>
                        ))}
                    </>
                )}
            </div>

            {/* Footer / Selection */}
            <div className="p-4 border-t border-white/10 bg-zinc-950 flex flex-col gap-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded bg-white/5 border border-white/10">
                    <Cloud className="h-4 w-4 text-white/40" />
                    <div className="font-mono text-xs text-white/60 truncate flex-1">
                        {remote.name}:{currentPath || '/'}
                    </div>
                </div>

                <div className="flex gap-2 justify-end">
                    <Button
                        variant="ghost"
                        onClick={onCancel}
                        className="text-white/60 hover:text-white hover:bg-white/5"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => onSelect(currentPath)}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                    >
                        Select This Folder
                    </Button>
                </div>
            </div>
        </div>
    );
}
