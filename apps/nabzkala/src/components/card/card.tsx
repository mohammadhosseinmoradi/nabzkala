"use client";

import {
  useMemo,
  type ElementType,
  type Ref,
  ComponentRef,
  ReactNode,
} from "react";
import {
  forwardRefWithAs,
  mergeProps,
  render,
  type HasDisplayName,
  type RefProp,
} from "@/lib/utils/render";
import { cva, VariantProps } from "cva";
import { Props } from "@/lib/utils/render/types";
import { cn } from "@/lib/utils";

let DEFAULT_CARD_TAG = "div" as const;

type CardRenderPropArg = {};

type CardPropsWeControl = never;

const card = cva({
  base: "bg-white shadow-sm p-6 rounded-xl",
});

export type CardProps<TTag extends ElementType = typeof DEFAULT_CARD_TAG> =
  Props<
    TTag,
    CardRenderPropArg,
    CardPropsWeControl,
    {} & VariantProps<typeof card>
  >;

function CardFn<TTag extends ElementType = typeof DEFAULT_CARD_TAG>(
  props: CardProps<TTag>,
  ref: Ref<ComponentRef<TTag>>,
) {
  let { className, ...theirProps } = props as CardProps<"div">;

  let ourProps = mergeProps({
    ref,
    className: cn(card({}), className),
  });

  let slot = useMemo(() => ({}) satisfies CardRenderPropArg, []);

  return render({
    ourProps,
    theirProps,
    slot,
    defaultTag: DEFAULT_CARD_TAG,
    name: "Card",
  });
}

export interface _internal_ComponentCard extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_CARD_TAG>(
    props: CardProps<TTag> & RefProp<typeof CardFn<TTag>>,
  ): ReactNode;
}

const Card = forwardRefWithAs(CardFn) as unknown as _internal_ComponentCard;

export { Card };
