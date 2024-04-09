
import { AnimeMedia, QueryData } from '@/lib/schema';
import { Button, Card, CardBody, Heading, SimpleGrid, Skeleton, SkeletonText, Stack } from '@chakra-ui/react';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import Image from 'next/image';
const MotionCard = motion(Card);

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
    },
  }),
};

interface ListingProps {
  data: QueryData;
  onSelectedAnime: (anime: AnimeMedia) => void;
}

/**
 * Renders a listing component.
 * @param data - The data for the listing.
 */
export function Listing({ data, onSelectedAnime }: ListingProps) {

  const handleOpenModal = (data: AnimeMedia) => {
    if (!data || !onSelectedAnime) return;
    onSelectedAnime(data);
  };

  return (
    <>
      <AnimatePresence>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4} aria-label="Anime Information Cards">
          {data.Page.media.map((anime,index) => (
            <Button key={anime.id} onClick={() => handleOpenModal(anime)} variant="unstyled" height="auto" title={`Learn more about ${anime.title.romaji}`}>
              <MotionCard variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                custom={index}
                aria-label={`Card for \${anime.title.romaji}`} bgColor="gray.900" _hover={{ bgColor: "black" }} transition="background ease 0.350s">
                <CardBody>
                  <Stack spacing={4}>
                    <Skeleton isLoaded={!!anime.title.romaji}>
                      <Heading size="md" fontWeight="regular"
                        isTruncated
                        noOfLines={2}
                        height="64px"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="normal"
                        lineHeight="1.5"
                      >{anime.title.romaji}</Heading>
                    </Skeleton>
                    <SkeletonText noOfLines={4} isLoaded={!!anime.title.romaji} />
                  </Stack>
                  <Skeleton isLoaded={!!anime.coverImage.large}>
                    <Image
                      title={anime.title.romaji}
                      src={anime.coverImage.large}
                      loading='lazy'
                      alt={anime.title.romaji}
                      width={230}
                      height={320}
                      style={{ objectFit: "cover", width: "100%", height: "320px", objectPosition: "center", borderRadius: 'var(--chakra-radii-md)' }}
                    />
                  </Skeleton>
                </CardBody>
              </MotionCard>
            </Button>
          ))}
        </SimpleGrid>
      </AnimatePresence>
    </>
  );
}
