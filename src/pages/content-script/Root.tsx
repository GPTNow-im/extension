import { Tooltip } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import { createClient, createChatGPTClient, ChatGPTProvider } from 'uikit.chat';
import ChatModal from './ChatModal';
import styled from 'styled-components';
import { ConfigComponent } from '../../components/Config';

import { makeElementDrag } from '../../functions/makeElementDrag';
import { globalBus } from '../../functions/globalBus';
const chatuiClient = createClient();
const chatGPTStore = createChatGPTClient(chatuiClient);

const logo = chrome.runtime.getURL('images/logo.png');

function getLang(key: string) {
  return chrome && chrome.i18n ? chrome.i18n.getMessage(key) : key;
}

const IconMenuItem = styled.div`
  display: flex;
  margin: 3px;
  border-radius: 8px;
  font-size: 14px;
  color: #444;
  alignitems: center;
  padding: 10px 8px;
  cursor: pointer;
  gap: 10px;
  border: 1px dotted #ccc;
  &:hover {
    background: #efefef;
  }
`;
const MenuItem = styled.div`
  margin: 3px;
  margin-top: 8px;
  border-radius: 8px;
  font-size: 16px;
  color: #444;
  align-items: center;
  padding: 5px 8px;
  cursor: pointer;
  border: 1px dotted #ccc;
  border-radius: 8px;
`;
function Root() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenFromSearch, setIsOpenFromSearch] = useState(false);

  const [showTrigger, setShowTrigger] = useState(true);

  const [settingVisible, setSettingVisible] = useState(false);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.text) {
        setIsOpen(true);
        setTimeout(() => {
          chatGPTStore.chatuiClient.chatboxStore.inputValue = request.text;
          chatGPTStore.chatuiClient.chatboxStore.submit();
        }, 1000);
      }
    });
    globalBus.addListener('selecttext', (text) => {
      document
        .getElementById('chatgpt-anywhere-trigger')
        ?.classList.add('hover');
      setTimeout(() => {
        document
          .getElementById('chatgpt-anywhere-trigger')
          ?.classList.remove('hover');
      }, 2000);
    });
    globalBus.addListener('openchat', (text) => {
      if (text) {
        setIsOpen(true);
        setTimeout(() => {
          chatGPTStore.chatuiClient.chatboxStore.inputValue = text;
          chatGPTStore.chatuiClient.chatboxStore.submit();
        }, 1000);
      }
    });
    globalBus.addListener('openchat-from-search', (text) => {
      if (text) {
        setIsOpenFromSearch(true);
        setTimeout(() => {
          chatGPTStore.chatuiClient.chatboxStore.inputValue = text;
          chatGPTStore.chatuiClient.chatboxStore.submit();
        }, 1000);
      }
    });
    makeElementDrag(() => {
      setIsOpen(true);
    });
  }, []);

  return (
    <>
      <ChatGPTProvider chatGPT={chatGPTStore}>
        <>
          <ChatModal
            onClose={() => {
              setIsOpen(false);
            }}
            show={isOpen || isOpenFromSearch}
            isSearch={isOpenFromSearch}
          />

          {showTrigger && (
            <div
              id="chatgpt-anywhere-trigger"
              onDoubleClick={() => {
                setShowTrigger(false);
              }}
              style={{
                right: '55px',
                bottom: '55px',
              }}
            >
              <Tooltip
                enterDelay={400}
                leaveDelay={100}
                content={
                  <div
                    style={{
                      padding: '6px 0px',
                      width: '220px',
                    }}
                  >
                    <div>
                      <MenuItem
                        style={{
                          alignItems: 'center',
                          color: '#999',
                          fontSize: '12px',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span>GPTNow.Pro</span>
                        <span
                          style={{
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                          }}
                        >
                          <Tooltip content={getLang('rate')}>
                            <a
                              target="_blank"
                              href="https://gptnow.pro/api/chrome"
                              rel="noreferrer"
                            >
                              <svg
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                              >
                                <path
                                  d="M881.066667 394.666667c-21.333333-23.466667-51.2-36.266667-81.066667-36.266667H618.666667v-117.333333c0-44.8-29.866667-85.333333-87.466667-117.333334-17.066667-10.666667-38.4-12.8-57.6-8.533333-19.2 4.266667-36.266667 17.066667-46.933333 34.133333-2.133333 2.133333-2.133333 4.266667-4.266667 6.4l-125.866667 281.6H204.8c-59.733333 0-108.8 46.933333-108.8 106.666667v258.133333c0 57.6 49.066667 106.666667 108.8 106.666667h544c53.333333 0 98.133333-38.4 106.666667-89.6l51.2-337.066667c4.266667-34.133333-6.4-64-25.6-87.466666z m-593.066667 448H204.8c-25.6 0-44.8-19.2-44.8-42.666667v-256c0-23.466667 19.2-42.666667 44.8-42.666667h83.2v341.333334z m554.666667-373.333334L789.333333 806.4c-4.266667 21.333333-21.333333 36.266667-42.666666 36.266667H352V471.466667l130.133333-290.133334c2.133333-4.266667 4.266667-4.266667 6.4-4.266666 2.133333 0 4.266667 0 8.533334 2.133333 25.6 14.933333 55.466667 38.4 55.466666 64v149.333333c0 17.066667 14.933333 32 32 32h213.333334c12.8 0 25.6 4.266667 34.133333 14.933334 8.533333 6.4 12.8 19.2 10.666667 29.866666z"
                                  fill="#1296DB"
                                ></path>
                              </svg>
                            </a>
                          </Tooltip>
                          <Tooltip content={getLang('share')}>
                            <a
                              href="https://twitter.com/intent/retweet?tweet_id=1650868597408034816"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <svg
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                              >
                                <path
                                  d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m215.3 337.7c0.3 4.7 0.3 9.6 0.3 14.4 0 146.8-111.8 315.9-316.1 315.9-63 0-121.4-18.3-170.6-49.8 9 1 17.6 1.4 26.8 1.4 52 0 99.8-17.6 137.9-47.4-48.8-1-89.8-33-103.8-77 17.1 2.5 32.5 2.5 50.1-2-50.8-10.3-88.9-55-88.9-109v-1.4c14.7 8.3 32 13.4 50.1 14.1-30.9-20.6-49.5-55.3-49.5-92.4 0-20.7 5.4-39.6 15.1-56 54.7 67.4 136.9 111.4 229 116.1C492 353.1 548.4 292 616.2 292c32 0 60.8 13.4 81.1 35 25.1-4.7 49.1-14.1 70.5-26.7-8.3 25.7-25.7 47.4-48.8 61.1 22.4-2.4 44-8.6 64-17.3-15.1 22.2-34 41.9-55.7 57.6z"
                                  fill="#1296DB"
                                ></path>
                              </svg>
                            </a>
                          </Tooltip>
                          <Tooltip content={'Github OpenSource'}>
                            <a
                              target="_blank"
                              href="https://gptnow.pro/api/github"
                              rel="noreferrer"
                            >
                              <svg
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                              >
                                <path
                                  d="M64 512c0 195.2 124.8 361.6 300.8 422.4 22.4 6.4 19.2-9.6 19.2-22.4v-76.8c-134.4 16-140.8-73.6-150.4-89.6-19.2-32-60.8-38.4-48-54.4 32-16 64 3.2 99.2 57.6 25.6 38.4 76.8 32 105.6 25.6 6.4-22.4 19.2-44.8 35.2-60.8-144-22.4-201.6-108.8-201.6-211.2 0-48 16-96 48-131.2-22.4-60.8 0-115.2 3.2-121.6 57.6-6.4 118.4 41.6 124.8 44.8 32-9.6 70.4-12.8 112-12.8 41.6 0 80 6.4 112 12.8 12.8-9.6 67.2-48 121.6-44.8 3.2 6.4 25.6 57.6 6.4 118.4 32 38.4 48 83.2 48 131.2 0 102.4-57.6 188.8-201.6 214.4 22.4 22.4 38.4 54.4 38.4 92.8v112c0 9.6 0 19.2 16 19.2C832 876.8 960 710.4 960 512c0-246.4-201.6-448-448-448S64 265.6 64 512z"
                                  fill="#040000"
                                ></path>
                              </svg>
                            </a>
                          </Tooltip>
                        </span>
                      </MenuItem>
                    </div>
                    <div
                      style={{}}
                      onClick={async () => {
                        setIsOpen(true);
                      }}
                    >
                      <IconMenuItem>
                        <svg
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="4764"
                          width="20"
                          height="20"
                        >
                          <path
                            d="M512 1024A512 512 0 1 1 512 0a512 512 0 0 1 0 1024zM320 576a64 64 0 1 0 0-128 64 64 0 0 0 0 128z m192 0a64 64 0 1 0 0-128 64 64 0 0 0 0 128z m192 0a64 64 0 1 0 0-128 64 64 0 0 0 0 128z"
                            fill="currentColor"
                            p-id="4765"
                          ></path>
                        </svg>
                        <div>{getLang('openchat')}</div>
                      </IconMenuItem>
                    </div>
                    <div
                      style={{}}
                      onClick={async () => {
                        window.open('https://gptnow.pro');
                      }}
                    >
                      <IconMenuItem>
                        <svg
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="2635"
                          width="20"
                          height="20"
                        >
                          <path
                            d="M757.938 202H567c-24.852 0-45-20.148-45-45S542.148 112 567 112h300c24.852 0 45 20.148 45 45v300c0 24.852-20.148 45-45 45S822 481.852 822 457v-191.78L540.73 544.91c-17.622 17.524-46.116 17.444-63.64-0.18-17.524-17.622-17.444-46.116 0.18-63.64L757.938 202zM867 652c24.852 0 45 20.148 45 45V762c0 82.842-67.158 150-150 150H262c-82.842 0-150-67.158-150-150V262c0-82.842 67.158-150 150-150h65c24.852 0 45 20.148 45 45S351.852 202 327 202H262c-33.138 0-60 26.862-60 60v500c0 33.138 26.862 60 60 60h500c33.138 0 60-26.862 60-60v-65c0-24.852 20.148-45 45-45z"
                            fill="currentColor"
                          ></path>
                        </svg>
                        <div>{getLang('gowebsite')}</div>
                      </IconMenuItem>
                    </div>
                    <div
                      style={{}}
                      onClick={async () => {
                        setSettingVisible(true);
                      }}
                    >
                      <IconMenuItem>
                        <svg
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                        >
                          <path
                            d="M550.4 74.666667c25.6 0 46.933333 19.2 53.333333 44.8l14.933334 85.333333 38.4 17.066667L727.466667 170.666667c19.2-14.933333 46.933333-12.8 66.133333 4.266666l2.133333 2.133334 53.333334 53.333333c19.2 19.2 21.333333 46.933333 6.4 68.266667l-49.066667 70.4 17.066667 38.4 85.333333 14.933333c23.466667 4.266667 42.666667 25.6 44.8 49.066667v78.933333c0 25.6-19.2 46.933333-44.8 53.333333l-85.333333 14.933334-17.066667 38.4 49.066667 70.4c14.933333 19.2 12.8 46.933333-4.266667 66.133333l-2.133333 2.133333-53.333334 53.333334c-19.2 19.2-46.933333 21.333333-68.266666 6.4l-70.4-49.066667-38.4 17.066667-14.933334 85.333333c-4.266667 23.466667-25.6 42.666667-49.066666 44.8h-78.933334c-25.6 0-46.933333-19.2-53.333333-44.8l-14.933333-85.333333-38.4-17.066667-72.533334 46.933333c-19.2 14.933333-46.933333 12.8-66.133333-4.266666l-2.133333-2.133334-53.333334-53.333333c-19.2-19.2-21.333333-46.933333-6.4-68.266667l49.066667-70.4-17.066667-38.4-85.333333-14.933333c-23.466667-4.266667-42.666667-25.6-44.8-49.066667v-78.933333c0-25.6 19.2-46.933333 44.8-53.333333l85.333333-14.933334 17.066667-38.4L170.666667 296.533333c-14.933333-19.2-12.8-46.933333 2.133333-64l2.133333-2.133333 53.333334-53.333333c19.2-19.2 46.933333-21.333333 68.266666-6.4l70.4 49.066666 38.4-17.066666 14.933334-85.333334c4.266667-23.466667 25.6-42.666667 49.066666-44.8H550.4z m-38.4 320c-64 0-117.333333 53.333333-117.333333 117.333333s53.333333 117.333333 117.333333 117.333333 117.333333-53.333333 117.333333-117.333333-53.333333-117.333333-117.333333-117.333333z"
                            fill="currentColor"
                          ></path>
                        </svg>
                        <div>{getLang('config')}</div>
                      </IconMenuItem>
                    </div>
                    <div
                      style={{}}
                      onClick={async () => {
                        setShowTrigger(false);
                      }}
                    >
                      <IconMenuItem>
                        <svg
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                        >
                          <path d="M825.880381 134.192762l51.736381 51.736381-655.116191 655.11619-51.736381-51.736381 655.116191-655.11619z m-21.479619 191.585524c41.301333 39.497143 81.310476 87.942095 120.027428 145.310476a73.142857 73.142857 0 0 1 2.755048 77.385143l-2.755048 4.437333-6.92419 10.118095C795.184762 740.303238 659.992381 828.952381 512 828.952381c-58.441143 0-114.858667-13.824-169.301333-41.447619l55.100952-55.100952c37.449143 15.701333 75.50781 23.405714 114.200381 23.405714 120.880762 0 235.471238-75.142095 345.088-234.008381l6.704762-9.801143-6.729143-9.825524c-34.279619-49.688381-69.046857-91.184762-104.350476-124.708571l51.687619-51.687619zM512 195.047619c51.44381 0 101.302857 10.703238 149.650286 32.109714l-56.466286 56.490667A289.401905 289.401905 0 0 0 512 268.190476c-120.880762 0-235.471238 75.142095-345.088 234.008381L160.207238 512l6.729143 9.825524c29.549714 42.812952 59.440762 79.530667 89.721905 110.34819l-51.663238 51.663238c-36.132571-36.693333-71.289905-80.335238-105.423238-130.925714a73.142857 73.142857 0 0 1-2.755048-77.385143l2.755048-4.437333 6.92419-10.118095C228.815238 283.696762 364.007619 195.047619 512 195.047619z m152.795429 270.384762a161.694476 161.694476 0 0 1-205.799619 205.799619l65.097142-65.097143a88.600381 88.600381 0 0 0 75.629715-75.629714l65.072762-65.097143zM512 356.717714c6.41219 0 12.751238 0.365714 18.968381 1.097143l-179.541333 179.565714A161.694476 161.694476 0 0 1 512 356.742095z"></path>
                        </svg>
                        <div>{getLang('hide')}</div>
                      </IconMenuItem>
                    </div>
                    <div>
                      <MenuItem
                        style={{
                          fontSize: '12px',
                          paddingTop: '10px',
                          paddingBottom: '10px',
                          color: '#999',
                        }}
                      >
                        {getLang('tips')}
                      </MenuItem>
                    </div>
                  </div>
                }
                placement="leftEnd"
              >
                <div id="chatgpt-anywhere-trigger-content">
                  <img src={logo} />
                </div>
              </Tooltip>
            </div>
          )}
          <ConfigComponent
            settingVisible={settingVisible}
            onClose={() => {
              setSettingVisible(false);
            }}
            onSubmit={(config) => {
              setSettingVisible(false);

              chatGPTStore.gptInfo.setInfos(config);
              chatGPTStore.refreshSession('default');
            }}
          />
        </>
      </ChatGPTProvider>
    </>
  );
}

export default Root;
