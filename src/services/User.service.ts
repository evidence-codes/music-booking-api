import { User } from "../models/user.model";
import { BadRequestError } from "../utils/error";

interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

interface UserProfile {
  name: string;
  email: string;
  password: string;
}

interface AppSettings {
  theme: string;
  timezone: string;
}

class UserService {
  async editUserProfile(
    userId: string,
    data: Partial<UserProfile>
  ): Promise<User> {
    const user = await User.findByPk(userId);
    if (!user) throw new BadRequestError("User not found");

    await user.update(data);
    return user;
  }

  async getUserById(id: string): Promise<User | null> {
    return await User.findByPk(id);
  }
}

export default new UserService();
