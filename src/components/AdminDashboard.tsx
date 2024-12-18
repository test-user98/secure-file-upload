import React from 'react';
import UserManagement from '../components/UserManagement';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <UserManagement />
        </CardContent>
      </Card>
      {/* Add more admin-specific components here */}
    </div>
  );
};

export default AdminDashboard;

