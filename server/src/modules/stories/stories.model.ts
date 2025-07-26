import { Schema, model } from 'mongoose';
import { Story_Interface } from '@app/modules/stories/stories.types';

const story_schema = new Schema<Story_Interface>({
    title: { type: String, required: true },
    description: { type: String, required: false },
    story_cover: { type: String, required: false },
    view_count: { type: Number, default: 0 },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const Story_Model = model<Story_Interface>('Story', story_schema);
