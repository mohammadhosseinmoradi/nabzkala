import {
  ComponentRef,
  ElementType,
  ReactNode,
  Ref,
  useEffect,
  useState,
} from "react";
import { cn } from "@repo/hooks-and-utils";
import { cva, VariantProps } from "cva";
import {
  forwardRefWithAs,
  HasDisplayName,
  RefProp,
  render,
} from "@repo/hooks-and-utils";
import { Props } from "@repo/hooks-and-utils";
import Image, { ImageProps } from "next/image";

const avatar = cva({
  base: "inline-grid align-middle *:col-start-1 *:row-start-1 rounded-full *:rounded-full",
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
});

const DEFAULT_AVATAR_TAG = "span";

export type AvatarProps<TTag extends ElementType = typeof DEFAULT_AVATAR_TAG> =
  Props<
    TTag,
    {},
    never,
    {
      initials?: string;
      src?: string | null;
      alt?: string;

      children?: never;
    } & VariantProps<typeof avatar> &
      Pick<ImageProps, "sizes" | "width" | "height">
  >;

function AvatarFn<TTag extends ElementType = typeof DEFAULT_AVATAR_TAG>(
  props: AvatarProps<TTag>,
  ref: Ref<ComponentRef<TTag>>,
) {
  const [imageError, setImageError] = useState(false);

  const { className, initials, src, alt, width, height, sizes, ...otherProps } =
    props as AvatarProps<"button">;

  const resolvedClassName =
    typeof className === "function" ? className : className;

  useEffect(() => {
    setImageError(false);
  }, [src]);

  const ourProps = {
    "data-slot": "avatar",
    className: cn(avatar({}), resolvedClassName),
    children: (
      <>
        {((initials && !src) || (src && imageError)) && (
          <svg
            className="select-none fill-current text-4xl font-medium uppercase tracking-wide"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <text
              x="50%"
              y="50%"
              alignmentBaseline="middle"
              dominantBaseline="middle"
              textAnchor="middle"
              dy="0.125em"
            >
              {initials}
            </text>
          </svg>
        )}
        {src && !imageError && (
          <Image
            onError={() => {
              setImageError(true);
            }}
            className="aspect-square size-full object-cover"
            src={src}
            width={width || 500}
            height={height || 500}
            quality={75}
            sizes={sizes}
            alt={alt || ""}
          />
        )}
      </>
    ),
  };

  return render({
    ourProps,
    theirProps: otherProps,
    slot: {},
    defaultTag: DEFAULT_AVATAR_TAG,
    name: "Avatar",
  });
}

interface _internal_ComponentAvatar extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_AVATAR_TAG>(
    props: AvatarProps<TTag> & RefProp<typeof AvatarFn<TTag>>,
  ): ReactNode;
}

const Avatar = forwardRefWithAs(
  AvatarFn,
) as unknown as _internal_ComponentAvatar;

export { Avatar };
