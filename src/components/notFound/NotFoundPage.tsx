import Image from "next/image"

import styles from './NotFoundPage.module.scss'

export default function NotFound() {

     return (
          <div className={styles['wrapper-img']}>
               <Image alt="нет такой страницы" className={styles['not-found-img']} src={'/images/404_Page_Img.jpg'} width={1000} height={425} />
          </div>
     )
}