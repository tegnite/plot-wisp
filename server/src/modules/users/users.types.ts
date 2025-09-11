import { Base_Interface } from '@app/types/base.types';
import { Story_Interface } from '@app/modules/stories/stories.types';
import { Types } from 'mongoose';

export const GENDERS = ['male', 'female', 'other'] as const;
export type Gender_Type = typeof GENDERS[number];

export interface User_Interface<T extends Types.ObjectId[] | Story_Interface[] = Types.ObjectId[]> extends Base_Interface {
    username: string;
    email?: string;
    password: string;
    gender: Gender_Type;
    description?: string;
    birthday?: Date;
    profile_picture?: string;
    cover_picture?: string;
    stories?: T;
}

export interface User_Create_DTO {
    username: string;
    password: string;
    gender: Gender_Type;
}

export interface User_Login_DTO {
    username: string;
    password: string;
}

export interface User_Update_DTO {
    username?: string;
    email?: string;
    description?: string;
    birthday?: Date;
    profile_picture?: string;
    cover_picture?: string;
}
