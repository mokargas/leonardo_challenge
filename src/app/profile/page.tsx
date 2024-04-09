'use client'

import AuthForm from '@/components/AuthForm/AuthForm';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardBody } from '@chakra-ui/react';
import { NextPage } from 'next';

const ProfilePage: NextPage = () => {
  const { isAuthenticated, handleLogin, handleLogout, userData } = useAuth();
  return (
    <>
      <Card variant="elevated">
        <CardBody>
          <AuthForm isAuthenticated={isAuthenticated} handleLogin={handleLogin} handleLogout={handleLogout} userData={userData} />
        </CardBody>
      </Card>
    </>
  );
};

export default ProfilePage;
