import HeaderContainer from "@/components/header/HeaderContainer";
import Footer from "@/components/footer/Footer";

export default async function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="container">
            <div className="wrapper">
                <HeaderContainer />
                {children}
                <Footer />
            </div>
        </div>
    );
}