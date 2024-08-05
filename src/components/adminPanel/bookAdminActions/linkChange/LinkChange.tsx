import styles from './LinkChange.module.scss'
import Link from 'next/link';


const LinkChange = ({ text, href }: { text: string, href: string }) => {

    return (
        <Link className={styles['link-change']} href={href}>{text}</Link>
    )
}

export default LinkChange