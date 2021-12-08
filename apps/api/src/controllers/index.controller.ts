import PwaService from '@/services/pwa.service';
import { NextFunction, Request, Response } from 'express';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.sendStatus(200);
      new PwaService().search('schmidn').then(() => {});
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
