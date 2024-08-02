
import { usePathname } from 'next/navigation';
import { deleteBook } from '@/utils/apiUtils/apiRequests';
import IBookSingle from '@/interfaces/book.interface'

import styles from './BookAdminActions.module.scss'
import Link from 'next/link';

const BookAdminActions = ({ book }: { book: IBookSingle }) => {

    const pathname = usePathname();

    if (pathname !== '/admin-panel') return (<></>)

    return (
        <div className={styles['admin-actions']}><button
            className={styles['btn-change-price']}
            onClick={() =>
                deleteBook(book._id)
            }
        >
            Удалить книгу
        </button><Link className={styles['link-change-price']} href={`/change-price/${book._id}`}>Изменить цену</Link></div>
    )
}

export default BookAdminActions