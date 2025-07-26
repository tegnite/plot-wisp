import { Router } from "express";
import { Story_Controller } from "@app/modules/stories/stories.controller";
import { auth_middleware } from "@app/middlewares/auth.middleware";
import { upload_none } from "@app/config/multer.config";

const router = Router();

router.post("/", auth_middleware, upload_none, Story_Controller.create_story);
router.get("/", Story_Controller.get_all_stories);
router.get("/:story_id", Story_Controller.get_story_by_id);
router.patch(
    "/:story_id",
    auth_middleware,
    upload_none,
    Story_Controller.update_story
);
router.delete("/:story_id", auth_middleware, Story_Controller.delete_story);

export const story_routes = router;
