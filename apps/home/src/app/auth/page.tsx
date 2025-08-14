
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { GitMerge, Chrome, LogIn, UserPlus, Eye, EyeOff } from 'lucide-react';
import { cn } from '@amberops/lib';
import { AmberOpsLogo } from '@amberops/ui/components/icons';
import { AnimatedThemeToggle } from '@/components/animated-theme-toggle';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@amberops/ui/components/ui/dialog';
import { Input } from '@amberops/ui/components/ui/input';
import { Label } from '@amberops/ui/components/ui/label';
import { Button } from '@amberops/ui/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@amberops/ui/components/ui/tooltip';

const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3002';
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

const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // In a real Keycloak setup, this would redirect to the Keycloak registration page
        router.push(`${AUTH_URL}/register`);
    };

    return (
        <form onSubmit={handleSignup} data-testid="signup-form">
            <h1 className="text-3xl font-bold font-headline mb-3">Create Account</h1>
            <div className="social-icons">
                 <SocialButton icon={<Chrome size={20} />} onClick={() => window.location.href = `${AUTH_URL}/sso/google`} tooltip="Sign up with Google" />
                 <SocialButton icon={<GitMerge size={20} />} onClick={() => window.location.href = `${AUTH_URL}/sso/github`} tooltip="Sign up with GitHub" />
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
            <button type="submit" className="mt-4">Sign Up</button>
        </form>
    );
};

const SignInForm = () => {
    const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = e.currentTarget.email.value;

        // In a real Keycloak setup, this would initiate the login flow.
        // For this prototype, we'll simulate a role-based redirect.
        if (email.includes('admin')) {
             router.push(ADMIN_URL);
        } else {
             router.push(WEB_URL);
        }
    }

    const handleForgotPassword = async () => {
        // This would redirect to the Keycloak password reset flow
        router.push(`${AUTH_URL}/forgot-password`);
        setIsForgotModalOpen(false);
    }

    return (
        <>
            <form onSubmit={handleLogin} data-testid="login-form">
                <h1 className="text-3xl font-bold font-headline mb-3">Sign In</h1>
                <div className="social-icons">
                     <SocialButton icon={<Chrome size={20} />} onClick={() => window.location.href = `${AUTH_URL}/sso/google`} tooltip="Sign in with Google" />
                     <SocialButton icon={<GitMerge size={20} />} onClick={() => window.location.href = `${AUTH_URL}/sso/github`} tooltip="Sign in with GitHub" />
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

                <Button type="button" variant="link" onClick={() => setIsForgotModalOpen(true)} className="text-xs font-normal underline h-auto p-0 my-2 text-muted-foreground hover:text-primary">
                    Forgot Your Password?
                </Button>
                <button type="submit">Sign In</button>
            </form>

            <Dialog open={isForgotModalOpen} onOpenChange={setIsForgotModalOpen}>
                <DialogContent className="z-[9999]">
                    <DialogHeader>
                        <DialogTitle>Forgot Password</DialogTitle>
                        <DialogDescription>
                            You will be redirected to our secure authentication service to reset your password.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsForgotModalOpen(false)}>Cancel</Button>
                        <Button onClick={handleForgotPassword}>Continue</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default function AuthPage() {
    const [isActive, setIsActive] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.get('action') === 'signup') {
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
                <div className="ml-auto">
                    <AnimatedThemeToggle />
                </div>
            </header>
            <div className={cn("auth-container", isActive && "active")} id="container">
                <div className="form-container sign-up">
                    <SignUpForm />
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
