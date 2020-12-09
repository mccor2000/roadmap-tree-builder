import UserModel, { User } from "../models/user";
import * as JWT from "jsonwebtoken";
import * as Config from "../config/config";

export const signupUser = async (
  userData: User
): Promise<{ statusCode: number; message: string; data?: object }> => {
  return new Promise(async (resolve, reject) => {
    try {
      if (await isUserAlreadyExist(userData.email)) {
        return resolve({
          statusCode: 400,
          message: "User's email already exist",
        });
      }

      await UserModel.create(userData);

      return resolve({
        statusCode: 201,
        message: "Sign up successfully",
      });
    } catch (err) {
      return reject(err);
    }
  });
};

export const loginUser = async ({
  email,
  password,
}): Promise<{ statusCode: number; message: string; data?: object }> => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingUser = <User>await UserModel.findOne({ email });
      if (!existingUser || !(await existingUser.authenticate(password))) {
        return resolve({
          statusCode: 401,
          message: "Invalid username or password",
        });
      }

      return resolve({
        statusCode: 200,
        message: "User logged in successfully",
        data: await signToken({ id: existingUser.id }),
      });
    } catch (err) {
      return reject(err);
    }
  });
};

export const signToken = async (payload: object): Promise<object> => {
  return new Promise(async (resolve, reject) => {
    try {
      const jwtOptions = Config.get("/jwtAuthOptions");
      const accessToken = JWT.sign(payload, jwtOptions.key, {
        expiresIn: "1 day",
      });

      return resolve({ accessToken });
    } catch (err) {
      return reject(err);
    }
  });
};

const isUserAlreadyExist = async (email: string): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingUser = await UserModel.findOne({ email }).lean().exec();
      if (existingUser) {
        return resolve(true);
      }

      return resolve(false);
    } catch (err) {
      return reject(err);
    }
  });
};
