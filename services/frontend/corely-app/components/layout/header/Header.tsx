"use client";

import { HeaderLogo } from "./HeaderLogo";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderActions } from "./HeaderActions";
import { CategoryBar } from "./CategoryBar";
import { MobileMenu } from "./MobileMenu";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-outline-variant bg-surface/80 backdrop-blur-md">
            <div className="container-max flex h-16 items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <MobileMenu />
                    <HeaderLogo />
                </div>

                <HeaderSearch />
                <HeaderActions />
            </div>

            <CategoryBar />
        </header>
    );
}