import { catch_async } from "@app/utils/catch-async.util";
import { Request, Response } from "express";
import { Story_Service } from "@app/modules/stories/stories.service";
import { send_success_response } from "@app/utils/response.util";
import {
    Story_Create_DTO,
    Story_Update_DTO,
} from "@app/modules/stories/stories.types";

export const Story_Controller = {
    create_story: catch_async(async (req: Request, res: Response) => {
        if (!req.user_id) throw new Error("unauthorized");
        const story_dto: Story_Create_DTO = req.body;
        const story = await Story_Service.create_story(story_dto, req.user_id);
        send_success_response(res, story, {
            status_code: 201,
            message: "Story created successfully",
        });
    }),

    get_all_stories: catch_async(async (req: Request, res: Response) => {
        const stories = await Story_Service.find_all_stories();
        send_success_response(res, stories, {
            status_code: 200,
            message: "Found stories",
        });
    }),

    get_story_by_id: catch_async(async (req: Request, res: Response) => {
        const { story_id } = req.params;
        const story = await Story_Service.find_story_by_id(story_id);
        if (!story) {
            const err: any = new Error("story not found");
            err.status_code = 404;
            throw err;
        }
        send_success_response(res, story, {
            status_code: 200,
            message: "Found story",
        });
    }),

    update_story: catch_async(async (req: Request, res: Response) => {
        if (!req.user_id) throw new Error("unauthorized");
        const { story_id } = req.params;
        const story_dto: Story_Update_DTO = req.body;
        const story = await Story_Service.update_story_by_id(
            story_id,
            story_dto
        );
        if (!story) throw new Error("story to update not found");
        send_success_response(res, story, {
            status_code: 200,
            message: "Story updated successfully",
        });
    }),

    delete_story: catch_async(async (req: Request, res: Response) => {
        if (!req.user_id) throw new Error("unauthorized");
        const { story_id } = req.params;
        await Story_Service.delete_story_by_id(story_id);
        send_success_response(res, null, {
            status_code: 200,
            message: "Story deleted successfully",
        });
    }),
};
