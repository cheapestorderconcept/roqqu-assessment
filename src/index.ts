// import morgan from 'morgan';;
import express, {Request, Response, NextFunction} from 'express';
import logger from 'jet-logger';
import apiRouter from './routes';
import HttpResponse from './utils/httpsResponse';
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', apiRouter );
app.use((req: Request, res: Response, next: NextFunction) => {
   HttpResponse.error(res, 404, 'Route not found', 404);
});
app.listen(PORT, ()=>{
 logger.info(`Server is running on port ${PORT}`);
})