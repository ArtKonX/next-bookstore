import LayoutHomeBlock from "@/components/layoutBlock/layoutHomeBlock/LayoutHomeBlock";

export default async function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        LayoutHomeBlock({children})
    );
}