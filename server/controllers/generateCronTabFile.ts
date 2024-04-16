import type { Request, Response } from 'express';

export const generateCronTabFile = (req: Request, res: Response) => {
    const { time, days, weeks, months} = req.body;

}