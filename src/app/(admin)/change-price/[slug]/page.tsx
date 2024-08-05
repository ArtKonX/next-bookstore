import type { Metadata } from "next";
import ChangePrice from "@/components/adminPanel/changePrice/ChangePriceContainer";

export const metadata: Metadata = {
    title: 'ChangePrice',
}

type Params = {
    slug: string
}

export default function ChangePricePage({ params }: {params: Params}) {

    return (
        <div>
            <ChangePrice params={params}/>
        </div>
    );
};
