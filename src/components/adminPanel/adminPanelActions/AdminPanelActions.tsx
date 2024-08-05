import Link from "next/link"
import styles from './AdminPanelActions.module.scss'
import AddRemindersusersContainer from "./adminRemindersUsers/AdminRemindersUsersBtn"

const AdminPanelActionsContainer = () => {

    return (
        <div className={styles['admin-actions']}>
            <Link className={styles['admin-actions__link']} href={'admin-panel/add-book'}>Добавить книгу</Link>
            <AddRemindersusersContainer />
        </div>
    )
}

export default AdminPanelActionsContainer