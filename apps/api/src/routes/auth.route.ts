import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class AuthRoute implements Route {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    this.router.post(`${this.path}validate`, this.authController.validate);
  }
}

export default AuthRoute;
