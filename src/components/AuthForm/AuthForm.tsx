import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, HStack, Heading, Input, Text, ToastProps } from '@chakra-ui/react';
import { ReactNode, useEffect, useState } from 'react';

import { UserData, userSchema } from '@/lib/schema';
import { useToast } from '@chakra-ui/react';

interface AuthFormProps {
  children?: ReactNode;
  isAuthenticated?: boolean;
  userData: UserData;
  handleLogin?: (username: string, jobTitle: string) => void;
  handleLogout?: () => void;
}

const toastProps: Partial<ToastProps> = {
  duration: 5000,
  isClosable: true,
  position: 'top',
}

type UserErrors = Partial<Record<keyof UserData, string>>;

/**
 * A form component for authenticating or updating user information.
 *
 * @param {AuthFormProps} props The props for the AuthForm component.
 * @returns {JSX.Element} The rendered AuthForm component.
 */
const AuthForm = ({ isAuthenticated, handleLogin, handleLogout, userData, children }: AuthFormProps): JSX.Element => {
  const toast = useToast();

  const [errors, setErrors] = useState<UserErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [localUserData, setLocalUserData] = useState<UserData>(userData || { username: '', jobTitle: '' });

  //Hoist existing data into state for editing.
  useEffect(() => {
    if (isAuthenticated) {
      const result = userSchema.safeParse(userData);
      if (result.success) {
        setLocalUserData(userData);
      } else {
        console.warn('Invalid user data provided to AuthForm:', result.error.issues);
      }
    } else {
      setLocalUserData({ username: '', jobTitle: '' });
    }
  }, [userData, isAuthenticated]);

  /**
   * Handles the submission of the authentication form.
   * Validates user data against the schema and updates local storage and state accordingly.
   *
   * @param {React.FormEvent<HTMLFormElement>} e The form event.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const result = userSchema.safeParse(localUserData);

    if (!result.success) {
      const newErrors: UserErrors = {};
      result.error.issues.forEach(issue => {
        if (issue.path[0]) newErrors[issue.path[0] as keyof UserData] = issue.message;
      });
      setErrors(newErrors);
      toast({
        title: 'Problem creating profile',
        description: `Please check your information and try again.`,
        status: 'success',
        ...toastProps,
      });
    } else {
      handleLogin?.(localUserData.username, localUserData.jobTitle);
      toast({
        title: `Profile ${isAuthenticated ? 'updated' : 'created'}`,
        description: `${isAuthenticated ? `Changes saved` : `Welcome ${localUserData.username}!`}`,
        status: 'success',
        ...toastProps,
      });
      setErrors({});
    }
    setIsSubmitting(false);
  };

  /**
   * Handles changes to form input fields, updating the userData state and clearing any relevant errors.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e The input change event.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalUserData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  /**
   * Clears the local form user data.
   */
  const handleClear = () => {
    setLocalUserData({ username: '', jobTitle: '' });
    setErrors({});
  }

  /**
   * Handles the delete action.
   * Calls the handleLogout function if it exists.
   * Calls the handleClear function.
   */
  const handleDelete = () => {
    handleClear();
    handleLogout?.();
    setLocalUserData({ username: '', jobTitle: '' });
    setErrors({});
    toast({
      title: 'Logout complete',
      description: `See you later!`,
      status: 'success',
      ...toastProps,
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit} aria-describedby="form-description">
        <Heading size={{sm: 'lg', lg:'xl'}} mb={6} fontWeight="regular">
          <Text as="span">{isAuthenticated ? "Update Your" : "Create Your"}</Text>
          <Text as="span" bgClip="text" bgGradient="linear(to-l, #fa5560, #b14bf4, #4d91ff)"> Profile</Text>
        </Heading>
        <FormControl isInvalid={!!errors.username} mb={4} isRequired>
          <FormHelperText id="form-description" mb={4}>
            All fields are required.
          </FormHelperText>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            type="text"
            id="username"
            name="username"
            value={localUserData.username}
            onChange={handleChange}
            placeholder="Username"
            aria-required="true"
            disabled={isSubmitting}
          />
          <FormErrorMessage>{errors.username}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.jobTitle} mb={6} isRequired>
          <FormLabel htmlFor="jobTitle">Job Title</FormLabel>
          <Input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={localUserData.jobTitle}
            onChange={handleChange}
            placeholder="Job Title"
            aria-required="true"
            disabled={isSubmitting}

          />
          <FormErrorMessage>{errors.jobTitle}</FormErrorMessage>
        </FormControl>
        <HStack spacing={4} mb={6}>
          <Button
            type="submit"
            title="Submit the form"
            bgGradient="linear(to-l, #fa5560, #b14bf4, #4d91ff)"
            isLoading={isSubmitting}
            disabled={isSubmitting}

            loadingText={isAuthenticated ? "Updating..." : "Submitting..."}
          >
            {isAuthenticated ? "Update" : "Save"}
          </Button>
          <Button colorScheme="gray" onClick={isAuthenticated ? handleDelete : handleClear} disabled={isSubmitting}>
            {isAuthenticated ? "Logout" : "Clear"}
          </Button>
        </HStack>
      </form>
      {children}
    </>
  );
};

export default AuthForm;
