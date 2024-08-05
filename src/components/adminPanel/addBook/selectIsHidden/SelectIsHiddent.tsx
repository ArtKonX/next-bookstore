import styles from './SelectIsHidden.module.scss'

const SelectIsHidden = ({setIsHidden}: {setIsHidden: (value: boolean) => void}) => {

    return (
        <div className={styles['form__ishidden-block']}>
            <label className={styles['label-title']}>Скрыть книгу:</label>
            <select className={styles.select} onChange={(e) => setIsHidden(Boolean(e.target.value))}>
                <option value="">false</option>
                <option value="true">true</option>
            </select>
        </div>
    )
}

export default SelectIsHidden;