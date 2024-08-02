import { Metadata } from 'next'
import LoginFormContainer from '@/components/login/LoginContainer'

export const metadata: Metadata = {
    title: 'Login',
}

export default function LoginPage() {

    return (
        <div>
            <LoginFormContainer />
        </div>
    )
}