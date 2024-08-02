import UserRegisterContainer from "@/components/registrationBlock/userRegistration/UserRegistrationContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'UserReg',
}

const UserRegisterPage = () => {

    return (
        <UserRegisterContainer />
    )
}

export default UserRegisterPage;