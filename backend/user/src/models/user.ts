import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document<string> {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  refreshToken: string | null;
  photo: string;
  comparePassword: (password: string) => Promise<boolean>;
}

export type UserDocument = IUser & Document;

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  refreshToken: { type: String, default: null },
  photo :{type : String }
});

// Hash the password before saving the user [Some copy paste code]
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const UserModel = model<IUser>('User', userSchema);
export default UserModel;
export {IUser}