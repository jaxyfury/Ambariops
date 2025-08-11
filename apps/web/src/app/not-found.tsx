import Link from 'next/link'
import { Button } from '@amberops/ui/button'
import { AmberOpsLogo } from '@amberops/ui/icons'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center px-4">
      <div className="flex items-center gap-4 mb-8">
        <AmberOpsLogo className="h-12 w-12" />
        <h1 className="font-headline text-3xl font-semibold">AmberOps</h1>
      </div>
      <h2 className="text-6xl font-headline font-bold text-primary">404</h2>
      <p className="mt-4 text-2xl font-semibold">Page Not Found</p>
      <p className="mt-2 text-muted-foreground">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Button asChild className="mt-8">
        <Link href="/dashboard">Go to Dashboard</Link>
      </Button>
    </div>
  )
}
