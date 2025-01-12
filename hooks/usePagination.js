import { useEffect, useState } from "react";

export function usePagination(numberOfContent, contentArray) {
    const [page, setPage] = useState(1);
    const [begginingIndex, setBegginingIndex] = useState(contentArray.length > 0 ? (contentArray.length - numberOfContent) : 0)
    const [lastIndex, setLastIndex] = useState(contentArray.length)

    const nextPage = () => {
        if (page != 1) {
            setPage(prevPageValue => prevPageValue - 1)
        }
    }
    useEffect(() => {
        let steps = page * numberOfContent;
        let begginingIndex = contentArray.length - steps;
        let lastIndex = begginingIndex + numberOfContent;
        setBegginingIndex(begginingIndex < 0 ? 0 : begginingIndex)
        setLastIndex(lastIndex)

    }, [page, contentArray.length, numberOfContent])

    const prevPage = () => {

        if (begginingIndex > 0) {
            setPage(prevPageValue => prevPageValue + 1)
        }
    }


    return ({
        begginingIndex, lastIndex, prevPage, nextPage
    })
}