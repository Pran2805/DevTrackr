import User, { type IUser } from "../models/user.model.ts";

export default class UserRepository {
    static isEmailExist = async (email: String) => {
        const user = await User.find({ email })
        if (user) {
            return user;
        }
        return false;
    }

    static createUser = async (fullName: string, email: string, password: string) => {
        if (fullName && email && password) {
            const user = await User.create({
                fullName,
                email,
                password
            })
            return user;
        } else {
            return false
        }
    }
}