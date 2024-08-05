import UserRemindersContainer from "@/components/userReminders/UserRemindersContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Reminders',
}

const UserRemindersPage = () => {

    return (
        <UserRemindersContainer />
    )
}

export default UserRemindersPage;