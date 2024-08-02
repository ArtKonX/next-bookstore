'use client';

import styles from './AboutUsContainer.module.scss'
import { pacifico, russoOne } from '@/styles/fonts-project/fonts';

const AboutUsContainer = () => {

    return (
        <div className={styles['about-us-container']}>
            <div className={styles['logo']}>
                <span className={`${pacifico.className} ${styles['logo-text']}`}>Book<span className={`${russoOne.className} ${styles['logo-text_color']}`}>Store</span></span>
            </div>
        </div>
    )
}

export default AboutUsContainer;