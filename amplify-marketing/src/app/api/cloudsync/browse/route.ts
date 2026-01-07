import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { RemoteStore } from '@/lib/api/store';
import { handleApiError, NotFoundError } from '@/lib/api/errors';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const remoteId = searchParams.get('remoteId');
        const path = searchParams.get('path') || '';

        if (!remoteId) {
            return NextResponse.json(
                { error: 'Remote ID is required' },
                { status: 400 }
            );
        }

        const remote = RemoteStore.getById(remoteId);
        if (!remote) {
            throw new NotFoundError('Remote not found');
        }

        // Mock file system listing
        // In a real app, this would use `rclone lsjson` or similar
        const nodes = generateMockNodes(remote.type, path);

        return NextResponse.json({ data: nodes });
    } catch (error) {
        const { statusCode, body } = handleApiError(error);
        return NextResponse.json(body, { status: statusCode });
    }
}

interface FileNode {
    name: string;
    path: string;
    isDir: boolean;
    size?: number;
    modTime?: string;
    mimeType?: string;
}

function generateMockNodes(type: string, currentPath: string): FileNode[] {
    // Common paths for different providers
    const nodes: FileNode[] = [];
    const isRoot = currentPath === '' || currentPath === '/';

    // Normalize path for display
    const prefix = currentPath && !currentPath.endsWith('/') ? `${currentPath}/` : currentPath;

    if (isRoot) {
        switch (type) {
            case 'gdrive':
                nodes.push(
                    { name: 'My Drive', path: 'My Drive', isDir: true },
                    { name: 'Shared with me', path: 'Shared with me', isDir: true },
                    { name: 'Photos', path: 'Photos', isDir: true }
                );
                break;
            case 's3':
                nodes.push(
                    { name: 'backup-bucket', path: 'backup-bucket', isDir: true },
                    { name: 'media-assets', path: 'media-assets', isDir: true },
                    { name: 'logs', path: 'logs', isDir: true }
                );
                break;
            case 'local':
                nodes.push(
                    { name: 'Documents', path: '/home/user/Documents', isDir: true },
                    { name: 'Pictures', path: '/home/user/Pictures', isDir: true },
                    { name: 'Desktop', path: '/home/user/Desktop', isDir: true }
                );
                break;
            default:
                nodes.push(
                    { name: 'Folder 1', path: 'Folder 1', isDir: true },
                    { name: 'Folder 2', path: 'Folder 2', isDir: true },
                    { name: 'data.csv', path: 'data.csv', isDir: false, size: 1024, mimeType: 'text/csv' }
                );
        }
    } else {
        // Subfolders simulation
        nodes.push(
            { name: 'Design Assets', path: `${prefix}Design Assets`, isDir: true },
            { name: 'Financials', path: `${prefix}Financials`, isDir: true },
            { name: 'Project Alpha', path: `${prefix}Project Alpha`, isDir: true },
            { name: 'report.pdf', path: `${prefix}report.pdf`, isDir: false, size: 2048576, mimeType: 'application/pdf' },
            { name: 'image.jpg', path: `${prefix}image.jpg`, isDir: false, size: 350012, mimeType: 'image/jpeg' }
        );
    }

    return nodes;
}
