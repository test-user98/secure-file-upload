import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setupMFA } from '../store/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MFASetup: React.FC = () => {
  const [mfaCode, setMfaCode] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would verify the MFA code here
    dispatch(setupMFA(mfaCode));
    history.push('/dashboard');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Setup Multi-Factor Authentication</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="mb-2">Scan the QR code with your authenticator app:</p>
            <img src="/placeholder.svg?height=200&width=200" alt="MFA QR Code" className="mx-auto" />
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
          <Button type="submit" className="w-full">
            Verify and Complete Setup
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MFASetup;

