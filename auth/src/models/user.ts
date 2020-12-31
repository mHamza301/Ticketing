import mongoose from 'mongoose';
import { Password } from '../services/password';

//This interface is built so that the properties
//remain same across the board when creating a User.

interface userAttributes {
     email: string,
     password: string
};

//This interface describes the properties
//a UserModel has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: userAttributes): UserDoc;
};

//This interface describes the properties that
//a User Document has
interface UserDoc extends mongoose.Document {
    email: string,
    password: string
};

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

//Middleware function implemented in mongoose.
userSchema.pre('save', async function(done) {
    if(this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

userSchema.statics.build = (attrs: userAttributes) =>{
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };