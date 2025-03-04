// import morgan from 'morgan';;
import express, {Request, Response, NextFunction} from 'express';
import logger from 'jet-logger';
import apiRouter from '../src/routes';
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', apiRouter );
app.listen(PORT, ()=>{
 logger.info(`Server is running on port ${PORT}`);
})