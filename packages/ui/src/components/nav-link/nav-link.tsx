"use client";

import Link from "next/link";
import {
  ComponentRef,
  CSSProperties,
  forwardRef,
  ReactNode,
  useMemo,
} from "react";
import { useNavLink } from "@repo/hooks-and-utils";

export type NavLinkRenderArgs = {
  active: boolean;
  hasActiveChildren: boolean;
};

export type NavLinkProps = {
  className?: string | ((props: NavLinkRenderArgs) => string);
  style?: CSSProperties | ((props: NavLinkRenderArgs) => CSSProperties);
  children?: ReactNode | ((props: NavLinkRenderArgs) => ReactNode);
} & Omit<Parameters<typeof Link>[0], "className" | "style" | "children">;

/**
 * NavLink is a custom navigation link component that determines its active state based on the current pathname.
 *
 * @component
 * @example
 * // Example usage:
 * <NavLink href="/example" className={({ active }) => active ? 'bg-blue-500' : 'bg-neutral-500'}>
 *   Example Link
 * </NavLink>
 *
 * @param {NavLinkProps} props - The properties for the NavLink component.
 * @param {ComponentRef<typeof Link>} ref - Forwarded ref for the Link component.
 * @returns {JSX.Element} - The rendered NavLink component.
 */
const NavLink = forwardRef<ComponentRef<typeof Link>, NavLinkProps>(
  (props, ref) => {
    const { href, className, style, children, ...otherProps } = props;

    const { active, hasActiveChildren } = useNavLink({
      href,
    });

    const dataProps = useMemo(() => {
      return {
        ...(active ? { "data-active": active } : {}),
        ...(hasActiveChildren
          ? { "data-active-children": hasActiveChildren }
          : {}),
      };
    }, [active, hasActiveChildren]);

    return (
      <Link
        ref={ref}
        href={href}
        className={`${
          typeof className === "function"
            ? className({ active, hasActiveChildren })
            : className
        }`}
        style={
          typeof style === "function"
            ? style({ active, hasActiveChildren })
            : style
        }
        {...dataProps}
        {...otherProps}
      >
        {typeof children === "function"
          ? children({ active, hasActiveChildren })
          : children}
      </Link>
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
