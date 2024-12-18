'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import axios from 'axios'
import { credsLoginHandler } from '@/serveractions/serveractions'
import { useMutation } from '@tanstack/react-query'
import { LoaderCircle } from 'lucide-react'

export default function RegisterForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)
  const router = useRouter()

  const handleSubmitMutation = useMutation({
    mutationFn: async (e: React.FormEvent) => {
      e.preventDefault();
      if (step == 1) {
        if (password != confirmPassword)
          return setError('Passwords do not match');
        await axios.post('/api/user/signup', {
          email: email,
          password: password
        })
        setStep(2);
        setError("");
      }
      else if (step == 2) {
        const err = await credsLoginHandler({
          email: email,
          password: otp
        });
        if (err)
          return setError(err as unknown as string);
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


  return (
    <Card>
      <CardHeader>
        <CardTitle>{step === 1 ? 'Register' : 'Verify OTP'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => handleSubmitMutation?.mutate(e)} className="space-y-4">
          {step === 1 ? (
            <>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </>
          ) : (
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Enter OTP
              </label>
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
            disabled={handleSubmitMutation?.isPending}
            type="submit" className="w-full">
            {handleSubmitMutation?.isPending ? <LoaderCircle className='h-4 w-4 animate-spin' /> : step === 1 ? 'Register' : 'Verify OTP'}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-center">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

