import { useContext, useEffect, useState } from 'react';
import { ChatGPTContainer, ChatGPTContext } from 'uikit.chat';

import styles from '../../styles/index.module.scss';
import { toast } from 'react-hot-toast';
import { observer } from 'mobx-react-lite';
import {
  getActiveModel,
  getKey,
  getTemperature,
} from '../../functions/chatgpt';
import { ConfigComponent } from '../../components/Config';

export default observer((props: { onClose: () => void; show: boolean }) => {
  const chatGPTStore = useContext(ChatGPTContext);

  const [settingVisible, setSettingVisible] = useState(false);
  async function initConfigFromLocal() {
    if (chatGPTStore.inited) return;
    const _apikey = await getKey();
    const _model = await getActiveModel();
    const _temperature = await getTemperature();

    chatGPTStore.gptInfo.setInfos({
      apiKey: _apikey,
      model: _model,
      temperature: _temperature,
    });
    chatGPTStore.init();
    // restore();
  }

  function restore() {
    chrome.storage.local.get(['messages'], (result) => {
      if (result.messages && result.messages.length > 0) {
        chatGPTStore.chatuiClient.messageStore.messages = result.messages;
      }
    });
  }
  useEffect(() => {
    if (props.show) {
      initConfigFromLocal();
    }
  }, [props.show]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '0',
        right: '0',
        width: '0',
        height: '0',
        zIndex: 999,
      }}
    >
      <div
        className={[
          styles['chatgpt-popup'],
          props.show ? '' : styles['chatgpt-popup-hide'],
        ].join(' ')}
      >
        <ChatGPTContainer
          onCopyed={() => {
            toast.success('Copied to clipboard successfully');
          }}
        >
          <>
            <div
              className={styles['chatgpt-setting']}
              title="Setting"
              onClick={() => {
                setSettingVisible(true);
              }}
            >
              <svg
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
              >
                <path
                  d="M550.4 74.666667c25.6 0 46.933333 19.2 53.333333 44.8l14.933334 85.333333 38.4 17.066667L727.466667 170.666667c19.2-14.933333 46.933333-12.8 66.133333 4.266666l2.133333 2.133334 53.333334 53.333333c19.2 19.2 21.333333 46.933333 6.4 68.266667l-49.066667 70.4 17.066667 38.4 85.333333 14.933333c23.466667 4.266667 42.666667 25.6 44.8 49.066667v78.933333c0 25.6-19.2 46.933333-44.8 53.333333l-85.333333 14.933334-17.066667 38.4 49.066667 70.4c14.933333 19.2 12.8 46.933333-4.266667 66.133333l-2.133333 2.133333-53.333334 53.333334c-19.2 19.2-46.933333 21.333333-68.266666 6.4l-70.4-49.066667-38.4 17.066667-14.933334 85.333333c-4.266667 23.466667-25.6 42.666667-49.066666 44.8h-78.933334c-25.6 0-46.933333-19.2-53.333333-44.8l-14.933333-85.333333-38.4-17.066667-72.533334 46.933333c-19.2 14.933333-46.933333 12.8-66.133333-4.266666l-2.133333-2.133334-53.333334-53.333333c-19.2-19.2-21.333333-46.933333-6.4-68.266667l49.066667-70.4-17.066667-38.4-85.333333-14.933333c-23.466667-4.266667-42.666667-25.6-44.8-49.066667v-78.933333c0-25.6 19.2-46.933333 44.8-53.333333l85.333333-14.933334 17.066667-38.4L170.666667 296.533333c-14.933333-19.2-12.8-46.933333 2.133333-64l2.133333-2.133333 53.333334-53.333333c19.2-19.2 46.933333-21.333333 68.266666-6.4l70.4 49.066666 38.4-17.066666 14.933334-85.333334c4.266667-23.466667 25.6-42.666667 49.066666-44.8H550.4z m-38.4 320c-64 0-117.333333 53.333333-117.333333 117.333333s53.333333 117.333333 117.333333 117.333333 117.333333-53.333333 117.333333-117.333333-53.333333-117.333333-117.333333-117.333333z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div
              className={styles['chatgpt-close']}
              title="Close"
              onClick={() => {
                props.onClose?.();
              }}
            >
              <svg
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
              >
                <path
                  d="M155.00305177 868.99694823c-21.96904297-21.96904297-21.96904297-60.41486817 0-82.38391112l631.60998534-631.60998534c21.96904297-21.96904297 60.41486817-21.96904297 82.38391112 0s21.96904297 60.41486817 0 82.38391112l-631.60998534 631.60998534c-21.96904297 21.96904297-60.41486817 21.96904297-82.38391112 0z"
                  fill="currentColor"
                ></path>
                <path
                  d="M155.00305177 155.00305177c21.96904297-21.96904297 60.41486817-21.96904297 82.38391112 0l631.60998534 631.60998534c21.96904297 21.96904297 21.96904297 60.41486817 0 82.38391112s-60.41486817 21.96904297-82.38391112 0l-631.60998534-631.60998534c-21.96904297-21.96904297-21.96904297-60.41486817 0-82.38391112z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </>
        </ChatGPTContainer>
      </div>
      <ConfigComponent
        settingVisible={settingVisible}
        onClose={() => {
          setSettingVisible(false);
        }}
        onSubmit={(config) => {
          setSettingVisible(false);
          chatGPTStore.gptInfo.apiKey = config.apikey;
          chatGPTStore.gptInfo.model = config.model;
          chatGPTStore.gptInfo.temperature = config.temperature;

          chatGPTStore.refresh();
        }}
      />
    </div>
  );
});
