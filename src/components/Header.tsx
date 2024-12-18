'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { useSelector } from 'react-redux'
import { rootReducer } from '@/types/types'

export default function Header() {
  const user = useSelector((state: ReturnType<typeof rootReducer>) => state?.user);

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
          Secure File Share
        </Link>
        {user?.email ? (
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Button onClick={() => signOut()}>Logout</Button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Register</Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}

