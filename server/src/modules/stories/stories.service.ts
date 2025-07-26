import { Story_Repository } from '@app/modules/stories/stories.repository';
import { Story_Create_DTO, Story_Update_DTO, Story_Interface } from '@app/modules/stories/stories.types';
import { Types } from 'mongoose';
import { User_Interface } from '@app/modules/users/users.types';

export const Story_Service = {
    create_story: async (data: Story_Create_DTO, user_id: string): Promise<Story_Interface> => {
        return Story_Repository.create_story(data, new Types.ObjectId(user_id));
    },

    find_all_stories: async (): Promise<Story_Interface<User_Interface>[]> => {
        return Story_Repository.find_all_stories();
    },

    find_story_by_id: async (story_id: string): Promise<Story_Interface<User_Interface> | null> => {
        return Story_Repository.find_story_by_id(story_id);
    },

    update_story_by_id: async (story_id: string, data: Story_Update_DTO): Promise<Story_Interface | null> => {
        return Story_Repository.update_story_by_id(story_id, data);
    },

    delete_story_by_id: async (story_id: string): Promise<Story_Interface | null> => {
        return Story_Repository.delete_story_by_id(story_id);
    },
};
