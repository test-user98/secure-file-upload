import { redirect } from 'next/navigation'
import UserManagement from '@/components/user-management'
import { auth } from '@/auth';
import { userSession } from '@/types/types';

export default async function AdminDashboardPage() {
 const session = await auth();
  if (!session)
    redirect("/auth/login")
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div> 
        <UserManagement session={session as unknown as userSession} />
      </div>
    </div>
  )
}

