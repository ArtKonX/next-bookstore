const isValidPassword = (password) => {
    return !(!password || password.length < 8)
};

export default isValidPassword;