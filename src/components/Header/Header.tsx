import { Nav } from "@/components/Nav/Nav";
import { Link } from '@chakra-ui/next-js';
import { Box, Container, Flex, Heading, Image } from "@chakra-ui/react";

export default function Header({isAuthenticated}: {isAuthenticated: boolean}) {
  return (
    <Box as="header" mb={8} bgGradient='linear(to-l, #7928CA, #FF0080)'>
      <Container maxWidth="6xl" p={8} >
        <Flex justifyContent="space-between" alignItems="center" direction={{sm: 'column', md:'row'}}>
          <Link href="/" title="Return home" aria-label="Home" display="flex" justifyContent="center" alignItems="center">
            <Image src="https://app.leonardo.ai/img/leonardo-logo.svg" alt="Leonardo.ai Logo" width="100" height="100" mr={4} />
            <Heading size="2xl" fontWeight={"black"}>LC &rsquo;2024</Heading>
          </Link>
          {isAuthenticated && <Nav />}
        </Flex>
      </Container>
    </Box>
  );
}
