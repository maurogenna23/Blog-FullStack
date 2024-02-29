import mongoose, { Document, Schema } from "mongoose";

interface IPost extends Document {
    title: string;
    body: string;
    author: Schema.Types.ObjectId;
    comments: Schema.Types.ObjectId[];
}

const PostSchema: Schema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });

export default mongoose.model<IPost>('Post', PostSchema);
