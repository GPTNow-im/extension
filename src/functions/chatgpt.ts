import { Configuration, OpenAIApi } from 'openai';

export async function getKey(): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['openai_key'], function (result) {
      resolve(result.openai_key as string);
    });
  });
}

export async function setKey(key: string) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ openai_key: key }, function () {
      resolve(null);
    });
  });
}

export async function getActiveModel(): Promise<'gpt-3.5-turbo' | 'gpt-4'> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['model2'], function (result) {
      resolve((result.model2 || 'gpt-3.5-turbo') as 'gpt-3.5-turbo' | 'gpt-4');
    });
  });
}

export async function setActiveModel(model: 'gpt-3.5-turbo' | 'gpt-4') {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ model2: model }, function () {
      resolve(null);
    });
  });
}

export async function getTemperature(): Promise<number> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['temperature'], function (result) {
      resolve(result.temperature as number);
    });
  });
}

export async function setActiveTemperature(temperature: number) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ temperature }, function () {
      resolve(null);
    });
  });
}

export async function getMemoryLength(): Promise<number> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['memorylength'], function (result) {
      resolve(result.memorylength as number);
    });
  });
}

export async function setMemoryLength(memorylength: number) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ memorylength }, function () {
      resolve(null);
    });
  });
}
export async function getGPTBaseURL(): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['baseurl'], function (result) {
      resolve((result.baseurl as string) || 'https://pro.gptnow.pro');
    });
  });
}

export async function setGPTBaseURL(baseurl: string) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ baseurl }, function () {
      resolve(null);
    });
  });
}

export async function getGPTEmoji(): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['emoji'], function (result) {
      resolve((result.emoji as string) || '🤖');
    });
  });
}

export async function setGPTEmoji(emoji: string) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ emoji }, function () {
      resolve(null);
    });
  });
}
