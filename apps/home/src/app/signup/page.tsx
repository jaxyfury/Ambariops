
'use client'

import { Button } from '@amberops/ui/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@amberops/ui/components/ui/card'
import { Input } from '@amberops/ui/components/ui/input'
import { Label } from '@amberops/ui/components/ui/label'
import Link from 'next/link'
import { AmberOpsLogo } from '@amberops/ui/components/icons'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { GitMerge, Chrome } from 'lucide-react'

export default function SignupPage() {
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const name = e.currentTarget.name.value;
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;

        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (response.ok) {
            toast.success('Account created successfully! Redirecting to login...');
            router.push('/login');
        } else {
            const data = await response.json();
            toast.error(data.message || 'Something went wrong.');
        }
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/20 p-4">
        <Card className="w-full max-w-sm">
        <CardHeader>
            <div className="flex items-center justify-center gap-3 mb-4">
                <AmberOpsLogo className="h-10 w-10" />
                <CardTitle className="text-3xl font-headline">Create Account</CardTitle>
            </div>
            <CardDescription>
            Enter your information to create a new account.
            </CardDescription>
        </CardHeader>
        <CardContent>
             <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" type="button" onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/dashboard' })}>
                        <Chrome className="mr-2 h-4 w-4" />
                        Google
                    </Button>
                    <Button variant="outline" type="button" onClick={() => signIn('github', { callbackUrl: 'http://localhost:3000/dashboard' })}>
                        <GitMerge className="mr-2 h-4 w-4" />
                        GitHub
                    </Button>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                        </span>
                    </div>
                </div>
                <form className="space-y-4" onSubmit={handleSignup} data-testid="signup-form">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" type="text" placeholder="Your Name" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="name@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">
                        Create Account
                    </Button>
                </form>
            </div>
            <div className="mt-4 text-center text-sm">
                Already have an account?{' '}
                <Link href="/login" className="underline" prefetch={false}>
                    Sign in
                </Link>
            </div>
        </CardContent>
        </Card>
    </div>
  );
}
