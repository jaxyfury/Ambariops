
'use client';

import Link from 'next/link';
import { Button } from '@amberops/ui/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@amberops/ui/components/ui/card';
import { Input } from '@amberops/ui/components/ui/input';
import { Label } from '@amberops/ui/components/ui/label';
import { AmberOpsLogo } from '@amberops/ui/components/icons';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd have login logic here.
        // For now, we'll just redirect to the dashboard.
        router.push('/dashboard');
    }

  return (
    <div className="flex h-screen items-center justify-center bg-muted/40">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
                <AmberOpsLogo className="h-10 w-10" />
                 <CardTitle className="text-3xl font-headline">AmberOps</CardTitle>
            </div>
          <CardDescription>
            Enter your credentials to access the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="admin@example.com" required defaultValue="admin@amberops.io" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required defaultValue="password" />
            </div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
            <Button variant="outline" className="w-full">
              Sign in with Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
