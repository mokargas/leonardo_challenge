
import { QueryData } from '@/lib/schema';
import { Box, BoxProps, Button, Flex } from '@chakra-ui/react';

interface PaginationProps extends BoxProps {
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
    <Flex justifyContent="center" alignItems="center" bg="transparent" {...props}>
      <Button
        variant="action"
        isDisabled={data.Page.pageInfo.currentPage === 1}
        onClick={() => handlePageChange(data.Page.pageInfo.currentPage - 1)}
        mr={4}
        aria-label="Previous Page"
      >
        Prev
      </Button>
      <Box aria-live="polite">
        Page {data.Page.pageInfo.currentPage} of {data.Page.pageInfo.lastPage}
      </Box>
      <Button
        variant="action"
        isDisabled={data.Page.pageInfo.currentPage === data.Page.pageInfo.lastPage}
        onClick={() => handlePageChange(data.Page.pageInfo.currentPage + 1)}
        ml={4}
        aria-label="Next Page"
      >
        Next
      </Button>
    </Flex>
  );
}
