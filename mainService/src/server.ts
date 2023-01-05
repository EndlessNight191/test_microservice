import App from '@/app';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import authRouter from "@routes/auth.router";
import generalRouter from "@routes/general.route";

validateEnv();

const app = new App([new IndexRoute(), new authRouter(), new generalRouter()]);

app.listen();
