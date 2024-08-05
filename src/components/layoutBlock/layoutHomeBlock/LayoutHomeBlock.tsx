import HeaderContainer from "@/components/header/HeaderContainer";
import SortBlock from "@/components/sorting/sortingBlock/SortBlockContainer";
import Footer from "@/components/footer/Footer";
import styles from './LayoutHomeBlock.module.scss'

export default async function LayoutHomeBlock({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={styles['container']}>
            <HeaderContainer />
            <div className={styles['sort-and-books-block']}>
                <SortBlock />
                {children}
            </div>
            <Footer />
        </div>
    );
}