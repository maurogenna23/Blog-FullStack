import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    imageUser: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    imageUser: { type: String, required: false }
})

UserSchema.pre<IUser>('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
