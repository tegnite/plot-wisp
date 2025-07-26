import { Base_Interface } from '@app/types/base.types';
import { User_Interface } from '@app/modules/users/users.types';
import { Types } from 'mongoose';

export interface Story_Interface<T extends Types.ObjectId | User_Interface = Types.ObjectId> extends Base_Interface {
    title: string;
    description?: string;
    story_cover?: string;
    view_count: number;
    user: T;
}

export interface Story_Create_DTO {
    title: string;
    description?: string;
    story_cover?: string;
}

export interface Story_Update_DTO {
    title?: string;
    description?: string;
    story_cover?: string;
}
