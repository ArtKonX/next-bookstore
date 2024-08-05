import { createContext } from 'react'
import IAccountInfo from '@/interfaces/account.interface'

export const AccountContext = createContext<IAccountInfo | undefined>({
    role: '',
    balance: 0
})