import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session: any = await auth();
  if (session?.role == 2)
    redirect('/dashboard')
  else
    redirect("/admin")
}

