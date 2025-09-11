import { Story_Model } from '@app/modules/stories/stories.model';
import { Story_Create_DTO, Story_Update_DTO, Story_Interface } from '@app/modules/stories/stories.types';
import { Types } from 'mongoose';
import { User_Interface } from '@app/modules/users/users.types';

export const Story_Repository = {
    create_story: async (data: Story_Create_DTO, user_id: Types.ObjectId): Promise<Story_Interface> => {
        return Story_Model.create({ ...data, user: user_id });
    },

    find_all_stories: async (): Promise<Story_Interface<User_Interface>[]> => {
        return Story_Model.find().populate<{ user: User_Interface }>('user').exec();
    },

    find_story_by_id: async (story_id: string): Promise<Story_Interface<User_Interface> | null> => {
        return Story_Model.findById(story_id).populate<{ user: User_Interface }>('user').exec();
    },

    update_story_by_id: async (story_id: string, data: Story_Update_DTO): Promise<Story_Interface | null> => {
        return Story_Model.findByIdAndUpdate(story_id, data, { new: true });
    },

    delete_story_by_id: async (story_id: string): Promise<Story_Interface | null> => {
        return Story_Model.findByIdAndDelete(story_id);
    },
};
