import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
// import { ChevronDown } from "lucide-react"

import { cn } from "../../lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg.plus-icon]:hidden [&[data-state=open]>svg.minus-icon]:inline-block",
        className,
      )}
      {...props}
    >
      {children}
      {/* <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" /> */}
      <svg
        className="plus-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
      >
        <path
          d="M17 26.9982C17.0057 27.2597 17.1136 27.5084 17.3005 27.6913C17.4874 27.8742 17.7385 27.9766 18 27.9766C18.2615 27.9766 18.5125 27.8742 18.6994 27.6913C18.8864 27.5084 18.9943 27.2597 19 26.9982V9.00213C18.9943 8.74071 18.8864 8.49192 18.6994 8.30906C18.5125 8.12619 18.2615 8.02379 18 8.02379C17.7385 8.02379 17.4874 8.12619 17.3005 8.30906C17.1136 8.49192 17.0057 8.74071 17 9.00213V26.9982Z"
          fill="#7D3CF3"
          stroke="#7D3CF3"
          strokeWidth="0.8"
        />
        <path
          d="M9.00177 17C8.74035 17.0057 8.49156 17.1136 8.3087 17.3005C8.12584 17.4874 8.02344 17.7385 8.02344 18C8.02344 18.2615 8.12584 18.5125 8.3087 18.6994C8.49156 18.8864 8.74035 18.9943 9.00177 19H26.9979C27.2593 18.9943 27.5081 18.8864 27.6909 18.6994C27.8738 18.5125 27.9762 18.2615 27.9762 18C27.9762 17.7385 27.8738 17.4874 27.6909 17.3005C27.5081 17.1136 27.2593 17.0057 26.9979 17H9.00177Z"
          fill="#7D3CF3"
          stroke="#7D3CF3"
          strokeWidth="0.8"
        />
      </svg>
      <svg
        className="minus-icon hidden"
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.00177 17C8.74035 17.0057 8.49156 17.1136 8.3087 17.3005C8.12584 17.4874 8.02344 17.7385 8.02344 18C8.02344 18.2615 8.12584 18.5125 8.3087 18.6994C8.49156 18.8864 8.74035 18.9943 9.00177 19H26.9979C27.2593 18.9943 27.5081 18.8864 27.6909 18.6994C27.8738 18.5125 27.9762 18.2615 27.9762 18C27.9762 17.7385 27.8738 17.4874 27.6909 17.3005C27.5081 17.1136 27.2593 17.0057 26.9979 17H9.00177Z"
          fill="#7D3CF3"
          stroke="#7D3CF3"
          strokeWidth="0.8"
        />
      </svg>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
