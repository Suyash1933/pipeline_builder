// apiNode.js — Makes HTTP API calls

import { BaseNode } from './BaseNode';
import { useNodeFields } from './useNodeFields';

const fields = [
  { name: 'url', type: 'text', label: 'URL', defaultValue: 'https://api.example.com', placeholder: 'Enter URL' },
  {
    name: 'method',
    type: 'select',
    label: 'Method',
    defaultValue: 'GET',
    options: [
      { value: 'GET', label: 'GET' },
      { value: 'POST', label: 'POST' },
      { value: 'PUT', label: 'PUT' },
      { value: 'DELETE', label: 'DELETE' },
    ],
  },
  { name: 'headers', type: 'textarea', label: 'Headers (JSON)', defaultValue: '{}', rows: 2 },
];

export const APINode = ({ id, data }) => {
  const { fieldValues, onFieldChange } = useNodeFields(fields, data);

  return (
    <BaseNode
      id={id}
      title="API Call"
      icon="&#8644;"
      className="node-api"
      inputs={[{ id: 'body' }]}
      outputs={[{ id: 'response' }]}
      fields={fields}
      fieldValues={fieldValues}
      onFieldChange={onFieldChange}
    />
  );
};
