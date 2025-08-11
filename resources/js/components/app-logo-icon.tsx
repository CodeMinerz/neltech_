import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <div className="gem before:gem-before rounded-full relative inline-block items-center">
            <img src="/projects/logo.png" alt="PM" sizes='40' className="relative z-10" />
        </div>
    );
}
