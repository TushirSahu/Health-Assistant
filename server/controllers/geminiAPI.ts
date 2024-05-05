import type { Request, Response } from "express";
import { model } from "../server";

export const geminiAPI = async (req: Request, res: Response) => {
  const { code, text } = req.body;
  try {
    const response = await model.getResponse(code, text);
    res.status(200).json({
      status: "success",
      message: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error,
    });
  }
};
