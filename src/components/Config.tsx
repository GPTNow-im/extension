import {
  Modal,
  Input,
  Dropdown,
  Button,
  Text,
  Divider,
  Checkbox,
  Tooltip,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { IConfig, restoreConfig, setConfig } from '../stores/Config';
import { getLang } from '../utils/getLang';
import styled from 'styled-components';
import QuestionIcon from './QuestionIcon';

const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.5;
  margin-bottom: 5px;
  font-size: 12px;
`;

export function ConfigComponent(props: {
  settingVisible: boolean;
  onClose: () => void;
  onSubmit: (o: IConfig) => void;
}) {
  const [apikey, setApikey] = useState('');
  const [model, setModel] = useState<'gpt-3.5-turbo' | 'gpt-4'>(
    'gpt-3.5-turbo',
  );
  const [temperature, setTemperature] = useState(0.6);
  const [_memoryLength, _setMemoryLength] = useState(4);
  const [baseURL, setBaseURL] = useState('https://pro.gptnow.pro');

  /**searchOnGoogle: boolean;
  searchOnBing: boolean;
  searchOnBaidu: boolean; */
  const [searchOnGoogle, setSearchOnGoogle] = useState(true);
  const [searchOnBing, setSearchOnBing] = useState(true);
  const [searchOnBaidu, setSearchOnBaidu] = useState(true);

  const [searchOn, setSearchOn] = useState(true);
  const [selectionOn, setSelectionOn] = useState(true);
  const [domainOn, setDomainOn] = useState(true);

  const [emoji, setEmoji] = useState('');
  const [fontsize, setFontsize] = useState(14);
  async function updateConfig() {
    const newConfig = {
      openai_key: apikey,
      model2: model,
      temperature: temperature,
      memorylength: _memoryLength,
      baseurl: baseURL,
      emoji: emoji,
      searchOnGoogle: searchOnGoogle,
      searchOnBing: searchOnBing,
      searchOnBaidu: searchOnBaidu,
      searchOn,
      selectionOn,
      domainOn,
      fontsize,
    };
    await setConfig(newConfig);
    props.onSubmit(newConfig);
  }
  async function initConfigFromLocal() {
    const config = await restoreConfig();

    setApikey(config.openai_key);
    setModel(config.model2);
    setTemperature(config.temperature);
    _setMemoryLength(config.memorylength);
    setBaseURL(config.baseurl);
    setEmoji(config.emoji);
    setSearchOnGoogle(config.searchOnGoogle);
    setSearchOnBing(config.searchOnBing);
    setSearchOnBaidu(config.searchOnBaidu);
    setSearchOn(config.searchOn);
    setSelectionOn(config.selectionOn);
    setDomainOn(config.domainOn);
    setFontsize(config.fontsize);
  }

  useEffect(() => {
    if (props.settingVisible) initConfigFromLocal();
  }, [props.settingVisible]);
  return (
    <Modal
      closeButton
      blur
      aria-labelledby="modal-title"
      open={props.settingVisible}
      onClose={() => {
        props.onClose();
      }}
      width="450px"
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
        <div>
          <ItemHeader>OpenAI API Key</ItemHeader>
          <Input
            color="primary"
            size="sm"
            placeholder="API Key"
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
        <div>
          <ItemHeader>
            Proxy Base URL
            <Tooltip
              content={getLang('about_proxyurl')}
              css={{
                zIndex: 9999999999,
              }}
              color="success"
            >
              <QuestionIcon />
            </Tooltip>
            <a
              href="https://github.com/aoao-eth/Vercel-OpenAI-API"
              style={{
                position: 'absolute',
                right: '25px',
                fontSize: '12px',
              }}
            >
              {getLang('about_proxyurl_github')}
            </a>
          </ItemHeader>
          <Input
            color="primary"
            size="sm"
            placeholder="Proxy Base URL"
            style={{
              textAlign: 'left',
            }}
            fullWidth={true}
            value={baseURL}
            onChange={(e) => {
              setBaseURL(e.target.value);
            }}
          />
        </div>

        <Divider />
        <div
          style={{
            paddingTop: '15px',
            fontSize: '14px',
          }}
        >
          <Checkbox.Group
            size="sm"
            value={[
              searchOn ? 'search' : '',
              selectionOn ? 'selection' : '',
              domainOn ? 'domain' : '',
            ].filter((e) => e !== '')}
            label={getLang('config_functions')}
            onChange={(e) => {
              setSearchOn(e.includes('search'));
              setSelectionOn(e.includes('selection'));
              setDomainOn(e.includes('domain'));
            }}
            orientation="horizontal"
          >
            <Checkbox value="selection" size="sm">
              <a
                style={{
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {getLang('selectionon')}
                <Tooltip
                  content={getLang('selectionon_title')}
                  color="success"
                  css={{
                    zIndex: 9999999999,
                  }}
                >
                  <QuestionIcon />
                </Tooltip>
              </a>
            </Checkbox>
            <Checkbox value="domain" size="sm">
              <a
                style={{
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {getLang('domainon')}
                <Tooltip
                  content={getLang('domainon_title')}
                  color="success"
                  css={{
                    zIndex: 9999999999,
                  }}
                >
                  <QuestionIcon />
                </Tooltip>
              </a>
            </Checkbox>
          </Checkbox.Group>
        </div>

        <Divider
          style={{
            marginBottom: '15px',
          }}
        />
        <Dropdown>
          <Dropdown.Trigger>
            <div>
              <ItemHeader>Active Model</ItemHeader>
              <Input
                color="primary"
                size="sm"
                fullWidth={true}
                placeholder="Active Model"
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
        <div>
          <ItemHeader>Temperature</ItemHeader>
          <Input
            type="number"
            min={0}
            max={1}
            step={0.1}
            color="primary"
            size="sm"
            fullWidth={true}
            placeholder="Temperature"
            style={{
              textAlign: 'left',
            }}
            value={temperature}
            onChange={(e) => {
              setTemperature(parseFloat(e.target.value));
            }}
          />
        </div>
        <div>
          <ItemHeader>
            Memory Length
            <Tooltip
              content={getLang('about_memorylength')}
              css={{
                zIndex: 9999999999,
              }}
              color="success"
            >
              <QuestionIcon />
            </Tooltip>
          </ItemHeader>
          <Input
            fullWidth={true}
            type="number"
            min={0}
            max={10}
            step={1}
            color="primary"
            size="sm"
            placeholder={'Memory Length'}
            style={{
              textAlign: 'left',
            }}
            value={_memoryLength}
            onChange={(e) => {
              _setMemoryLength(parseFloat(e.target.value));
            }}
          />
        </div>

        <Dropdown>
          <Dropdown.Trigger>
            <div>
              <ItemHeader>Emoji</ItemHeader>
              <Input
                color="primary"
                size="sm"
                fullWidth={true}
                placeholder="GPT emoji"
                value={emoji}
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
            selectedKeys={emoji}
            onSelectionChange={(e) => {
              // console.log(e.currentKey);
              setEmoji((e as any).currentKey);
            }}
          >
            <Dropdown.Item key="🤡">🤡</Dropdown.Item>
            <Dropdown.Item key="🤖">🤖</Dropdown.Item>
            <Dropdown.Item key="👽">👽</Dropdown.Item>
            <Dropdown.Item key="👻">👻</Dropdown.Item>
            <Dropdown.Item key="🧚‍♀️">🧚‍♀️</Dropdown.Item>
            <Dropdown.Item key="🧝‍♀️">🧝‍♀️</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
