import { User_Model } from "@app/modules/users/users.model";
import { User_Interface } from "@app/modules/users/users.types";

export const User_Repository = {
    async find_user_by_username(
        username: string
    ): Promise<User_Interface | null> {
        return User_Model.findOne({ username }).exec();
    },

    async find_user_by_id(id: string): Promise<User_Interface | null> {
        return User_Model.findById(id).exec();
    },

    async find_users(): Promise<User_Interface[]> {
        return User_Model.find().exec();
    },
};
