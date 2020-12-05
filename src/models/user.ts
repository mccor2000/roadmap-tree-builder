import { model, Schema, Document } from "mongoose";
import { hash, compare } from "bcrypt";

export interface User extends Document {
  email: string;
  password: string;
  displayName: string;
  profilePicture: string;
  status: string;
}

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    displayName: {
      type: String,
      required: true,
    },

    profilePicture: {
      type: String,
      required: true,
    },

    password: String,

    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  try {
    const user: User = <User>this;
    if (!user.isModified("password") || !user.password) return next(null);

    const hashedPassword = await hash(user.password, 10);
    (this as User).password = hashedPassword;
    next(null);
  } catch (err) {
    next(err);
  }
});

UserSchema.method("comparePassword", async function (password: string) {
  return compare(password, this.password);
});

export default model("User", UserSchema, "users");
