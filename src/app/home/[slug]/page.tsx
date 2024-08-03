'use client'

import SortBooks from "@/components/sort/SortBooks";

type Params = {
    slug: string
}

export default function BookCatagoryPage({ params }: {
    params: Params
}) {

    return (
        <SortBooks params={params} />
    )
}