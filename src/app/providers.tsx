'use client'

import { AuthProvider } from '@/contexts/AuthContext';
import theme from '@/theme';
import { ChakraProvider } from '@chakra-ui/react';

import { AuthLayout } from '@/components/Layouts/AuthLayout';
import { ReactNode } from 'react';

/**
 * Renders client-side providers
 *
 * @param children - The child components to be rendered.
 * @returns The rendered Providers component.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <AuthProvider>
        <AuthLayout>
          {children}
        </AuthLayout>
      </AuthProvider>
    </ChakraProvider>)
}