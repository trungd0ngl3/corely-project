"use client"

import * as React from "react"
import { Tabs as TabsPrimitive, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

const Tabs = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive>
>(({ className, ...props }, ref) => (
    <TabsPrimitive ref={ref} className={cn("w-full", className)} {...props} />
))
Tabs.displayName = "Tabs"

export { Tabs, TabsList, TabsTrigger, TabsContent }