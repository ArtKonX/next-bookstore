import { useState } from 'react';
import styles from './SelectIsHidden.module.scss'
import { dmSerifDisplay400 } from '@/styles/fonts-project/fonts';
import IBook from '@/interfaces/book.interface';
import { useRouter } from 'next/navigation';
import { putBookIsHidden } from '@/utils/apiUtils/apiRequests';

const ChangeSelectHidden = ({ book }: { book: IBook }) => {

    const [isHidden, setIsHidden] = useState<boolean>(Boolean);
    const [id, setId] = useState(book._id);
    const router = useRouter()

    return (
        <div className={styles['form__ishidden-block']}>
            <form className={`${dmSerifDisplay400.className} ${styles.form}`} onSubmit={(e) => { [putBookIsHidden({ id, isHidden }), e.preventDefault(), router.push('/admin-panel')] }}>
                <label className={styles['label-title']}>Скрыть книгу:</label>
                <select className={styles.select} onChange={(e) => setIsHidden(e.target.value === 'true' ? true : false)}>
                    <option value="">false</option>
                    <option value="true">true</option>
                </select>
                <button className={styles['btn-submit']} type="submit">
                    Поменять доступность
                </button>
            </form>
        </div>
    )
}

export default ChangeSelectHidden;