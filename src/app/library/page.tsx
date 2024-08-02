import LibraryContainer from "@/components/library/LibraryContainer"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Library',
}


export default function LibraryPage() {

    return (
        <div className="library">
            <LibraryContainer />
        </div>
    )
}