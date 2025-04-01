import { User } from "../models/user.model";

class AuthService {
  async saveUser(data: User): Promise<User> {
    return await User.create(data);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }

  async getUserById(id: string): Promise<User | null> {
    return await User.findByPk(id);
  }
}

export default new AuthService();
