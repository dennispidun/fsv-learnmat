import { NextFunction, Response } from 'express';
import { RequestWithUser } from '@/interfaces/auth.interface';
import MaterialService from '@/services/material.service';

class ModulesController {

  private materialService: MaterialService = new MaterialService();


  public list = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {

    try {
      res.status(200).json({
        modules: await this.materialService.getMaterials()
      });
    } catch (error) {
      next(error);
    }
  };

  public get = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    await this.materialService.createShares(req.body.modules, req.user.email);
    res.status(200).send();
  };
}

export default ModulesController;
