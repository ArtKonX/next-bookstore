import type { Metadata } from "next";
import ChangeSelectHiddenContainer from "@/components/adminPanel/changeHidden/ChangeHiddenContainer";

export const metadata: Metadata = {
    title: 'ChangeHidden',
}

type Params = {
    slug: string
}

export default function ChangeSelectHiddenPage({ params }: {params: Params}) {

    return (
        <div>
            <ChangeSelectHiddenContainer params={params}/>
        </div>
    );
};
