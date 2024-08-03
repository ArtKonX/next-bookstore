import HeaderContainer from "@/components/header/HeaderContainer";
import SortBlock from "@/components/sortingBlock/SortBlockContainer";
import Footer from "@/components/footer/Footer";
import styles from './layout.module.scss'

export default async function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <HeaderContainer />
            <div className={styles.content}>
                <SortBlock />
                {children}
            </div>
            <Footer />
        </div>
    );
}