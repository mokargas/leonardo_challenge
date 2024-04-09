'use client';

import { AnimeMedia, ModalContent, QueryData, queryDataSchema } from '@/lib/schema';
import { Flex, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';

import Loading from '@/app/information/loading';
import { DetailsModal } from '@/components/DetailsModal/DetailsModal';
import { Listing } from '@/components/Listing/Listing';
import { Pagination } from '@/components/Listing/Pagination';
import { GET_ANIME } from '@/lib/queries';
import { stripHtmlTags } from '@/utils';

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

interface InformationProps {
  page: number;
}

/**
 * Renders the client-side component for the Information Page
 *
 * @param {InformationProps} props - The component props.
 * @param {string} props.page - The page to display information for.
 * @returns {JSX.Element} The rendered Information component.
 */
export default function Information({ page }: InformationProps) {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<ModalContent | null>(null);

  const handlePageChange = (newPage: number) => router.push(`/information/${newPage}`);

  const { data } = useSuspenseQuery<QueryData>(GET_ANIME, { variables: { page, perPage: 12 } });

  const parsedData = queryDataSchema.safeParse(data);

  /**
   * Handles the selection of a listing and opening of the modal
   *
   * @param data - The AnimeMedia object representing the selected listing.
   */
  const handleListingSelection = (data: AnimeMedia) => {
    setSelectedItem({
      title: data.title.romaji,
      imageURL: data.coverImage.large,
      content: stripHtmlTags(data.description), // Remove HTML tags from the description as the API returns it with HTML tags
    });
    onOpen();
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        {parsedData.success ? (
          <Flex direction="column">
            <Pagination aria-label="Top Pagination" handlePageChange={handlePageChange} data={parsedData.data} p={{ base: 2, lg: 4 }} mt={-4} mb={4} position="sticky" top="0" backdropFilter='auto' backdropBlur='8px' zIndex={100} />
            <Listing data={parsedData.data} onSelectedAnime={handleListingSelection} />
            <Pagination aria-label="Bottom Pagination" handlePageChange={handlePageChange} data={parsedData.data} mt={8} />
          </Flex>
        ) : (
          <Stack spacing={4} align="center" justifyContent="center">
            <Text fontSize="xl" color="gray.500">
              Oops! Something went wrong while fetching the data.
            </Text>
            <Text fontSize="md" color="gray.500">
              Please try again later.
            </Text>
          </Stack>
        )}
        <DetailsModal isOpen={isOpen} onClose={onClose} imageURL={selectedItem?.imageURL || null} content={selectedItem?.content || null} title={selectedItem?.title || null} />
      </Suspense>
    </>
  );
}