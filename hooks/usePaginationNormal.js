import { useState } from "react";

export function usePaginationNormal(numberOfContent = 10, array = []) {
    const [firstIndex, setFirstIndex] = useState(0);
    const [lastIndex, setLastIndex] = useState(numberOfContent);

    const prevPage = () => {
        if (firstIndex === 0)
            return;
        setFirstIndex(prev => prev - numberOfContent);
        setLastIndex(prev => prev - numberOfContent)
    }
    const nextPage = () => {
        if (lastIndex >= array.length)
            return;
        setFirstIndex(prev => prev + numberOfContent);
        setLastIndex(prev => prev + numberOfContent)

    }
    return {
        firstIndex,
        lastIndex,
        prevPage,
        nextPage
    }
}