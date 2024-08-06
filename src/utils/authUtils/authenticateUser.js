import { signIn } from "next-auth/react";

const authenticateUser = async (e) => {
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;

    await signIn('credentials', {
        redirect: false,
        email,
        password,
    });
};

export default authenticateUser