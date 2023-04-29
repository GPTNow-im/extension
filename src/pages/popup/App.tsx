import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { toast, Toaster } from 'react-hot-toast';
import { Radio, Input, Text, Button } from '@nextui-org/react';
import { ConfigComponent } from '../../components/Config';
const rootElement = document.createElement('div');
rootElement.id = 'chatgpt-root';

document.body.appendChild(rootElement);

function Root() {
  return (
    <div
      style={{
        padding: '30px',
        width: '400px',
        height: '800px',
        paddingTop: '10px',
      }}
    >
      <Text h2>GPTNow.Pro</Text>
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
    <Toaster
      containerStyle={{
        zIndex: 999999999999,
      }}
    />
  </React.StrictMode>,
  rootElement,
);
