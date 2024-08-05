export default interface IUser {
    _id: object,
    name: string,
    email: string,
    password: string,
    role: string,
    balance: string,
    listRemindersRent: []
}