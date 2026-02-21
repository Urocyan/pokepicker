import { Controller, Get, Req, Res } from "routing-controllers";
import { Request, Response } from "express";
import 'reflect-metadata';

@Controller("/health")
export class HealthController {
    @Get()
    get(@Req() _: Request, @Res() response: Response) {
        return response.status(200).send('OK');
    }
}