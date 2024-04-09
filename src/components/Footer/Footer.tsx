import { Box, Container, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box as="footer" bgColor={"gray.900"}>
    <Container maxWidth="6xl" mt={8} p={8}>
      <Text as="p">&copy; {new Date().getFullYear()} Leonardo.ai</Text>
    </Container>
    </Box>
  )
}