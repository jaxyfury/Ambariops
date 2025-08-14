'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { GitMerge, Chrome, LogIn, UserPlus, Eye, EyeOff } from 'lucide-react';
import { cn } from '@amberops/lib';
import { AmberOpsLogo } from '@amberops/ui/components/icons';
import { Button } from '@amberops/ui/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@amberops/ui/components/ui/tooltip';

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000';
const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3003';

const SocialButton = ({ icon, onClick, tooltip }: { icon: React.ReactNode, onClick?: () => void, tooltip: string }) => (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <button type="button" onClick={onClick} className="social-icon" aria-label={tooltip}>
                    {icon}
                </button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
);

const SignUpForm = ({ onSwitch }: { onSwitch: () => void }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        // NOTE: In a real application, this would make an API call to your dedicated auth service's registration endpoint.
        // For this prototype, we'll simulate a successful registration.
        setTimeout(() => {
            toast.success("Registration successful! Please sign in.");
            setIsLoading(false);
            onSwitch(); // Switch to the sign-in form
        }, 1000);
    };

    return (
        <form onSubmit={handleSignup} data-testid="signup-form">
            <h1 className="text-3xl font-bold font-headline mb-3">Create Account</h1>
            <div className="social-icons">
                 <SocialButton icon={<Chrome size={20} />} onClick={() => toast.error("OAuth is handled by the dedicated auth service.")} tooltip="Sign up with Google" />
                 <SocialButton icon={<GitMerge size={20} />} onClick={() => toast.error("OAuth is handled by the dedicated auth service.")} tooltip="Sign up with GitHub" />
            </div>
            <span>or use your email for registration</span>
            <input type="text" name="name" placeholder="Name" required autoComplete="name" />
            <input type="email" name="email" placeholder="Email" required autoComplete="email" />
            <div className="relative w-full">
                <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" required autoComplete="new-password" />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
            <button type="submit" className="mt-4" disabled={isLoading}>{isLoading ? 'Signing Up...' : 'Sign Up'}</button>
        </form>
    );
};

const SignInForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const email = e.currentTarget.email.value;
        
        // NOTE: In a real application, this form would submit to your dedicated auth service (e.g., Keycloak).
        // The auth service would then handle the login and redirect back to the correct application with a session.
        // For this prototype, we'll simulate the redirect based on email.
        setTimeout(() => {
            if (email.toLowerCase() === 'admin@amberops.com') {
                toast.success('Admin login successful! Redirecting...');
                window.location.href = ADMIN_URL;
            } else {
                toast.success('Login successful! Redirecting...');
                window.location.href = WEB_URL;
            }
        }, 1000);
    }

    return (
        <form onSubmit={handleLogin} data-testid="login-form">
            <h1 className="text-3xl font-bold font-headline mb-3">Sign In</h1>
            <div className="social-icons">
                 <SocialButton icon={<Chrome size={20} />} onClick={() => toast.error("OAuth is handled by the dedicated auth service.")} tooltip="Sign in with Google" />
                 <SocialButton icon={<GitMerge size={20} />} onClick={() => toast.error("OAuth is handled by the dedicated auth service.")} tooltip="Sign in with GitHub" />
            </div>
            <span>or use your email and password</span>
            <input type="email" name="email" placeholder="Email" required autoComplete="email" />
            <div className="relative w-full">
                <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" required autoComplete="current-password" />
                 <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            <Button type="button" variant="link" onClick={() => toast.error("Forgot password feature coming soon!")} className="text-xs font-normal underline h-auto p-0 my-2 text-muted-foreground hover:text-primary">
                Forgot Your Password?
            </Button>
            <button type="submit" disabled={isLoading}>{isLoading ? "Signing In..." : "Sign In"}</button>
        </form>
    );
};

export default function AuthPage() {
    const [isActive, setIsActive] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        const action = searchParams.get('action');
        if (action === 'signup') {
            setIsActive(true);
        }
    }, [searchParams]);

    return (
        <div className="auth-body">
            <header className="fixed top-0 left-0 w-full px-4 lg:px-6 h-16 flex items-center z-50">
                 <Link href="/" className="flex items-center justify-center gap-2" prefetch={false}>
                    <AmberOpsLogo className="h-8 w-8 text-primary" />
                    <span className="text-xl font-semibold font-headline">AmberOps</span>
                </Link>
            </header>
            <div className={cn("auth-container", isActive && "active")} id="container">
                <div className="form-container sign-up">
                    <SignUpForm onSwitch={() => setIsActive(false)} />
                </div>
                <div className="form-container sign-in">
                    <SignInForm />
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1 className="text-4xl font-bold font-headline">Welcome Back!</h1>
                            <p>Enter your personal details to use all of the site features</p>
                            <button className="hidden-btn" id="login" onClick={() => setIsActive(false)}>
                                <LogIn className="mr-2"/> Sign In
                            </button>
                        </div>
                        <div className="toggle-panel toggle-right">
                             <h1 className="text-4xl font-bold font-headline">Hello, Friend!</h1>
                            <p>Register with your personal details to use all of the site features</p>
                            <button className="hidden-btn" id="register" onClick={() => setIsActive(true)}>
                                <UserPlus className="mr-2"/> Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
