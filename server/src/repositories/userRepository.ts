import User, { type IUser } from "../models/user.model.ts";

export default class UserRepository {
    static isEmailExist = async (email: String) => {
        const user = await User.findOne({ email })
        if (user) {
            console.log(user)
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

    static verifyUser = async (id: string) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                id,
                { $set: { isValid: true } },
                {
                    returnDocument: "after"
                }
            ).lean();

            return updatedUser;
        } catch (error) {
            console.error("Verify User Error:", error);
            throw new Error("Failed to verify user");
        }
    };
}