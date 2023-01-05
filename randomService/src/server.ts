import App from '@/app';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import randomPhraseRouter from "@routes/randomPhrase.router";

validateEnv();

const app = new App([new IndexRoute(), new randomPhraseRouter()]);

app.listen();
