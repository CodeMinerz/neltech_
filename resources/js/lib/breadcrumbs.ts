import { type BreadcrumbItem } from '@/types';

export function createBreadcrumb(title: string, href: string): BreadcrumbItem {
    return {
        title,
        href
    };
}

export function createUserBreadcrumb(): BreadcrumbItem {
    return createBreadcrumb('Users', route('user.index'));
}

export function createRoleBreadcrumb(): BreadcrumbItem {
    return createBreadcrumb('Manage | Roles', '/roles');
}

// Add more breadcrumb creators as needed