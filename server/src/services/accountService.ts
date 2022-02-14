import {SignUpDto} from "../dtos/SignUpDto";
import bcrypt from "bcrypt";
import {UserToAddDto} from "../dtos/UserToAddDto";
import UserModel from "../models/UserModel";
import {LoginDto} from "../dtos/LoginDto";
import {UserDto} from "../dtos/UserDto";
import mapper from "../helpers/mapper";
import RefreshTokenModel, {RefreshToken} from "../models/RefreshTokenModel";
import {Types} from "mongoose";
import tokensGenerator from "../helpers/tokensGenerator";

class AccountService {
    signUpUser = async (signUpDto: SignUpDto) => {
        try {
            const salt = await bcrypt.genSalt(8);
            const passwordHash = await bcrypt.hash(signUpDto.passwordHash, salt);

            const userToAdd: UserToAddDto = {
                email: signUpDto.email,
                passwordHash: passwordHash,
                name: signUpDto.name,
            }

            const user = new UserModel(userToAdd);

            await user.save()
        } catch (e) {
            throw e;
        }
    }

    loginUser = async (loginDto: LoginDto): Promise<UserDto | null> => {
        try {
            const user = await UserModel.findOne({email: loginDto.email}).exec();

            if (user && await bcrypt.compare(loginDto.passwordHash, user.passwordHash)) {
                return mapper.toUserDto(user);
            }

            return null;
        } catch (e) {
            throw e;
        }
    }

    refresh = async (refreshToken: string) => {
        try {
            const token = await RefreshTokenModel.findOne({value: refreshToken}).exec();

            if (token) {
                const newToken = new RefreshTokenModel({user: token.user})
                await newToken.save();

                const userId = token.user.toString();

                token.delete().exec();

                return {refreshToken: newToken.value, accessToken: tokensGenerator.generateAccessToken(userId)};
            }

            return null;
        } catch (e) {
            throw e;
        }
    }
}

export default new AccountService();
