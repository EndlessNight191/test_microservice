import {Response} from "express";

export const resSend = (res: Response, json= {}) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).end(JSON.stringify({...{status: "success"}, ...json}));
}
