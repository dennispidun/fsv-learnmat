import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import AuthService from '@services/auth.service';
import { TokenData } from '@/interfaces/auth.interface';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      await this.authService.signup(userData);
      res.status(201).send();
    } catch (error) {
      next(error);
    }
  };

  public validate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tokenData: TokenData = req.body;
      await this.authService.validate(tokenData);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
