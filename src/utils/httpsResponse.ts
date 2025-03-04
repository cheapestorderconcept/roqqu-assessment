import { Response } from 'express';
class HttpResponse {
    static success (res:Response,statusCode:number, message: string, data: any = null, ) {
        return  res.status(statusCode).json({statusCode, message: message, data: data});
    }

    static error(res:Response,statusCode:number, message: string, errorCode: number, error: any = null) {
        return  res.status(statusCode).json({message: message, statusCode,data: {errorCode: errorCode, error: error}});
    }
}

export default HttpResponse;