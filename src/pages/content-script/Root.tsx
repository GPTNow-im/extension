import { Tooltip } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { createClient, createChatGPTClient, ChatGPTProvider } from 'uikit.chat';
import ChatModal from './ChatModal';
import styled from 'styled-components';

const chatuiClient = createClient();
const chatGPTStore = createChatGPTClient(chatuiClient);

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
  padding-bottom: 8px;
  cursor: pointer;
  border: 1px dotted #ccc;
  border-radius: 8px;
`;
function Root() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTrigger, setShowTrigger] = useState(true);

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
    dragElement();
  }, []);
  function dragElement() {
    const rootElement = document.getElementById('chatgpt-anywhere-trigger');
    if (!rootElement) return;
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    var isDragging = false;
    let mousedownTimestamp: number = 0;
    rootElement.onmousedown = dragMouseDown;
    rootElement.onmouseup = (e) => {
      if (e.button !== 0) return;
      if (new Date().getTime() - mousedownTimestamp < 300) {
        setIsOpen(true);
      }
      closeDragElement();
      rootElement?.classList.remove('notransition');
    };

    function dragMouseDown(e: MouseEvent) {
      if (e.button !== 0) return;
      e = e || window.event;
      // e.preventDefault();
      mousedownTimestamp = Date.now();
      rootElement?.classList.add('notransition');
      // get the mouse cursor position at startup:
      pos3 = window.innerWidth - e.clientX;
      pos4 = window.innerHeight - e.clientY;
      document.addEventListener('mouseup', closeDragElement);
      document.addEventListener('mousemove', elementDrag);
      isDragging = true;
    }

    function elementDrag(e: MouseEvent) {
      e = e || window.event;
      if (!isDragging) return;
      const nowPosX = window.innerWidth - e.clientX;
      const nowPosY = window.innerHeight - e.clientY;
      // calculate the new cursor position:
      pos1 = pos3 - nowPosX;
      pos2 = pos4 - nowPosY;
      pos3 = nowPosX;
      pos4 = nowPosY;
      if (rootElement) {
        // set the element's new position:
        rootElement.style.right =
          Number(rootElement.style.right.replace(/[^\d]/g, '')) - pos1 + 'px';
        rootElement.style.bottom =
          Number(rootElement.style.bottom.replace(/[^\d]/g, '')) - pos2 + 'px';
        // localStorage.setItem(
        //   'metapavo-pos',
        //   [rootElement.style.right, rootElement.style.bottom].join('-'),
        // );
      }
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.removeEventListener('mouseup', closeDragElement);
      document.removeEventListener('mousemove', elementDrag);
    }
  }

  return (
    <>
      <ChatGPTProvider chatGPT={chatGPTStore}>
        <>
          <ChatModal
            onClose={() => {
              setIsOpen(false);
            }}
            show={isOpen}
          />
          {showTrigger && (
            <div
              id="chatgpt-anywhere-trigger"
              onDoubleClick={() => {
                setShowTrigger(false);
              }}
            >
              <Tooltip
                enterDelay={400}
                leaveDelay={400}
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
                          gap: '10px',

                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span>ChatGPT Anywhere</span>
                        <span
                          style={{
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                          }}
                        >
                          <Tooltip content={getLang('share')}>
                            <a
                              href="https://twitter.com/intent/retweet?tweet_id=1638856428634132484"
                              target="_blank"
                              rel="noreferrer"
                            >
                              🐦
                            </a>
                          </Tooltip>
                          <Tooltip content={getLang('rate')}>
                            <a
                              target="_blank"
                              href="https://chrome.google.com/webstore/detail/chatgpt-anywhere-chat-on/jcfkfnhebnhaldhlgfiaglpcjkdikbhc/reviews"
                              rel="noreferrer"
                            >
                              👍
                            </a>
                          </Tooltip>
                        </span>
                      </MenuItem>
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
                          width="18"
                          height="18"
                        >
                          <path d="M825.880381 134.192762l51.736381 51.736381-655.116191 655.11619-51.736381-51.736381 655.116191-655.11619z m-21.479619 191.585524c41.301333 39.497143 81.310476 87.942095 120.027428 145.310476a73.142857 73.142857 0 0 1 2.755048 77.385143l-2.755048 4.437333-6.92419 10.118095C795.184762 740.303238 659.992381 828.952381 512 828.952381c-58.441143 0-114.858667-13.824-169.301333-41.447619l55.100952-55.100952c37.449143 15.701333 75.50781 23.405714 114.200381 23.405714 120.880762 0 235.471238-75.142095 345.088-234.008381l6.704762-9.801143-6.729143-9.825524c-34.279619-49.688381-69.046857-91.184762-104.350476-124.708571l51.687619-51.687619zM512 195.047619c51.44381 0 101.302857 10.703238 149.650286 32.109714l-56.466286 56.490667A289.401905 289.401905 0 0 0 512 268.190476c-120.880762 0-235.471238 75.142095-345.088 234.008381L160.207238 512l6.729143 9.825524c29.549714 42.812952 59.440762 79.530667 89.721905 110.34819l-51.663238 51.663238c-36.132571-36.693333-71.289905-80.335238-105.423238-130.925714a73.142857 73.142857 0 0 1-2.755048-77.385143l2.755048-4.437333 6.92419-10.118095C228.815238 283.696762 364.007619 195.047619 512 195.047619z m152.795429 270.384762a161.694476 161.694476 0 0 1-205.799619 205.799619l65.097142-65.097143a88.600381 88.600381 0 0 0 75.629715-75.629714l65.072762-65.097143zM512 356.717714c6.41219 0 12.751238 0.365714 18.968381 1.097143l-179.541333 179.565714A161.694476 161.694476 0 0 1 512 356.742095z"></path>
                        </svg>
                        <div>{getLang('hide')}</div>
                      </IconMenuItem>
                    </div>
                  </div>
                }
                placement="leftEnd"
              >
                <div id="chatgpt-anywhere-trigger-content">
                  {getLang('open')}
                </div>
              </Tooltip>
            </div>
          )}
        </>
      </ChatGPTProvider>
    </>
  );
}

export default Root;
