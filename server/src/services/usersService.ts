import {UserDto} from "../dtos/UserDto";
import {UserToEditDto} from "../dtos/UserToEditDto";
import UserModel from "../models/UserModel";
import {Types} from "mongoose";
import mapper from "../helpers/mapper";

class UsersService {
    getUsers = async (): Promise<UserDto[]> => {
        try {
            const users = await UserModel.find().exec();

            return users.map((item) => mapper.toUserDto(item));
        } catch (e) {
            throw e;
        }
    }

    getUser = async (id: Types.ObjectId): Promise<UserDto | null> => {
        try {
            const user = await UserModel.findById(id).exec();

            return user ? mapper.toUserDto(user) : null;
        } catch (e) {
            throw e;
        }
    }

    getUserByEmail = async (email: string): Promise<UserDto | null> => {
        try {
            const user = await UserModel.findOne({email: email}).exec();

            return user ? mapper.toUserDto(user) : null;
        } catch (e) {
            throw e;
        }
    }

    updateUser = async (userToEditDto: UserToEditDto) => {
        try {
            await UserModel.findByIdAndUpdate(userToEditDto.id, userToEditDto).exec();
        } catch (e) {
            throw e;
        }
    }

    deleteUser = async (id: Types.ObjectId) => {
        try {
            await UserModel.findByIdAndDelete(id).exec();
        } catch (e) {
            throw e;
        }
    }
}

export default new UsersService();
