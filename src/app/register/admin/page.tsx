import AdminRegisterContainer from '@/components/registrationBlock/adminRegistration/AdminRegistrationContainer'
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'AdminReg',
}

const AdminRegisterPage = () => {

    return (
        <AdminRegisterContainer />
    )
}

export default AdminRegisterPage;