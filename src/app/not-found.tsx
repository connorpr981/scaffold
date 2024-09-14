import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-4">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Go back to home
      </Link>
    </div>
  )
}