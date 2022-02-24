import {SignUpDto} from "../dtos/SignUpDto";
import bcrypt from "bcrypt";
import {UserToAddDto} from "../dtos/UserToAddDto";
import UserModel from "../models/UserModel";
import {LoginDto} from "../dtos/LoginDto";
import {UserDto} from "../dtos/UserDto";
import mapper from "../helpers/mapper";
import RefreshTokenModel from "../models/RefreshTokenModel";
import tokensGenerator from "../helpers/tokensGenerator";
import {ObjectId} from "mongodb";

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
                const userId = token.user.toString();

                const newToken = await tokensGenerator.createRefreshToken(userId);

                await RefreshTokenModel.findByIdAndDelete(token.id).exec();

                return {refreshToken: newToken.value, accessToken: tokensGenerator.createAccessToken(userId)};
            }

            return null;
        } catch (e) {
            throw e;
        }
    }

    removeRefreshToken = async (refreshToken: string) => {
        await RefreshTokenModel.findOneAndDelete({value: refreshToken}).exec();
    }
}

export default new AccountService();
