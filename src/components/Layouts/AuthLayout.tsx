'use client'

import AuthForm from "@/components/AuthForm/AuthForm";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardBody, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

export function AuthLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, handleLogin, handleLogout, userData } = useAuth();
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <Flex as="main" direction="column" align="center" minH="100vh">
        <Container maxWidth="6xl" >
          {!isAuthenticated ? <>
            <Card>
              <CardBody>
                <Heading size="lg" mb={8}>Access Required</Heading>
                <Text as="p" mb={8}>Please create a profile to access this page</Text>
                <AuthForm isAuthenticated={isAuthenticated} handleLogin={handleLogin} handleLogout={handleLogout} userData={userData} />
              </CardBody>
            </Card>
          </> : (
            <>
              {children}
            </>)}
        </Container>
      </Flex>
      <Footer />
    </>
  );
}
