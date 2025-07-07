import {ErrorRequestHandler} from "express";
import {HttpError} from "http-errors";

export const errorHandler: ErrorRequestHandler = (err: HttpError, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
        error: err.message || 'Internal Server Error'
    });
};