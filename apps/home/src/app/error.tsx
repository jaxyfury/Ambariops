
'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@amberops/ui/components/ui/button';
import { AmberOpsLogo } from '@amberops/ui/components/icons';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
       <div className="w-full max-w-md text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
                <AmberOpsLogo className="h-12 w-12" />
                <h1 className="font-headline text-3xl font-semibold">AmberOps</h1>
            </div>
            <h2 className="text-6xl font-headline font-bold text-destructive">Error</h2>
            <p className="mt-4 text-2xl font-semibold">Something went wrong</p>
            <p className="mt-2 text-muted-foreground">
                An unexpected error occurred. Please try again, or if the problem persists, contact support.
            </p>
            <div className="flex gap-4 mt-8 justify-center">
                <Button onClick={() => reset()}>
                Try again
                </Button>
                <Button asChild variant="outline">
                    <Link href="/">Go to Homepage</Link>
                </Button>
            </div>
       </div>
    </div>
  )
}
