import { Nav } from "@/components/Nav/Nav";
import { Link } from '@chakra-ui/next-js';
import { Box, Container, Flex, Heading, Image } from "@chakra-ui/react";

/**
 * Renders the header component. Conditionally renders navigation based on authentication status.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isAuthenticated - Indicates whether the user is authenticated.
 * @returns {JSX.Element} The rendered header component.
 */
export default function Header({isAuthenticated}: {isAuthenticated: boolean}): JSX.Element {
  return (
    <Box as="header" mb={8} bgGradient='linear(to-l, #7928CA, #FF0080)'>
      <Container maxWidth="6xl" p={{base: 4, lg:8}} >
        <Flex justifyContent="space-between" alignItems="center" direction={{base: "column", lg:"row"}}>
          <Link href="/" title="Return home" aria-label="Home" display="flex" justifyContent="center" alignItems="center">
            <Image src="https://app.leonardo.ai/img/leonardo-logo.svg" alt="Leonardo.ai Logo" width="100" height="100" mr={{base:2,lg:4}} />
            <Heading size={{base: 'xl', lg: '2xl'}} fontWeight={"black"}>LC &rsquo;2024</Heading>
          </Link>
          {isAuthenticated && <Nav />}
        </Flex>
      </Container>
    </Box>
  );
}
