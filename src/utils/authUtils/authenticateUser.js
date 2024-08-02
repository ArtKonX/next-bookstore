import isValidEmail from './isValidEmail';
import isValidPassword from './isValidPassword';
import { signIn } from "next-auth/react";

export default async function authenticateUser(e) {
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
        return
    }

    if (!isValidPassword(password)) {
        return
    }

    await signIn('credentials', {
        redirect: false,
        email,
        password,
    });
};