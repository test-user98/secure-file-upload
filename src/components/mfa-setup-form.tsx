'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function MFASetupForm() {
  const [mfaSecret, setMfaSecret] = useState('')
  const [mfaCode, setMfaCode] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const setupMFA = async () => {
      try {
        const response = await fetch('/api/mfa/setup', { method: 'POST' })
        if (response.ok) {
          const data = await response.json()
          setMfaSecret(data.mfaSecret)
        } else {
          setError('Failed to set up MFA')
        }
      } catch (error) {
        setError('An error occurred. Please try again.')
      }
    }
    setupMFA()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('/api/mfa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: mfaCode }),
      })

      if (response.ok) {
        router.push('/dashboard')
      } else {
        setError('Invalid MFA code')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Setup Multi-Factor Authentication</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="mb-2">Your MFA secret is: {mfaSecret}</p>
            <p className="mb-2">Please enter this secret into your authenticator app.</p>
          </div>
          <div>
            <label htmlFor="mfaCode" className="block text-sm font-medium text-gray-700">
              Enter the 6-digit code from your authenticator app
            </label>
            <Input
              type="text"
              id="mfaCode"
              value={mfaCode}
              onChange={(e) => setMfaCode(e.target.value)}
              required
              pattern="\d{6}"
              maxLength={6}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" className="w-full">
            Verify and Complete Setup
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

