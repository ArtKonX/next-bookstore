import NotFoundPage from '@/components/notFound/NotFoundPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'NotFound',
}

export default function NotFound() {
    return <>
        <NotFoundPage />
    </>
  }