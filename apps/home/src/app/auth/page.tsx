
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { GitMerge, Chrome, LogIn, UserPlus } from 'lucide-react';
import { cn } from '@amberops/lib';
import { AmberOpsLogo } from '@amberops/ui/components/icons';
import { AnimatedThemeToggle } from '@/components/animated-theme-toggle';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@amberops/ui/components/ui/dialog';
import { Input } from '@amberops/ui/components/ui/input';
import { Label } from '@amberops/ui/components/ui/label';
import { Button } from '@amberops/ui/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@amberops/ui/components/ui/tooltip';

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000';

const SocialButton = ({ icon, onClick, tooltip }: { icon: React.ReactNode, onClick?: () => void, tooltip: string }) => (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <button type="button" onClick={onClick} className="social-icon">
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
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const name = e.currentTarget.name.value;
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;

        try {
            const response = await fetch(`${WEB_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                toast.success('Account created successfully! Signing in...');
                const result = await signIn('credentials', {
                    redirect: false,
                    email,
                    password,
                });
                if (result?.error) {
                     toast.error(result.error || 'Invalid credentials.');
                } else {
                     router.push(`${WEB_URL}/dashboard`);
                }
            } else {
                const data = await response.json();
                toast.error(data.message || 'Something went wrong.');
            }
        } catch (error) {
            toast.error('An error occurred during signup.');
            console.error('Signup error:', error);
        }
    };

    return (
        <form onSubmit={handleSignup} data-testid="signup-form">
            <h1 className="text-3xl font-bold font-headline mb-3">Create Account</h1>
            <div className="social-icons">
                 <SocialButton icon={<Chrome size={20} />} onClick={() => signIn('google', { callbackUrl: `${WEB_URL}/dashboard` })} tooltip="Sign up with Google" />
                 <SocialButton icon={<GitMerge size={20} />} onClick={() => signIn('github', { callbackUrl: `${WEB_URL}/dashboard` })} tooltip="Sign up with GitHub" />
            </div>
            <span>or use your email for registration</span>
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit" className="mt-4">Sign Up</button>
        </form>
    );
};

const SignInForm = () => {
    const router = useRouter();
    const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;
        
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            toast.error(result.error || 'Invalid credentials.');
        } else {
            toast.success('Logged in successfully!');
            router.push(`${WEB_URL}/dashboard`);
        }
    }

    const handleForgotPassword = async () => {
        try {
            const response = await fetch(`${WEB_URL}/api/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: forgotEmail }),
            });
            if (response.ok) {
                toast.success('If an account with that email exists, a password reset link has been sent.');
            } else {
                const data = await response.json();
                toast.error(data.message || 'An error occurred.');
            }
        } catch (error) {
            toast.error('Failed to send reset link.');
        }
        setIsForgotModalOpen(false);
        setForgotEmail('');
    }

    return (
        <>
            <form onSubmit={handleLogin} data-testid="login-form">
                <h1 className="text-3xl font-bold font-headline mb-3">Sign In</h1>
                <div className="social-icons">
                     <SocialButton icon={<Chrome size={20} />} onClick={() => signIn('google', { callbackUrl: `${WEB_URL}/dashboard` })} tooltip="Sign in with Google" />
                     <SocialButton icon={<GitMerge size={20} />} onClick={() => signIn('github', { callbackUrl: `${WEB_URL}/dashboard` })} tooltip="Sign in with GitHub" />
                </div>
                <span>or use your email and password</span>
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="button" onClick={() => setIsForgotModalOpen(true)} className="text-xs underline my-2 bg-transparent p-0 text-muted-foreground normal-case font-normal letter-spacing-normal hover:text-primary">Forgot Your Password?</button>
                <button type="submit">Sign In</button>
            </form>

            <Dialog open={isForgotModalOpen} onOpenChange={setIsForgotModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Forgot Password</DialogTitle>
                        <DialogDescription>
                            Enter your email address and we&apos;ll send you a link to reset your password.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Label htmlFor="forgot-email">Email Address</Label>
                        <Input 
                            id="forgot-email" 
                            type="email" 
                            value={forgotEmail} 
                            onChange={(e) => setForgotEmail(e.target.value)}
                            placeholder="you@example.com"
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsForgotModalOpen(false)}>Cancel</Button>
                        <Button onClick={handleForgotPassword}>Send Reset Link</Button>
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
        // If the URL has a parameter `action=signup`, activate the signup panel
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
