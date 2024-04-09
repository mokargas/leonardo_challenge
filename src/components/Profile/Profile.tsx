'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardBody } from '@chakra-ui/react';

import AuthForm from '@/components/AuthForm/AuthForm';

/**
 * Renders client-side component for the Profile Page.
 * @returns JSX.Element representing the Profile component.
 */
export default function Profile(): JSX.Element {
  const { isAuthenticated, handleLogin, handleLogout, userData } = useAuth();
  return (
    <Card variant="elevated">
      <CardBody>
        <AuthForm isAuthenticated={isAuthenticated} handleLogin={handleLogin} handleLogout={handleLogout} userData={userData} />
      </CardBody>
    </Card>
  );
}