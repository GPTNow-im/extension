export type IConfig = {
  model2: 'gpt-3.5-turbo' | 'gpt-4';
  temperature: number;
  memorylength: number;
  emoji: string;
  baseurl: string;
  openai_key: string;
  searchOnGoogle: boolean;
  searchOnBing: boolean;
  searchOnBaidu: boolean;
  searchOn: boolean;
  domainOn: boolean;
  selectionOn: boolean;
};

const Config: IConfig = {
  model2: 'gpt-3.5-turbo',
  temperature: 0.9,
  memorylength: 4,
  emoji: '🤖',
  baseurl: 'https://pro.gptnow.pro',
  openai_key: '',
  searchOnGoogle: true,
  searchOnBing: true,
  searchOnBaidu: true,
  searchOn: true,
  domainOn: true,
  selectionOn: true,
};

export function restoreConfig(): Promise<IConfig> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(Object.keys(Config), function (result) {
      Object.assign(Config, result);
      resolve(Config as IConfig);
    });
  });
}

export function setConfig(config: Partial<typeof Config>) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(config, function () {
      Object.assign(Config, config);
      resolve(null);
    });
  });
}
