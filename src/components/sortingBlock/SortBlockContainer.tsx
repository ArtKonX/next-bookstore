import CatagoryMenu from "../catagory/catagoryMenu/CatagoryMenu";
import AuthorMenuCon from '@/components/authorSort/authorMenu/AuthorMenuContainer'

import YearOfWritingCon from "../yearOfWriting/authorMenu/YearOfWritingMenuContainer";

const SortBlockContainer = () => {

    return (
        <div className='sorting-block'>
            <h2 className="sorting-block__title">Сортировка:</h2>
            <CatagoryMenu />
            <AuthorMenuCon />
            <YearOfWritingCon />
        </div>
    )
}

export default SortBlockContainer;