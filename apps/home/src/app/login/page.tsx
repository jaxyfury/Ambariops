
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

export default function LoginPage() {
  return (
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
        <form className="space-y-4">
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
          <Button variant="outline" className="w-full">
            Sign in with Google
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="underline" prefetch={false}>
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

    