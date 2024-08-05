import LayoutBlock from "@/components/layoutBlock/layoutBlock/LayoutBlock";

export default async function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <LayoutBlock children={children} />
    );
}