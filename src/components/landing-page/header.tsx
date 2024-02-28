"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface ComponentProps {
  title: string;
  href: string;
  description: string;
}
const routes = [
  { title: "Features", href: "#features" },
  { title: "Resources", href: "#resources" },
  { title: "Pricing", href: "#pricing" },
  { title: "Testimonials", href: "#testimonial" },
];

const components: ComponentProps[] = [
  {
    title: "Alert Dialog",
    href: "#",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "#",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "#",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "#",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "#",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "#",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

const Header = () => {
  const [path, setPath] = useState<string>("#products");

  return (
    <header className="w-full p-4 px-4 sm:px-6 flex justify-between  items-center">
      <Link href="/" className="flex items-center ">
        <Image src="/logo.svg" alt="quilllab logo" height={40} width={40} />
        <span className="font-semibold ml-2 text-lg text-white">quilllab.</span>
      </Link>

      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                onClick={() => setPath("#resources")}
                className={cn({
                  "dark:text-white": path === "#resources",
                  "dark:text-white/40": path !== "#resources",
                  "font-normal": true,
                  "text-xl": true,
                })}
              >
                Resources
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <span className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                        {/* <className="h-6 w-6" /> */}
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Welcome to quilllab.
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Beautifully designed components that you can copy and
                          paste into your apps. Accessible. Customizable. Open
                          Source.
                        </p>
                      </span>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs" title="Introduction">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </ListItem>
                  <ListItem href="/docs/installation" title="Installation">
                    How to install dependencies and structure your app.
                  </ListItem>
                  <ListItem
                    href="/docs/primitives/typography"
                    title="Typography"
                  >
                    Styles for headings, paragraphs, lists...etc
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                onClick={() => setPath("#pricing")}
                className={cn({
                  "dark:text-white": path === "#pricing",
                  "dark:text-white/40": path !== "#pricing",
                  "font-normal": true,
                  "text-xl": true,
                })}
              >
                Pricing
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px]">
                  <ListItem key={"ProPlan"} title={"Pro Plan"} href="#">
                    Unlock full power with collaboration.
                  </ListItem>
                  <ListItem key={"FreePlan"} title={"Free Plan"} href="#">
                    Unlock full power with collaboration.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                onClick={() => setPath("#testimonials")}
                className={cn({
                  "dark:text-white": path === "#testimonials",
                  "dark:text-white/40": path !== "#testimonials",
                  "font-normal": true,
                  "text-xl cursor-pointer": true,
                })}
              >
                Testimonials
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex gap-3">
        <Link href="/login">
          <Button variant={"btn-secondary"} size={"sm"} className="text-sm">
            Signin
          </Button>
        </Link>
        <Link href="/register">
          <Button variant={"btn-primary"} size={"sm"} className="text-sm">
            Register
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
