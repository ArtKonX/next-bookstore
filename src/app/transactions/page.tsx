import AddBalanceContainer from "@/components/addBalance/AddBalanceContainer"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Transactions',
}

export default function TransactionsPage() {

    return (
        <AddBalanceContainer/>
    )
}