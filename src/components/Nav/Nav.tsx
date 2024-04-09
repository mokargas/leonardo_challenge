import { LinkProps as ChakraLinkProps, Link } from "@chakra-ui/next-js";
import { Stack } from "@chakra-ui/react";
import { LinkProps as NextLinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type NavItem = {
  href: string;
  label: string;
};

const items: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/information', label: 'Information' },
  { href: '/profile', label: 'Profile' },
];

type NavLinkProps = ChakraLinkProps & NextLinkProps & {
  children: ReactNode;
};

/**
 * Renders a navigation link component.
 *
 * @param {NavLinkProps} props - The props for the NavLink component.
 * @returns {JSX.Element} The rendered NavLink component.
 */
function NavLink ({ href, children, ...props }: NavLinkProps): JSX.Element {
  const path = usePathname();

  const hrefPath = typeof href === 'string' ? href : href.pathname;

  const isActive = hrefPath === '/'
    ? path === hrefPath
    : path.startsWith(hrefPath || '')
  return (
      <Link
        fontWeight="semibold"
        textDecoration="none"
        _hover={{ color: 'whiteAlpha.900' }}
        color={isActive ? 'whiteAlpha.900' : 'whiteAlpha.700'}
        href={href}
        {...props}
      >
        {children}
      </Link>
  );
};

export function Nav() {
  return (
    <Stack as="nav" direction="row" spacing={4} align="center" mt={{sm: 0, md: 0, lg:4}}>
      {items.map((item) => (
        <NavLink key={item.href} href={item.href}>
          {item.label}
        </NavLink>
      ))}
    </Stack>
  )
}