import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Copy, Edit, Filter, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const products = [
    {
        id: "PRD-001",
        name: "VGA GIGABYTE GeForce RTX 5080 GAMING OC 16G",
        category: "GPU",
        brand: "GIGABYTE",
        price: "35.990.000₫",
        stock: 10,
        status: "Active",
        image: "/file.svg"
    },
    {
        id: "PRD-002",
        name: "CPU Intel Core i7-14700K",
        category: "CPU",
        brand: "Intel",
        price: "10.490.000₫",
        stock: 5,
        status: "Active",
        image: "/file.svg"
    },
    {
        id: "PRD-003",
        name: "Mainboard ASUS ROG MAXIMUS Z790 HERO",
        category: "Motherboard",
        brand: "ASUS",
        price: "16.990.000₫",
        stock: 0,
        status: "Out of Stock",
        image: "/file.svg"
    },
    {
        id: "PRD-004",
        name: "RAM Corsair Dominator Platinum RGB 32GB (2x16GB) DDR5 6200MHz",
        category: "RAM",
        brand: "Corsair",
        price: "4.590.000₫",
        stock: 25,
        status: "Active",
        image: "/file.svg"
    },
    {
        id: "PRD-005",
        name: "SSD Samsung 990 PRO 2TB PCIe Gen 4.0 x4 NVMe",
        category: "SSD",
        brand: "Samsung",
        price: "4.890.000₫",
        stock: 12,
        status: "Draft",
        image: "/file.svg"
    }
];

export default function AdminProductsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Products</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage your store's products and inventory.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/admin/products/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Product
                    </Link>
                </Button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-1 gap-2 w-full">
                        <div className="relative flex-1 max-w-sm">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search className="h-4 w-4 text-slate-400" />
                            </span>
                            <Input
                                placeholder="Search products..."
                                className="pl-9"
                            />
                        </div>

                        <Select>
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                <SelectItem value="cpu">CPU</SelectItem>
                                <SelectItem value="vga">VGA</SelectItem>
                                <SelectItem value="mainboard">Mainboard</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select>
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="outofstock">Out of Stock</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Image</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead>Brand</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        <div className="h-10 w-10 rounded-md bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                width={24}
                                                height={24}
                                                className="opacity-50"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium text-slate-900 truncate max-w-[200px]" title={product.name}>
                                            {product.name}
                                        </div>
                                        <div className="text-xs text-slate-500">{product.id}</div>
                                    </TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>
                                        {product.stock > 0 ? (
                                            <span className="text-slate-700">{product.stock} in stock</span>
                                        ) : (
                                            <span className="text-red-500">Out of stock</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                product.status === "Active" ? "default" :
                                                    product.status === "Draft" ? "secondary" : "destructive"
                                            }
                                            className={
                                                product.status === "Active" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" :
                                                    product.status === "Draft" ? "bg-slate-100 text-slate-700 hover:bg-slate-100" :
                                                        "bg-red-100 text-red-700 hover:bg-red-100"
                                            }
                                        >
                                            {product.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>
                                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Copy className="mr-2 h-4 w-4" /> Duplicate
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50">
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500">
                    <div>Showing 1 to 5 of 1,254 products</div>
                    <div className="flex gap-1">
                        <Button variant="outline" size="sm" disabled>Previous</Button>
                        <Button variant="outline" size="sm">Next</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}