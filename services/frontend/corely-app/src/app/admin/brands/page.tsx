'use client';
import { useEffect, useState } from "react";
import { BrandService } from "@/services/brand.service";
import { BrandResponse, BrandRequest } from "@/types/brand";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminBrandsPage() {
    const [brands, setBrands] = useState<BrandResponse[]>([]);
    const [formData, setFormData] = useState<BrandRequest>({ name: "" });

    const load = async () => {
        const res = await BrandService.getBrands();
        setBrands(res.data);
    };

    useEffect(() => { load(); }, []);

    const handleCreate = async () => {
        await BrandService.createBrand(formData);
        setFormData({ name: "" });
        load();
    };

    const handleDelete = async (id: string) => {
        await BrandService.deleteBrand(id);
        load();
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Brands</h1>
            <Card>
                <CardHeader><CardTitle>Add New Brand</CardTitle></CardHeader>
                <CardContent className="flex gap-2">
                    <Input value={formData.name} onChange={e => setFormData({ name: e.target.value })} placeholder="Brand name" />
                    <Button onClick={handleCreate}><Plus className="mr-2 h-4 w-4" /> Add</Button>
                </CardContent>
            </Card>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {brands.map((b: any) => (
                        <TableRow key={b.id}>
                            <TableCell>{b.name}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" onClick={() => handleDelete(b.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}