import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { useEffect, type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    
    useEffect(() => {
        document.documentElement.classList.remove('dark');
    }, []);

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-sm relative">
                {/* Card with border */}
                <div className="flex flex-col gap-8 luxury-card p-6 rounded-lg pt-12">
                    <div className="flex flex-col items-center gap-4">
                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">{title}</h1>
                            <p className="text-center text-sm text-muted-foreground">{description}</p>
                        </div>
                    </div>
                    {children}
                </div>
                
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                        <div className="flex w-20 relative inline-block items-center justify-center rounded-full">
                            <AppLogoIcon className="fill-current text-[var(--foreground)] dark:text-white" />
                        </div>
                        <span className="sr-only">{title}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
