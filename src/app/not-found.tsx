import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl text-center">404 - Page Not Found</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6 text-muted-foreground">
            Sorry, the page you are looking for does not exist.
          </p>
          <Button asChild variant="default">
            <Link href="/">Go back to home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}