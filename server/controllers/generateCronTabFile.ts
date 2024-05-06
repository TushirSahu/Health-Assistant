import type { Request, Response } from 'express';

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

