import {Response} from "express";

export const resSend = (res: Response, json= {}, status: number = 200) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(status).end(JSON.stringify({...{status: status === 200 ? "success" : "error"}, ...json}));
}
