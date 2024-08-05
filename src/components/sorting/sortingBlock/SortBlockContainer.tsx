import CatagoryMenu from "../basisForSorting/catagoryMenuSort/CatagoryMenuContainer";
import AuthorMenuCon from '@/components/sorting/basisForSorting/authorMenuSort/AuthorMenuContainer';
import YearOfWritingCon from "../basisForSorting/yearOfWritingMenuSort/YearOfWritingMenuContainer";

import styles from './SortBlockContainer.module.scss'

const SortBlockContainer = () => {

    return (
        <div className={styles['sorting-block']}>
            <h2 className={styles["sorting-block__title"]}>Сортировка:</h2>
            <CatagoryMenu />
            <AuthorMenuCon />
            <YearOfWritingCon />
        </div>
    )
}

export default SortBlockContainer;