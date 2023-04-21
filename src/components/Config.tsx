import { Modal, Input, Dropdown, Button, Text } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import {
  getActiveModel,
  getKey,
  getMemoryLength,
  getTemperature,
  setActiveModel,
  setActiveTemperature,
  setKey,
  setMemoryLength,
} from '../functions/chatgpt';

export function ConfigComponent(props: {
  settingVisible: boolean;
  onClose: () => void;
  onSubmit: (o: {
    apikey: string;
    model: 'gpt-3.5-turbo' | 'gpt-4';
    temperature: number;
    memorylength: number;
  }) => void;
}) {
  const [apikey, setApikey] = useState('');
  const [model, setModel] = useState<'gpt-3.5-turbo' | 'gpt-4'>(
    'gpt-3.5-turbo',
  );
  const [temperature, setTemperature] = useState(0.6);
  const [_memoryLength, _setMemoryLength] = useState(4);

  function updateConfig() {
    setKey(apikey);
    setActiveModel(model);
    setActiveTemperature(temperature);

    setMemoryLength(_memoryLength);

    props.onSubmit({
      apikey,
      model,
      temperature,
      memorylength: _memoryLength,
    });
  }
  async function initConfigFromLocal() {
    const _apikey = await getKey();
    const _model = await getActiveModel();
    const _temperature = await getTemperature();
    const _memoryLength = await getMemoryLength();
    setApikey(_apikey);
    setModel(_model);
    setTemperature(_temperature);
    setMemoryLength(_memoryLength);
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
        <div
          style={{
            paddingTop: '30px',
          }}
        >
          <Input
            color="primary"
            size="lg"
            labelPlaceholder="API Key"
            style={{
              textAlign: 'left',
            }}
            fullWidth={true}
            value={apikey}
            onChange={(e) => {
              setApikey(e.target.value);
            }}
          />
        </div>
        <Dropdown>
          <Dropdown.Trigger>
            <div
              style={{
                paddingTop: '30px',
              }}
            >
              <Input
                color="primary"
                size="lg"
                fullWidth={true}
                labelPlaceholder="Active Model"
                value={model}
                readOnly={true}
                style={{
                  textAlign: 'left',
                  textTransform: 'uppercase',
                }}
              />
            </div>
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
        <div
          style={{
            paddingTop: '30px',
          }}
        >
          <Input
            type="number"
            min={0}
            max={1}
            step={0.1}
            color="primary"
            size="lg"
            fullWidth={true}
            labelPlaceholder="Temperature"
            style={{
              textAlign: 'left',
            }}
            value={temperature}
            onChange={(e) => {
              setTemperature(parseFloat(e.target.value));
            }}
          />
        </div>
        <div
          style={{
            paddingTop: '30px',
          }}
        >
          <Input
            fullWidth={true}
            type="number"
            min={0}
            max={10}
            step={1}
            color="primary"
            size="lg"
            labelPlaceholder="Memory Length"
            style={{
              textAlign: 'left',
            }}
            value={_memoryLength}
            onChange={(e) => {
              _setMemoryLength(parseFloat(e.target.value));
            }}
          />
        </div>
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
