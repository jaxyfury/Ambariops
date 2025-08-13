
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
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import { GitMerge, Chrome } from 'lucide-react'

export default function LoginPage() {
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
            router.push('http://localhost:3000/dashboard');
        }
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/20 p-4">
        <Card className="w-full max-w-sm">
        <CardHeader>
            <div className="flex items-center justify-center gap-3 mb-4">
            <AmberOpsLogo className="h-10 w-10" />
            <CardTitle className="text-3xl font-headline">Admin Login</CardTitle>
            </div>
            <CardDescription>
            Enter your credentials to access the dashboard.
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
                <form className="space-y-4" onSubmit={handleLogin} data-testid="login-form">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="admin@example.com" required />
                </div>
                <div className="space-y-2">
                    <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                        href="#"
                        className="ml-auto inline-block text-sm underline"
                        prefetch={false}
                    >
                        Forgot your password?
                    </Link>
                    </div>
                    <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                    Sign in
                </Button>
                </form>
            </div>
            <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline" prefetch={false}>
                Sign up
            </Link>
            </div>
        </CardContent>
        </Card>
    </div>
  );
}
