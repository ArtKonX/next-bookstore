import type { Metadata } from "next";
import AdminPanelContainer from "@/components/adminPanel/AdminPanelContainer";

export const metadata: Metadata = {
    title: 'AdminPanel',
}

export default function HomePage() {

    return (
        <AdminPanelContainer />
    );
};