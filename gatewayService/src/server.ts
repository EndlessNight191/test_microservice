import App from '@/app';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import RandomPhraseRouter from "@routes/randomPhrase.route";
import GeneralRouter from "@routes/general.route";

validateEnv();

const app = new App([
  new IndexRoute(),
  new RandomPhraseRouter(),
  new GeneralRouter()
]);

app.listen();
