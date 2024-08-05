import { deleteBook } from '@/utils/apiUtils/apiRequests';
import IBookSingle from '@/interfaces/book.interface'

import styles from './DeleteBookBtn.module.scss'

const DeleteBookBtn = ({ book, text}: { book: IBookSingle, text: string }) => {

    return (
        <button
            className={styles['btn-delete-book']}
            onClick={() =>
                deleteBook(book._id)
            }
        >
            {text}
        </button>
    )
}

export default DeleteBookBtn