"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useCommandShortcut } from "@/hooks/use-command-shortcut";
import { Button } from "@/components/ui/button";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

export function HeaderSearch() {
    const [open, setOpen] = useState(false);

    useCommandShortcut(() => setOpen((open) => !open));

    return (
        <div className="flex-1 flex items-center justify-end md:justify-center px-4">
            {/* Desktop Search Button */}
            <div className="hidden md:flex relative w-full max-w-xl">
                <Button
                    variant="outline"
                    className="relative w-full justify-start text-sm text-on-surface-variant bg-surface-container-lowest border-outline-variant h-10 rounded-full pr-12 hover:bg-surface-container-lowest"
                    onClick={() => setOpen(true)}
                >
                    <Search className="mr-2 h-4 w-4" />
                    <span>Search GPUs, CPUs, laptops...</span>
                    <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-surface-container px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </Button>
            </div>

            {/* Mobile Search Button */}
            <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-primary/5 transition-all duration-200"
                onClick={() => setOpen(true)}
            >
                <Search className="h-5 w-5" />
            </Button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search products, brands, categories..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Recent">
                        <CommandItem>RTX 5090</CommandItem>
                        <CommandItem>Intel Core i9</CommandItem>
                    </CommandGroup>
                    <CommandGroup heading="Categories">
                        <CommandItem>GPU</CommandItem>
                        <CommandItem>CPU</CommandItem>
                        <CommandItem>Motherboard</CommandItem>
                    </CommandGroup>
                    <CommandGroup heading="Brands">
                        <CommandItem>ASUS</CommandItem>
                        <CommandItem>Corsair</CommandItem>
                        <CommandItem>NZXT</CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </div>
    );
}