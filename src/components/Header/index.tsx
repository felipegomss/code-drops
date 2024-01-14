"use client";
import React from "react";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { cn } from "@/lib/utils";

const sources = [
  {
    title: "freeCodeCamp",
    href: "/freecodecampo",
    description:
      "A community of people from all around the world who are learning to code together.",
  },
  {
    title: "GitHub Trending",
    href: "/github",
    description: "See what the GitHub community is most excited about today.",
  },
  {
    title: "Hackernews",
    href: "/hackernews",
    description:
      "A social news website focusing on computer science and entrepreneurship.",
  },
  {
    title: "Hashnode",
    href: "/hashnode",
    description:
      "Hashnode is your go-to community to connect with other developers worldwide.",
  },
  {
    title: "Medium",
    href: "/medium",
    description:
      "Discover stories, thinking, and expertise from writers on any topic.",
  },
  {
    title: "DevTo",
    href: "/devto",
    description:
      "A constructive and inclusive social network for software developers. With you every step of your journey.",
  },
  {
    title: "[PT-BR] TabNews",
    href: "/tabnews",
    description:
      "Conteúdos com valor concreto para quem trabalha com tecnologia.",
  },
  {
    title: "Powered by AI",
    href: "/poweredbyai",
    description: "Let us choose!",
  },
];

export default function Header() {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:justify-between justify-center w-full p-6 md:p-10 items-center bg-white">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        &lt;CodeDrops/&gt;
      </h3>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>{" "}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Sources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 w-80 md:grid-cols-2 ">
                {sources.map((source) => (
                  <ListItem
                    key={source.title}
                    title={source.title}
                    href={source.href}
                  >
                    {source.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            target="_blank"
            href="https://hackertab.dev"
            rel="noopener noreferrer"
          >
            hackertab.dev
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
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
          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
