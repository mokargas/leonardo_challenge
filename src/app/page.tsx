'use client'

import AuthForm from "@/components/AuthForm/AuthForm";
import { useAuth } from "@/contexts/AuthContext";
import { Button, Card, CardBody, CardHeader, Container, Divider, Heading, Text, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/navigation";

const Home: NextPage = () => {
  const { isAuthenticated, handleLogin, handleLogout, userData } = useAuth();
  const router = useRouter();

  const handleRoute = (route: string) => router.push(route)

  return (
    <>
      {!isAuthenticated ? (<Card variant="elevated">
        <CardBody>
          <AuthForm isAuthenticated={isAuthenticated} handleLogin={handleLogin} handleLogout={handleLogout} userData={userData} />
        </CardBody>
      </Card>
      ) : (<>
        <Card>
          <CardHeader>
            <Heading size="lg" fontWeight="regular">Welcome {userData?.username}!</Heading>
          </CardHeader>
          <CardBody>
            <Text as="p" mb={8} aria-live="polite">
              The following actions are available to you:
            </Text>
            <Container maxWidth="sm">
              <VStack>
                <Button variant="action" width="full" title="View Information on Animes" onClick={() => handleRoute('/information')}>View Information</Button>
                <Divider />
                <Button width="full" title="Edit your username and title" onClick={() => handleRoute('/profile')}>Edit your profile</Button>
              </VStack>

            </Container>
          </CardBody>
        </Card>
      </>)}
    </>
  );


}
export default Home