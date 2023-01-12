import {Schema, model} from "mongoose";

export interface IUser {
    username ?: string;
    password?: string;
    role : {
        type : string,
        default : 0
        enum :['0','1'];
    }
}

const UserSchema = new Schema<IUser>({
    username: String,
    password: String
});
const User = model<IUser>('User', UserSchema);
export {User};