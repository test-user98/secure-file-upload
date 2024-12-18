import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Settings: React.FC = () => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Multi-Factor Authentication</h3>
          <p className="text-sm text-gray-500">Enhance your account security with MFA</p>
          <Button className="mt-2">Setup MFA</Button>
        </div>
        <div>
          <h3 className="text-lg font-medium">Change Password</h3>
          <p className="text-sm text-gray-500">Update your password regularly for better security</p>
          <Button className="mt-2">Change Password</Button>
        </div>
        {/* Add more settings options here */}
      </CardContent>
    </Card>
  );
};

export default Settings;

