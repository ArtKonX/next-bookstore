'use client'

import SortingBased from "@/components/sorting/sortingBased/SortingBased";

type Params = {
    slug: string
}

export default function BookCatagoryPage({ params }: {
    params: Params
}) {

    return (
        <SortingBased params={params} />
    )
}