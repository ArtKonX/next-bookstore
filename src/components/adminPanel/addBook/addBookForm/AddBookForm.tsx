'use client';

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { roboto, dmSerifDisplay400 } from '@/styles/fonts-project/fonts';
import styles from './AddBookForm.module.scss'
import { AccountContext } from '@/providers/accountContext/AccountContext';

import SelectIsHidden from '../selectIsHidden/SelectIsHiddent';
import { addBook } from '@/utils/apiUtils/apiRequests';

export const AddBookForm = () => {
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');

    const [fileBook, setFileBook] = useState<File[]>([]);

    const [yearOfWriting, setYearOfWriting] = useState<number>(1999);

    const [isHidden, setIsHidden] = useState(false)

    const [catagory, setCatagory] = useState('');

    const [price, setPrice] = useState<number>(100);

    const infoAccount = useContext(AccountContext);

    const router = useRouter();

    const [fileBookData, setFileBookData] = useState<string[]>();

    const convertToBuffer = async (file: File): Promise<Buffer> => {
        const fileData = await file.text();
        const lines = fileData.split('\n');
        const formattedData = lines.join('\r\n');
        return Buffer.from(formattedData, 'utf-8');
    };


    const handleBookUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            setFileBook(files);

            const bufferFiles = await Promise.all(files.map(convertToBuffer));
            setFileBookData(bufferFiles.map((buffer) => buffer.toString('base64')));
        }
    };

    const handleSubmit = async () => {
        try {
            const data = {
                author,
                title,
                catagory,
                yearOfWriting,
                price,
                isHidden,
                fileBook: fileBookData,
            };

            addBook(data);
            router.replace('/home');

            setFileBookData([]);
        } catch (error) {
            console.error('Error added book:', error);
        }
    };

    if (infoAccount?.role != 'admin') return ( <h1 className='admin-panel-block'>Вы не админ(</h1> )


    return (
        <div className={styles['add-form-block']}>
            <h1 className={styles['add-form-block__title']}>Добавить книгу:</h1>
            <form className={`${dmSerifDisplay400.className} ${styles.form}`} onSubmit={(e) => { [handleSubmit(), e.preventDefault()] }}>
                <SelectIsHidden setIsHidden={setIsHidden} />
                <div className={styles['form__input-block']}>
                    <label className={styles['label-title']}>Автор:</label>
                    <input className={`${roboto.className} ${styles.input}`} required type="text" value={author} onChange={(e) => setAuthor(e.target.value.replaceAll(' ' , '-'))} />
                </div>
                <div className={styles['form__input-block']}>
                    <label className={styles['label-title']}>Название книги:</label>
                    <input className={`${roboto.className} ${styles.input}`} required type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className={styles['form__price-input-block']}>
                    <label className={styles['label-title']}>Категория:</label>
                    <input className={`${roboto.className} ${styles.input}`} required type="text" value={catagory} onChange={(e) => setCatagory(e.target.value.replaceAll(' ' , '-'))} />
                </div>
                <div className={styles['form__price-input-block']}>
                    <label className={styles['label-title']}>Год написания:</label>
                    <input className={`${roboto.className} ${styles.input}`} required type="number" value={yearOfWriting} onChange={(e) => setYearOfWriting(Number(e.target.value.replaceAll(' ', '')))} />
                </div>

                <div className={styles['form__price-input-block']}>
                    <label className={styles['label-title']}>Стоимость книги:</label>
                    <input className={`${roboto.className} ${styles.input}`} type="number" value={price} onChange={(e) => setPrice(Number(e.target.value.replaceAll(' ', '')))} />
                </div>

                <div className={styles['file-upload-block']}>
                    <label className={styles['file-upload']}>
                        Загрузить книгу:<input className={styles['file-upload__input']} accept=".txt" type="file" onChange={handleBookUpload} />
                    </label>
                    <label className={styles['label-title']}>Книга:</label>
                    {fileBook.length > 0 ? (<span className={styles['file']} key={fileBook[0].lastModified}>{fileBook[0].name}</span>) : (<span className={styles['file']}>Файл не выбран</span>)}
                </div>
                <button className={styles['form__btn-submit']} type='submit'>
                    Отправить книгу в Базу Данных
                </button>
            </form>
        </div>
    );
};
