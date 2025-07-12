export const GENDERS = ["male", "female", "other"] as const;
export type Gender_Type = typeof GENDERS[number];

export interface User_Interface {
    _id: string;
    username: string;
    email?: string;
    gender: Gender_Type;
    description?: string;
    birthday?: Date;
    profile_picture?: string;
    cover_picture?: string;
    createdAt: Date;
    updatedAt: Date;
}
