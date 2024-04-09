
import { QueryData } from '@/lib/schema';
import { copyToClipboard } from '@/utils';
import { Box, Button, ButtonProps, Flex, FlexProps, Icon, Text, useToast } from '@chakra-ui/react';

interface PaginationProps extends FlexProps {
  data: QueryData;
  handlePageChange: (newPage: number) => void;
}

/**
 * Renders a pagination component.
 * @param {Object} props - The component props.
 * @param {Array} data - The data to be paginated.
 * @param {Function} handlePageChange - The function to handle page changes.
 * @returns {JSX.Element} The pagination component.
 */
export function Pagination({ data, handlePageChange, ...props }: PaginationProps): JSX.Element {
  return (
    <Flex justifyContent="center" alignItems="center" bg="transparent" direction="column" {...props} >
      <Flex direction="row" justifyContent="center" alignItems="center" pt={{ base: 2, lg: 0 }} >
        <Button
          variant="action"
          isDisabled={data.Page.pageInfo.currentPage === 1}
          onClick={() => handlePageChange(data.Page.pageInfo.currentPage - 1)}
          mr={4}
          aria-label="Previous Page"
          size={{base:"sm", lg:"md"}}
        >
          Prev
        </Button>
        <Box aria-live="polite" >
          <Text as="span" size={{base:"xs", lg:"md"}}>Page {data.Page.pageInfo.currentPage} of {data.Page.pageInfo.lastPage}</Text>
        </Box>
        <Button
          variant="action"
          size={{base:"sm", lg:"md"}}

          isDisabled={data.Page.pageInfo.currentPage === data.Page.pageInfo.lastPage}
          onClick={() => handlePageChange(data.Page.pageInfo.currentPage + 1)}
          ml={4}
          aria-label="Next Page"
        >
          Next
        </Button>
      </Flex>
      <CopyLinkButton size={{ 'base': 'xs', lg: 'lg' }} alignSelf={'end'} position={{ lg: 'absolute' }} right={{ lg: '0' }} mt={{ base: 2, lg: -2 }} />
    </Flex>
  );
}

function CopyLinkButton({ ...props }: ButtonProps) {
  const toast = useToast();

  const handleCopyClick = async () => {
    try {
      await copyToClipboard(window.location.href);
      toast({
        title: 'Success',
        description: 'URL copied to clipboard',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      // TODO: We'd handle error here if it was prod
    }
  };

  return (
    <Button fontWeight='regular' ml={4} variant="link" onClick={handleCopyClick} leftIcon={<Icon>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill='white' d="M18 16c-1.1 0-2.1.4-2.8 1.1L7.9 12c.1-.3.1-.6.1-.9s0-.6-.1-.9l7.3-4.6c.7.7 1.7 1.1 2.8 1.1 2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4c0 .3 0 .6.1.9L5.9 8.1C5.1 7.4 4.1 7 3 7c-2.2 0-4 1.8-4 4s1.8 4 4 4c1.1 0 2.1-.4 2.8-1.1l7.3 4.6c-.1.3-.1.6-.1.9 0 2.2 1.8 4 4 4s4-1.8 4-4-1.8-4-4-4z" />
      </svg>
    </Icon>} {...props}>
      Share this page
    </Button>
  );
};