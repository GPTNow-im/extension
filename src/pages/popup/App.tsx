import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { toast, Toaster } from 'react-hot-toast';
import { Radio, Input, Text, Button } from '@nextui-org/react';
import { ConfigComponent } from '../../components/Config';
const rootElement = document.createElement('div');
rootElement.id = 'chatgpt-root';

document.body.appendChild(rootElement);

function Root() {
  const [model, setModel] = React.useState('3.5-turbo');
  const [temperature, setTemperature] = React.useState(0.6);
  const [apiKey, setApiKey] = React.useState<string>();
  const [editing, setEditing] = React.useState(false);
  const getConfig = async () => {
    chrome.storage.local.get(['model'], function (result) {
      if (result.model) setModel(result.model);
    });
    chrome.storage.local.get(['temperature'], function (result) {
      if (result.temperature) setTemperature(result.temperature);
    });
    chrome.storage.local.get(['openai_key'], function (result) {
      if (result.openai_key) setApiKey(result.openai_key);
    });
  };

  useEffect(() => {
    getConfig();
  }, []);
  return (
    <div
      style={{
        padding: '30px',
        width: '400px',
        height: '500px',
        paddingTop: '10px',
      }}
    >
      <Text h2>ChatGPT Anywhere</Text>
      <ConfigComponent
        settingVisible={true}
        onClose={() => {
          window.close();
        }}
        onSubmit={(config) => {
          toast.success('Save successfully');
        }}
      />
    </div>
  );
}
ReactDOM.render(
  <React.StrictMode>
    <Root />
    <Toaster />
  </React.StrictMode>,
  rootElement,
);
