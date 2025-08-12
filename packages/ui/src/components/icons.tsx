import type { SVGProps } from 'react';
import { cn } from '@amberops/lib/utils';

export function AmberOpsLogo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            width="1em"
            height="1em"
            {...props}
        >
            <path fill="none" d="M0 0h256v256H0z" />
            <path
                fill="hsl(var(--primary))"
                d="M128 24a104 104 0 0 0-91.4 153.2A104.2 104.2 0 0 0 128 232a104 104 0 0 0 91.4-154.8A103.4 103.4 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88 88.1 88.1 0 0 1-88 88Z"
            />
            <path
                fill="hsl(var(--primary))"
                d="M168 96h-21.2a16 16 0 0 0-31.4-11.3A16 16 0 0 0 84.4 96H64a8 8 0 0 0 0 16h20.4a16 16 0 0 0 31.4 11.3A16 16 0 0 0 147.2 112H168a8 8 0 0 0 0-16Zm-41.2 19.3a24 24 0 0 1-3.2-19.3 8 8 0 1 0-15.2 4.6 39.9 39.9 0 0 0 5.3 32.2 8 8 0 0 0-1.8 11.5 8.1 8.1 0 0 0 11.5 1.8 40.2 40.2 0 0 0 32.2-5.3 8 8 0 0 0 4.6-15.2Z"
            />
        </svg>
    )
}

export function BroomIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <defs>
                <linearGradient id="broom-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
            </defs>
            <path
                d="M12.35 2.5C12.83 2.5 13.22 2.89 13.22 3.37V7.62C13.22 8.1 12.83 8.49 12.35 8.49C11.87 8.49 11.48 8.1 11.48 7.62V3.37C11.48 2.89 11.87 2.5 12.35 2.5Z"
                fill="url(#broom-gradient)"
            />
            <path
                d="M14.47 7.73C14.47 7.25 14.08 6.86 13.6 6.86H11.1C10.62 6.86 10.23 7.25 10.23 7.73V8.49H14.47V7.73Z"
                fill="url(#broom-gradient)"
            />
            <path
                d="M19.5 9.75C19.5 7.96 18.04 6.5 16.25 6.5H8.44C6.65 6.5 5.19 7.96 5.19 9.75V15.67C5.19 15.93 5.3 16.16 5.51 16.28L6.89 17.11C7.12 17.25 7.42 17.17 7.56 16.94L8.3 15.77L9.58 17.23C9.74 17.42 10.04 17.47 10.27 17.33L11.53 16.52L12.5 17.8C12.67 18.01 12.97 18.05 13.19 17.9L14.45 17.09L15.43 18.37C15.6 18.57 15.9 18.61 16.12 18.47L17.15 17.78L18.41 19.34C18.57 19.54 18.87 19.58 19.1 19.44L20.17 18.72C20.36 18.59 20.44 18.34 20.38 18.11L19.5 9.75Z"
                fill="url(#broom-gradient)"
            />
        </svg>
    )
}

    