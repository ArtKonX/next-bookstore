import BookCover from '@/components/book/bookCover/BookCover'
import styles from './BookContainer.module.scss'

import IBookSingle from '@/interfaces/book.interface'

import BookAdminActions from './bookAdminActions/BookAdminActions';

type Params = {
    slug: string;
};

const BookContainer = ({ book, params }: { book: IBookSingle, params?: Params }) => {

    return (
        <div className={styles['book-cover-block']}>
            <BookCover
                book={book}
            />
            <BookAdminActions book={book} />
        </div>
    );
};

export default BookContainer;