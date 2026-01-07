'use client';

import { Activity, CloudUpload, FileCheck, Shield } from 'lucide-react';
import type { DashboardStats } from '@/lib/api/types';

interface StatsBarProps {
    stats: DashboardStats | null;
    isLoading: boolean;
}

function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function StatsBar({ stats, isLoading }: StatsBarProps) {
    const metrics = [
        {
            label: 'Total Jobs',
            value: stats?.totalJobs ?? 0,
            icon: CloudUpload,
            color: 'text-blue-400',
            bgColor: 'bg-blue-500/10',
        },
        {
            label: 'Active Syncs',
            value: stats?.activeJobs ?? 0,
            icon: Activity,
            color: 'text-emerald-400',
            bgColor: 'bg-emerald-500/10',
        },
        {
            label: 'Files Today',
            value: stats?.filesTransferredToday ?? 0,
            icon: FileCheck,
            color: 'text-purple-400',
            bgColor: 'bg-purple-500/10',
        },
        {
            label: 'System Health',
            value: stats?.health === 'healthy' ? 'Optimal' : stats?.health ?? '---',
            icon: Shield,
            color: stats?.health === 'healthy' ? 'text-emerald-400' : 'text-amber-400',
            bgColor: stats?.health === 'healthy' ? 'bg-emerald-500/10' : 'bg-amber-500/10',
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {metrics.map((metric, i) => (
                <div
                    key={i}
                    className="card-apple p-6 group hover:border-white/20 transition-all duration-300"
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className={`w-10 h-10 rounded-xl ${metric.bgColor} flex items-center justify-center ${metric.color}`}>
                            <metric.icon className="h-5 w-5" />
                        </div>
                        {isLoading && (
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        )}
                    </div>

                    <div className={`text-3xl font-black tracking-tight mb-1 ${isLoading ? 'animate-pulse' : ''}`}>
                        {isLoading ? (
                            <div className="h-9 w-16 bg-white/5 rounded" />
                        ) : (
                            <span className="group-hover:gradient-text-blue transition-all">
                                {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
                            </span>
                        )}
                    </div>

                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                        {metric.label}
                    </div>
                </div>
            ))}
        </div>
    );
}
