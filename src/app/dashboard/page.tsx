import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import FileUpload from '@/components/file-upload'
import FileList from '@/components/file-list'
import { auth } from '@/auth'
import { userSession } from '@/types/types'

export default async function DashboardPage() {
  const session = await auth();
  if (!session)
    redirect("/auth/login")
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div>
        <h2 className="text-xl font-semibold mb-2">Upload File</h2>
        <FileUpload session={session as unknown as userSession} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Your Files</h2>
        <FileList />
      </div>
    </div>
  )
}

