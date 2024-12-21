import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { userSession } from '@/types/types'
import FileManager from '@/components/file-manager'

export default async function DashboardPage() {
  const session = await auth();
  if (!session)
    redirect("/auth/login")
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <FileManager session={session as unknown as userSession} />
    </div>
  )
}

