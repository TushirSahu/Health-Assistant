import type { Request, Response } from 'express';
import { z } from 'zod';
const fs = require('fs');
const { exec } = require('child_process');

interface Medicine {
    minutes: number;
    hours: number;
    days: number[];
    dates: number[];
    medicine: string;
}

export const generateCronTabFile = (req: Request, res: Response) => {
    const { medicines } = req.body;
    // const { minutes, hours, days, dates, medicine } = req.body;
    // Validate the request body
    const schema = z.object({
        minutes: z.number().min(0, {message: "Minutes should be greater than 0"}).max(59, {message: "Minutes should be less than 59"}),
        hours: z.number().min(0, {message: "Hours should be greater than 0"}).max(23, {message: "Hours should be less than 23"}),
        days: z.array(z.number().min(0, {message: "Days should be greater than 0"}).max(6, {message: "Days should be less than 6"})),
        dates: z.array(z.number().min(1, {message: "Dates should be greater than 0"}).max(31, {message: "Days should be less than 31"})),
        medicine: z.string(),
    }).array();

    try {
        schema.parse(medicines);
    } catch (error) {
        res.status(400).send({ error: "Invalid request body" });
        return;
    }
    let cronTabFile = "";
    medicines.forEach((med: Medicine) => {
        const { minutes, hours, days, dates, medicine } = med;
        let finalDates = "";
        let finalDays = "";
        if(days.length === 0)
            {
                finalDays = "*";
            }
        else
            {
                finalDays = days.join(",");
            }
    
        if(dates.length ===0 )
            {
                finalDates = "*";
            }
        else
            {
                finalDates = dates.join(",");
            }
        cronTabFile += `# m h dom mon dow command
        ${minutes} ${hours} ${finalDates} * ${finalDays} echo "Take ${medicine}"\n`;
       
    });

    // send the response in the form of a file
    res.setHeader('Content-Type', 'text/plain');
    res.send(cronTabFile);


    // exec('echo "' + cronTabFile + '" > cronTab.txt', (error: any, stdout: any, stderr: any) => {
    //     if (error) {
    //         console.error(`Error: ${error.message}`);
    //         return;
    //     }
    //     if (stderr) {
    //         console.error(`stderr: ${stderr}`);
    //         return;
    //     }
    //     console.log(`File content written successfully to cronTab.txt`);
    // });
}

