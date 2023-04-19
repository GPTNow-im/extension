import { Modal, Input, Dropdown, Button, Text } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import {
  getActiveModel,
  getKey,
  getTemperature,
  setActiveModel,
  setActiveTemperature,
  setKey,
} from '../functions/chatgpt';

export function ConfigComponent(props: {
  settingVisible: boolean;
  onClose: () => void;
  onSubmit: (o: {
    apikey: string;
    model: 'gpt-3.5-turbo' | 'gpt-4';
    temperature: number;
  }) => void;
}) {
  const [apikey, setApikey] = useState('');
  const [model, setModel] = useState<'gpt-3.5-turbo' | 'gpt-4'>(
    'gpt-3.5-turbo',
  );
  const [temperature, setTemperature] = useState(0.6);
  function updateConfig() {
    setKey(apikey);
    setActiveModel(model);
    setActiveTemperature(temperature);

    props.onSubmit({
      apikey,
      model,
      temperature,
    });
  }
  async function initConfigFromLocal() {
    const _apikey = await getKey();
    const _model = await getActiveModel();
    const _temperature = await getTemperature();
    setApikey(_apikey);
    setModel(_model);
    setTemperature(_temperature);
  }

  useEffect(() => {
    initConfigFromLocal();
  }, []);
  return (
    <Modal
      closeButton
      blur
      aria-labelledby="modal-title"
      open={props.settingVisible}
      onClose={() => {
        props.onClose();
      }}
      css={{
        zIndex: 9999999999,
      }}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Setting
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          bordered
          color="primary"
          size="lg"
          placeholder="API Key"
          contentLeft={<>🔑</>}
          style={{
            textAlign: 'left',
          }}
          value={apikey}
          onChange={(e) => {
            setApikey(e.target.value);
          }}
        />
        <Dropdown>
          <Dropdown.Trigger>
            <Input
              bordered
              color="primary"
              size="lg"
              placeholder="Active Model"
              contentLeft={<>🧬</>}
              value={model}
              readOnly={true}
              style={{
                textAlign: 'left',
                textTransform: 'uppercase',
              }}
            />
          </Dropdown.Trigger>
          <Dropdown.Menu
            color="secondary"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={model}
            onSelectionChange={(e) => {
              // console.log(e.currentKey);
              setModel((e as any).currentKey);
            }}
          >
            <Dropdown.Item key="gpt-3.5-turbo">GPT-3.5-TURBO</Dropdown.Item>
            <Dropdown.Item key="gpt-4">GPT-4</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Input
          bordered
          type="number"
          min={0}
          max={1}
          step={0.1}
          color="primary"
          size="lg"
          placeholder="Temperature"
          contentLeft={<>🪄</>}
          style={{
            textAlign: 'left',
          }}
          value={temperature}
          onChange={(e) => {
            setTemperature(parseFloat(e.target.value));
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          auto
          onPress={() => {
            updateConfig();
          }}
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
