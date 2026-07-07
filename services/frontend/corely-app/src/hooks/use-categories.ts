import { useState, useEffect } from "react";
import { Category } from "@/types/category";
import { categoryService } from "@/services/category.service";

export function useCategories() {
    const [data, setData] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let mounted = true;
        const fetchCategories = async () => {
            try {
                setIsLoading(true);
                const categories = await categoryService.getAll();
                if (mounted) {
                    setData(categories);
                }
            } catch (err) {
                if (mounted) {
                    setError(err instanceof Error ? err : new Error("Failed to fetch categories"));
                }
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchCategories();

        return () => {
            mounted = false;
        };
    }, []);

    return { data, isLoading, error };
}