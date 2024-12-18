'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SettingsForm() {
  const handleSetupMFA = () => {
    // In a real application, you would implement MFA setup logic here
    console.log('Setting up MFA')
  }

  const handleChangePassword = () => {
    // In a real application, you would implement password change logic here
    console.log('Changing password')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Multi-Factor Authentication</h3>
          <p className="text-sm text-gray-500">Enhance your account security with MFA</p>
          <Button className="mt-2" onClick={handleSetupMFA}>Setup MFA</Button>
        </div>
        <div>
          <h3 className="text-lg font-medium">Change Password</h3>
          <p className="text-sm text-gray-500">Update your password regularly for better security</p>
          <Button className="mt-2" onClick={handleChangePassword}>Change Password</Button>
        </div>
      </CardContent>
    </Card>
  )
}

