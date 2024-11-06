import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: {
            type: Boolean,
            default: false
        }
        // createdAt: Date.now(),
        // updatedAt: Date.now()
    },
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
export default User;
