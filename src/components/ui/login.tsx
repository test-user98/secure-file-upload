'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'
import { credsLoginHandler } from '@/serveractions/serveractions'
import { useMutation } from '@tanstack/react-query'
import { LoaderCircle } from 'lucide-react'
import { Label } from './label'

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [step, setStep] = useState(1)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const submitMutation = useMutation({
    mutationFn: async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (step == 1) {
        const response = await axios.post('/api/user/verification', {
          email: email,
          password: password
        })
        setStep(2)
        setError("");
      }
      else if (step == 2) {
        const response = await credsLoginHandler({
          email: email,
          password: otp
        })
        if (response) {
          setError(response as unknown as string);
          return;
        }
        router.push("/")
      }
    },
    onError: (e) => {
      if (step != 1)
        return;
      const err: any = e
      setError(err?.response?.data?.message)
    }
  })

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{step === 1 ? 'Login' : 'Verify OTP'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => submitMutation.mutate(e)} className="space-y-4">
          {step === 1 ? (
            <>
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </Label>
                <div>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                </div>
              </div>
              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </Label>
                 <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </>
          ) : (
            <div>
              <Label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Enter OTP
              </Label>
              <Input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          )}
          {error && <p className="text-red-500">{error}</p>}
          <Button
            disabled={submitMutation.isPending}
            type="submit"
            className="w-full"
          >
            {submitMutation.isPending ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              step === 1 ? 'Login' : 'Verify OTP'
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  )
}

