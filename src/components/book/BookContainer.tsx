import BookCover from '@/components/book/bookCover/BookCover'
import styles from './BookContainer.module.scss'

import IBookSingle from '@/interfaces/book.interface'

import BookAdminActions from '../adminPanel/bookAdminActions/BookAdminActions';
import { usePathname } from 'next/navigation';

type Params = {
    slug: string;
};

const BookContainer = ({ book, params }: { book: IBookSingle, params?: Params }) => {

    const pathname = usePathname()

    return (
        <div className={styles['book-block']}>
            <div className={styles['book-cover-block']}>
                <BookCover
                    book={book}
                />
            </div>
            {pathname === '/admin-panel' && <BookAdminActions book={book} />}
        </div>
    );
};

export default BookContainer;