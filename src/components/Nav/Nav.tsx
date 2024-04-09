import { LinkProps as ChakraLinkProps, Link } from "@chakra-ui/next-js";
import { Stack } from "@chakra-ui/react";
import { LinkProps as NextLinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type NavItem = {
  href: string;
  label: string;
};

type NavLinkProps = ChakraLinkProps & NextLinkProps & {
  children: ReactNode;
};

function NavLink ({ href, children, ...props }: NavLinkProps) {
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

const items: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/information', label: 'Information' },
  { href: '/profile', label: 'Profile' },
];

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