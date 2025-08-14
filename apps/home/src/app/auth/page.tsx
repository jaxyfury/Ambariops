
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { GitMerge, Chrome, LogIn, UserPlus, Eye, EyeOff } from 'lucide-react';
import { cn } from '@amberops/lib';
import { AmberOpsLogo } from '@amberops/ui/components/icons';
import { Button } from '@amberops/ui/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@amberops/ui/components/ui/tooltip';

const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL || 'http://localhost:3002/api';

const SocialButton = ({ provider, icon, tooltip }: { provider: 'google' | 'github', icon: React.ReactNode, tooltip: string }) => (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                 <a href={`${AUTH_API_URL}/auth/${provider}`} className="social-icon" aria-label={tooltip} data-testid={`social-btn-${provider}`}>
                    {icon}
                </a>
            </TooltipTrigger>
            <TooltipContent>
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
);

const handleSuccessfulLogin = (token: string, user: any) => {
    localStorage.setItem('amberops_jwt', token);
    localStorage.setItem('amberops_user', JSON.stringify(user));
    toast.success('Login successful! Redirecting...');
    
    let targetUrl;
    if (user.role === 'Admin') {
        targetUrl = process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3003';
    } else {
        targetUrl = process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000';
    }
    
    window.location.href = targetUrl;
};

const SignUpForm = ({ onSwitch }: { onSwitch: () => void }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const name = (e.currentTarget.elements.namedItem('name') as HTMLInputElement).value;
        const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
        const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
        
        try {
            const response = await fetch(`${AUTH_API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role: 'Viewer' })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed.');
            }
            
            toast.success("Registration successful! Please sign in.");
            onSwitch();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSignup} data-testid="signup-form">
            <h1 className="text-3xl font-bold font-headline mb-3">Create Account</h1>
            <div className="social-icons">
                 <SocialButton provider="google" icon={<Chrome size={20} />} tooltip="Sign up with Google" />
                 <SocialButton provider="github" icon={<GitMerge size={20} />} tooltip="Sign up with GitHub" />
            </div>
            <span>or use your email for registration</span>
            <input type="text" name="name" placeholder="Name" required autoComplete="name" data-testid="signup-name" />
            <input type="email" name="email" placeholder="Email" required autoComplete="email" data-testid="signup-email" />
            <div className="relative w-full">
                <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" required autoComplete="new-password" data-testid="signup-password" />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    data-testid="toggle-password-visibility"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
            <button type="submit" className="mt-4" disabled={isLoading} data-testid="signup-submit-btn">{isLoading ? 'Signing Up...' : 'Sign Up'}</button>
        </form>
    );
};

const SignInForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
        const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
        
        try {
             const response = await fetch(`${AUTH_API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed.');
            }

            handleSuccessfulLogin(data.token, data.user);

        } catch (error: any) {
            toast.error(error.message);
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleLogin} data-testid="login-form">
            <h1 className="text-3xl font-bold font-headline mb-3">Sign In</h1>
            <div className="social-icons">
                 <SocialButton provider="google" icon={<Chrome size={20} />} tooltip="Sign in with Google" />
                 <SocialButton provider="github" icon={<GitMerge size={20} />} tooltip="Sign in with GitHub" />
            </div>
            <span>or use your email and password</span>
            <input type="email" name="email" placeholder="Email" required autoComplete="email" data-testid="login-email" />
            <div className="relative w-full">
                <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" required autoComplete="current-password" data-testid="login-password" />
                 <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    data-testid="toggle-password-visibility"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            <Button type="button" variant="link" onClick={() => toast.error("Forgot password feature coming soon!")} className="text-xs font-normal underline h-auto p-0 my-2 text-muted-foreground hover:text-primary" data-testid="forgot-password-btn">
                Forgot Your Password?
            </Button>
            <button type="submit" disabled={isLoading} data-testid="login-submit-btn">{isLoading ? "Signing In..." : "Sign In"}</button>
        </form>
    );
};

function AuthPageComponent() {
    const [isActive, setIsActive] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const action = searchParams.get('action');
        if (action === 'signup') {
            setIsActive(true);
        }

        const token = searchParams.get('token');
        const userParam = searchParams.get('user');

        if (token && userParam) {
            try {
                const user = JSON.parse(decodeURIComponent(userParam));
                handleSuccessfulLogin(token, user);
                // Clear the URL parameters after successful login
                router.replace('/auth');
            } catch (e) {
                console.error("Failed to parse user from URL", e);
                toast.error("An error occurred during social login.");
            }
        }
    }, [searchParams, router]);

    return (
        <div className="auth-body">
            <header className="fixed top-0 left-0 w-full px-4 lg:px-6 h-16 flex items-center z-50">
                 <Link href="/" className="flex items-center justify-center gap-2" prefetch={false} data-testid="home-link">
                    <AmberOpsLogo className="h-8 w-8 text-primary" />
                    <span className="text-xl font-semibold font-headline">AmberOps</span>
                </Link>
            </header>
            <div className={cn("auth-container", isActive && "active")} id="container" data-testid="auth-container">
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
                            <button className="hidden-btn" id="login" onClick={() => setIsActive(false)} data-testid="switch-to-login-btn">
                                <LogIn className="mr-2"/> Sign In
                            </button>
                        </div>
                        <div className="toggle-panel toggle-right">
                             <h1 className="text-4xl font-bold font-headline">Hello, Friend!</h1>
                            <p>Register with your personal details to use all of the site features</p>
                            <button className="hidden-btn" id="register" onClick={() => setIsActive(true)} data-testid="switch-to-signup-btn">
                                <UserPlus className="mr-2"/> Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Create a wrapper component that uses Suspense
export default function AuthPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthPageComponent />
        </Suspense>
    );
}
