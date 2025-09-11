import { useCallback, useState } from "react";

export function useSavingsButtonManagement() {
    const categories = [
        'emergency', 
        'vacation', 
        'housing', 
        'car', 
        'wedding', 
        'retirement', 
        'education', 
        'business', 
        'investment', 
        'health', 
        'technology', 
        'other'
    ]

    const [savingCategory, setSavingCategory] = useState("");

    const isCategoryActive = useCallback((category: string) => {
        return category === savingCategory;
    }, [savingCategory])

    const toggleCategory = useCallback((category: string) => {
        setSavingCategory(current => current === category ? "" : category);
    }, []);

    return {
        categories,
        isCategoryActive,
        toggleCategory,
        resetCategory: () => setSavingCategory(""),
    }
}