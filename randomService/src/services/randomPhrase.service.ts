import {randomPhrase} from "@intouchg/random-phrase";

class RandomPhraseService {

  public async randomPhrase() :Promise<string>{
    return await randomPhrase({length: 10, delimiter: ' '})
  }

}

export default RandomPhraseService;
