"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useCategories } from "@/hooks/use-categories";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function CategoryBar() {
    const { data: categories, isLoading } = useCategories();

    if (isLoading) {
        return (
            <div className="border-t border-outline-variant/50 bg-surface-container-lowest/50 hidden md:block">
                <div className="container-max flex h-9 items-center gap-8 px-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-4 w-16 bg-outline-variant/30 rounded animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="border-t border-outline-variant/50 bg-surface-container-lowest/50 hidden md:block">
            <div className="container-max flex h-9 items-center px-2 overflow-x-auto scrollbar-hide">
                <NavigationMenu>
                    <NavigationMenuList className="gap-1">
                        {categories.map((category) => (
                            <NavigationMenuItem key={category.id}>
                                {category.children && category.children.length > 0 ? (
                                    <>
                                        <NavigationMenuTrigger className="h-9 px-3 py-2 text-sm font-medium text-on-surface-variant hover:text-primary-container bg-transparent hover:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent">
                                            {category.name}
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                                {category.children.map((sub) => (
                                                    <li key={sub.id}>
                                                        <NavigationMenuLink asChild>
                                                            <Link
                                                                href={`/products?category=${sub.slug}`}
                                                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-surface-container hover:text-primary-container focus:bg-surface-container focus:text-primary-container"
                                                            >
                                                                <div className="text-sm font-medium leading-none">{sub.name}</div>
                                                                {sub.description && (
                                                                    <p className="line-clamp-2 text-sm leading-snug text-on-surface-variant">
                                                                        {sub.description}
                                                                    </p>
                                                                )}
                                                            </Link>
                                                        </NavigationMenuLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </>
                                ) : (
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href={`/products?category=${category.slug}`}
                                            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-3 py-2 text-sm font-medium text-on-surface-variant transition-colors hover:bg-transparent hover:text-primary-container focus:bg-transparent focus:text-primary-container disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-transparent data-[state=open]:bg-transparent"
                                        >
                                            {category.name}
                                        </Link>
                                    </NavigationMenuLink>
                                )}
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    );
}