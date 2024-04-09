
import {
  Box,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text
} from '@chakra-ui/react';
import { FC } from 'react';

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string | null;
  imageURL: string | null;
  content: string | null;
}

/**
 * Renders a details modal component.
 *
 * @component
 * @param {object} props - The component props.
 * @param {boolean} props.isOpen - Determines whether the modal is open or closed.
 * @param {Function} props.onClose - The function to be called when the modal is closed.
 * @param {string} props.title - The title of the modal.
 * @param {string} props.imageURL - The URL of the image to be displayed in the modal.
 * @param {string} props.content - The content to be displayed in the modal.
 * @returns {JSX.Element} The rendered details modal component.
 */
export const DetailsModal: FC<DetailsModalProps> = ({ isOpen, onClose, title, imageURL, content }): JSX.Element => {
  const hasData: boolean = !!(title && imageURL && content);
  //Don't render if any data is missing
  if (!hasData) {
    return <></>;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom" isCentered>
      <ModalOverlay backdropFilter="blur(12px)" />
      <ModalContent minW={{ base: "100%", md: '640px', lg: '800px' }} minH={{ sm: '100dvh', md: '500px' }} p={{ base: 4, lg: 8 }} bgColor="gray.900">
        <ModalHeader p={4} fontSize={{ lg: "2rem" }} bgClip="text" bgGradient="linear(to-l, #fa5560, #b14bf4, #4d91ff)" as="h2" >{title}</ModalHeader>
        <ModalCloseButton backgroundColor="rgba(0, 0, 0, 0.36)" mt={3} />
        <ModalBody p={4}>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 2, lg: 8 }} alignItems="start">
            <Image
              borderRadius="md"
              src={imageURL || 'https://placehold.co/320'}
              alt={title || 'An image of the anime title'}
              loading="lazy"
              objectFit="contain"
              width="full"
              height="320px"
              p={0}
              mb={{ base: 4, md: 0 }}
            />
            <Box>
              <Heading as="h3" size={{ base: 'sm', lg: 'md' }} fontWeight="semibold" mb={4}>About this title</Heading>
              <Text fontWeight="light" lineHeight={'1.6rem'} >{content}</Text>
            </Box>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
