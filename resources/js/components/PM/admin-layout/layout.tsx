import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import DeleteUserModal from '@/pages/PM/users/delete';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BrickWall, CrownIcon, UserCog2, UsersRoundIcon } from 'lucide-react';
import { useState, type PropsWithChildren } from 'react'; 

const sidebarNavItems: NavItem[] = [
    {
        title: 'Manage Users',
        href: '/user',
    },
    {
        title: 'Manage Roles',
        href: '/role',
    },
     {
        title: 'Manage Groups',
        href: '/group',
    },
    {
        title: 'Manage Companies',
        href: '/company',
    },
];

export default function AdminLayout({ children, ...props }: PropsWithChildren) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }
    const currentPath = window.location.pathname;

    return (
        <div className="px-4 py-6">
            <Heading title="Administrator" description="Manage system profile and account settings" />

            <div className="flex flex-col lg:flex-row w-full ">
                <aside className="">
                    <nav className="flex flex-col ">
                        {sidebarNavItems.map((item, index) => (
                            <Button
                                key={`${item.href}-${index}`}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn('w-full justify-start', {
                                    'bg-muted': currentPath === item.href,
                                })}
                            >
                                <Link href={item.href} prefetch>
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                <Separator className="md:hidden" />

                <div className="flex-1 container">
                    <section className="">{children}</section>
                </div>
            </div>
        </div>
    );
}
