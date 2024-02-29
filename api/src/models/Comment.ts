import mongoose, { Document, Schema } from "mongoose";

interface IComment extends Document {
    body: string;
    author: Schema.Types.ObjectId;
    postID: Schema.Types.ObjectId;
}

const CommentSchema: Schema = new Schema({
    body: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    postID: { type: Schema.Types.ObjectId, ref: 'Post' }
}, { timestamps: true });

export default mongoose.model<IComment>('Comment', CommentSchema);
