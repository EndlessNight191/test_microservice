import { Router } from 'express';

export interface Routes {
  path?: string;
  router: Router;
}

export interface DataResult {
  text: string;
  error: boolean;
  status: string;
}
