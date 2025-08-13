
import { Button } from '@amberops/ui/components/ui/button'
import { AmberOpsLogo } from '@amberops/ui/components/icons'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <AmberOpsLogo className="h-16 w-16" />
          <h1 className="font-headline text-5xl font-semibold">AmberOps</h1>
        </div>
        <p className="mt-4 text-2xl font-semibold">
          The future of cluster management is here.
        </p>
        <p className="mt-2 text-muted-foreground">
          A modern, fast, and intuitive frontend for Apache Ambari.
        </p>
        <div className="flex gap-4 mt-8 justify-center">
          <Button asChild size="lg">
            <Link href="http://localhost:3000/login">Admin Login</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
             <Link href="#">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
