import _ from 'lodash';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { globalBus } from '../../functions/globalBus';
import { Divider } from '@nextui-org/react';
import { restoreConfig } from '../../stores/Config';

function getLang(key: string) {
  return chrome && chrome.i18n ? chrome.i18n.getMessage(key) : key;
}
const RootElement = styled.div`
  position: fixed;
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  font-size: 12px;
  line-height: 25px;
  /* Light / Depth - 8 */

  filter: drop-shadow(0px 0.6px 1.8px rgba(0, 0, 0, 0.1))
    drop-shadow(0px 3.2px 7.2px rgba(0, 0, 0, 0.13));
  z-index: 10000000;
  * {
    font-family: Source Sans Pro, Helvetica Neue, Arial, sans-serif !important;
    color: #c4c4c4;
    font-size: 12px;
  }
  &::before {
    border-width: 6px 6px 0px;
    border-color: rgb(255, 255, 255) transparent transparent;
  }
  pointer-events: all;
  &::before {
    content: '';
    margin: auto;
    display: block;
    width: 0px;
    height: 0px;
    border-style: solid;
    position: absolute;
    bottom: -5px;
  }

  display: flex;
  align-items: center;
  flex-wrap: nowrap;
`;

const ButtonElement = styled.div`
  font-size: 14px;
  line-height: 25px;
  color: #000;
  cursor: pointer;
  padding: 0 5px;
  &:hover {
    opacity: 0.5;
  }
  &::after {
    content: '';
    display: inline-block;
    width: 1px;
    height: 10px;
    background: #ddd;
    margin-left: 9px;
  }
  &:last-child {
    &::after {
      display: none;
    }
  }
`;

const LabelElement = styled.div`
  font-size: 14px;
  line-height: 25px;
  color: #999;
  padding: 0 5px;
`;

let binded = false;
export default function SelectText() {
  const [text, setText] = React.useState('');
  const [pos, setPos] = React.useState({
    x: -100,
    y: -100,
  });
  const [isInPopup, setIsInPopup] = React.useState(false);

  const rootRef = React.useRef<HTMLDivElement | null>(null);

  const bindEvents = () => {
    if (binded) return;
    if (window.location.host.indexOf('google.com') != -1) {
      window.addEventListener('load', () => {
        console.log('onload');
        // 获取 google 搜索的 query 参数
        const urlParams = new URLSearchParams(window.location.search);
        const keyword = urlParams.get('q');
        if (keyword) {
          globalBus.emit('openchat-from-search', {
            keyword,
            url: window.location.href,
            type: 'google',
          });
        }
      });
    } else if (window.location.host.indexOf('baidu.com') != -1) {
      window.addEventListener('load', () => {
        console.log('onload');
        // 获取 baidu 搜索的 query 参数
        const urlParams = new URLSearchParams(window.location.search);
        const keyword = urlParams.get('wd');
        if (keyword) {
          globalBus.emit('openchat-from-search', {
            keyword,
            url: window.location.href,
            type: 'baidu',
          });
        }
      });
      // bing
    } else if (window.location.host.indexOf('bing.com') != -1) {
      window.addEventListener('load', () => {
        console.log('onload');
        // 获取 bing 搜索的 query 参数
        const urlParams = new URLSearchParams(window.location.search);
        const keyword = urlParams.get('q');
        if (keyword) {
          globalBus.emit('openchat-from-search', {
            keyword,
            url: window.location.href,
            type: 'bing',
          });
        }
      });
    } else if (window.location.href.indexOf('name.com/domain/search/') != -1) {
      window.addEventListener('load', () => {
        console.log('onload');
        // 获取 search 的关键字
        const keyword: any = document.querySelector('#search-keyword');

        if (keyword) {
          globalBus.emit('openchat-from-domain', {
            keyword: keyword.value,
          });
        }
      });
    } else if (
      window.location.href.indexOf('godaddy.com/domainsearch/find') != -1
    ) {
      //godaddy.com/domainsearch/find?checkAvail=1&domainToCheck=aaa
      window.addEventListener('load', () => {
        console.log('onload');

        const dom: HTMLInputElement | null =
          document.querySelector('#domain-search-box');

        dom?.addEventListener('keydown', function (e) {
          if (e.keyCode === 13) {
            if (dom?.value) {
              globalBus.emit('openchat-from-domain', {
                keyword: dom.value,
              });
            }
          }
        });
        // 获取 search 的关键字
        const urlParams = new URLSearchParams(window.location.search);
        const keyword = urlParams.get('domainToCheck');

        if (keyword) {
          globalBus.emit('openchat-from-domain', {
            keyword: keyword,
          });
        }
      });
    } else if (
      window.location.href.indexOf(
        'namecheap.com/domains/registration/results/',
      ) != -1
    ) {
      //https://www.namecheap.com/domains/registration/results/?domain=soul.id
      window.addEventListener('load', () => {
        console.log('onload');
        // 获取 search 的关键字
        const dom: HTMLInputElement | null =
          document.querySelector('#search-query');
        dom?.addEventListener('keydown', function (e) {
          if (e.keyCode === 13) {
            if (dom?.value) {
              globalBus.emit('openchat-from-domain', {
                keyword: dom.value,
              });
            }
          }
        });
        const urlParams = new URLSearchParams(window.location.search);
        const keyword = urlParams.get('domain');

        if (keyword) {
          globalBus.emit('openchat-from-domain', {
            keyword: keyword,
          });
        }
      });
    }
    document.addEventListener(
      'selectionchange',
      _.debounce(async function () {
        const config = await restoreConfig();

        if (!config.selectionOn) {
          return;
        }
        const selection = document.getSelection();
        console.log('selectionchange', selection);
        // 判断 selection 的 dom 当前是否在 #chatgpt-anywhere-container 里面
        const isInChatGPT = !!selection?.anchorNode?.parentElement?.closest(
          '#chatgpt-anywhere-container',
        );
        if (isInChatGPT) {
          return;
        }

        if (
          selection &&
          selection.type === 'Range' &&
          selection.toString().length > 2
        ) {
          const selectionText = selection.toString();
          setText(selectionText);
          const oRange = selection.getRangeAt(0); //get the text range
          const oRect = oRange.getBoundingClientRect();
          const absolutePos = {
            x: oRect.left,
            y: oRect.top - 100 - 10,
          };
          setPos(absolutePos);
          setConvertResult(null);
          globalBus.emit('selecttext', selectionText);
        } else {
          console.log('no selection');
        }
      }, 500),
    );
    document.body.addEventListener('click', () => {
      setText('');
      setPos({
        x: -100,
        y: -100,
      });
    });
    binded = true;
  };
  useEffect(() => {
    bindEvents();
  }, []);

  const [convertResult, setConvertResult] = React.useState<
    Date | null | string
  >();

  return (
    <>
      {text && (
        <RootElement
          style={{
            left: pos.x + 0 + 'px',
            top: pos.y + 40 + 'px',
          }}
          onMouseEnter={() => {
            setIsInPopup(true);
          }}
          onMouseLeave={() => {
            setIsInPopup(false);
          }}
          ref={rootRef}
        >
          <LabelElement>{getLang('togpt')}</LabelElement>
          <ButtonElement
            onClick={(e) => {
              e.stopPropagation();
              globalBus.emit('search', text);
              setText('');
            }}
          >
            {getLang('askgpt')}
          </ButtonElement>
          <ButtonElement
            onClick={(e) => {
              e.stopPropagation();
              globalBus.emit('interpret', text);
              setText('');
            }}
          >
            {getLang('gptinterpret')}
          </ButtonElement>
          <ButtonElement
            onClick={(e) => {
              e.stopPropagation();
              globalBus.emit('translate_en', text);
              setText('');
            }}
          >
            {getLang('gpttransen')}
          </ButtonElement>
          {getLang('gpttransen_cn') ? (
            <ButtonElement
              onClick={(e) => {
                e.stopPropagation();
                globalBus.emit('translate_cn', text);
                setText('');
              }}
            >
              {getLang('gpttransen_cn')}
            </ButtonElement>
          ) : null}
          <ButtonElement
            onClick={(e) => {
              e.stopPropagation();
              globalBus.emit('writemore', text);
              setText('');
            }}
          >
            {getLang('gptwritemore')}
          </ButtonElement>
          <ButtonElement
            onClick={(e) => {
              e.stopPropagation();
              globalBus.emit('rewrite', text);
              setText('');
            }}
          >
            {getLang('gptrewrite')}
          </ButtonElement>
        </RootElement>
      )}
    </>
  );
}
