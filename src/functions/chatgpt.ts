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
