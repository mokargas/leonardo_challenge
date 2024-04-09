import { Flex, Spinner, Text } from "@chakra-ui/react"

export default function Loading() {
  return (
    <Flex justifyContent="center" alignItems="center">
      <Spinner size="xl" aria-label="Loading..." />
      <Text bgClip="text" bgGradient="linear(to-l, #fa5560, #b14bf4, #4d91ff)" fontWeight="semibold" as="div" ml={4}>Hold tight! Getting yet more anime ...</Text>
    </Flex>
  )
}
