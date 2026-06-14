import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminTopbar() {
    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10">
            <div className="flex-1 flex items-center">
                <div className="relative w-96 hidden md:block">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-5 w-5 text-slate-400" />
                    </span>
                    <input
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                        placeholder="Search products, orders, customers..."
                    />
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-700">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
                </Button>

                <div className="flex items-center space-x-3 border-l border-slate-200 pl-4 ml-2">
                    <div className="flex flex-col text-right hidden sm:flex">
                        <span className="text-sm font-medium text-slate-900">Admin User</span>
                        <span className="text-xs text-slate-500">Super Admin</span>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full bg-slate-100">
                        <User className="h-5 w-5 text-slate-600" />
                    </Button>
                </div>
            </div>
        </header>
    );
}