process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import Routes from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import config from 'config';
import https from 'https';
import fs from 'fs';


class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = config.get("port") || 3000;
    this.env = config.get("env")  || 'development';
    logger.info(process.env.NODE_ENV)
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {

    if (this.env === 'production') {
      var privateKey  = fs.readFileSync(__dirname + '/../../../key.pem', 'utf8');
      var certificate = fs.readFileSync(__dirname + '/../../../cert.pem', 'utf8');
      var credentials = {key: privateKey, cert: certificate};
      
      var httpsServer = https.createServer(credentials, this.app);
      httpsServer.listen(443);
      logger.info(`🚀 App listening on the port 443`);
    }

    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    if (this.env === 'production') {
      this.app.use(morgan('combined', { stream }));
      // this.app.use(cors({ origin: true, credentials: true }));
    } else {
      this.app.use(morgan('dev', { stream }));
      this.app.use(cors({ origin: true, credentials: true }));
    }
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(hpp());
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {    
    routes.forEach(route => {
      this.app.use('/api', route.router);
    });
    if (this.env === 'production') {
      this.app.use(express.static(__dirname + "/../learnmat"))

      this.app.all('*', function(req, res, next) {
        // Just send the index.html for other files to support HTML5Mode
        res.status(200).sendFile(`/`, {root: __dirname + "/../learnmat" });
      });
    }
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
