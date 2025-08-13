
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

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/20">
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
            <form className="space-y-4">
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
                 <Button variant="outline" className="w-full">
                    Sign up with Google
                </Button>
            </form>
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

    