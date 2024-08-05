import IBookSingle from '@/interfaces/book.interface'

import styles from './BookAdminActions.module.scss'
import DeleteBookBtn from './deleteBookBtn/DeleteBookBtn';
import LinkChange from './linkChange/LinkChange';

const BookAdminActions = ({ book }: { book: IBookSingle }) => {
    return (
        <div className={styles['admin-actions']}>
            <DeleteBookBtn book={book} text={'Удалить книгу'} />
            <LinkChange href={`/change-price/${book._id}`} text={'Изменить цену'} />
            <LinkChange href={`/change-hidden/${book._id}`} text={'Изменить доспуность'} />
        </div>
    )
}

export default BookAdminActions