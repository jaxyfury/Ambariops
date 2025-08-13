
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

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000';

const SocialButton = ({ icon, onClick }: { icon: React.ReactNode, onClick?: () => void }) => (
    <button type="button" onClick={onClick} className="social-icon">
        {icon}
    </button>
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
                 <SocialButton icon={<Chrome size={20} />} onClick={() => signIn('google', { callbackUrl: `${WEB_URL}/dashboard` })} />
                 <SocialButton icon={<GitMerge size={20} />} onClick={() => signIn('github', { callbackUrl: `${WEB_URL}/dashboard` })} />
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

    return (
        <form onSubmit={handleLogin} data-testid="login-form">
            <h1 className="text-3xl font-bold font-headline mb-3">Sign In</h1>
            <div className="social-icons">
                 <SocialButton icon={<Chrome size={20} />} onClick={() => signIn('google', { callbackUrl: `${WEB_URL}/dashboard` })} />
                 <SocialButton icon={<GitMerge size={20} />} onClick={() => signIn('github', { callbackUrl: `${WEB_URL}/dashboard` })} />
            </div>
            <span>or use your email and password</span>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="button" onClick={() => toast('Forgot Password functionality coming soon!')} className="text-xs underline my-2 bg-transparent p-0 text-muted-foreground normal-case font-normal letter-spacing-normal">Forgot Your Password?</button>
            <button type="submit">Sign In</button>
        </form>
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

