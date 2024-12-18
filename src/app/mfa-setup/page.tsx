import MFASetupForm from '@/components/mfa-setup-form'

export default function MFASetupPage() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Setup Multi-Factor Authentication</h1>
      <MFASetupForm />
    </div>
  )
}

