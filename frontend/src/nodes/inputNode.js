// inputNode.js

import { BaseNode } from './BaseNode';
import { useNodeFields } from './useNodeFields';

const fields = [
  { name: 'inputName', type: 'text', label: 'Name', defaultValue: '' },
  {
    name: 'inputType',
    type: 'select',
    label: 'Type',
    defaultValue: 'Text',
    options: [
      { value: 'Text', label: 'Text' },
      { value: 'File', label: 'File' },
    ],
  },
];

export const InputNode = ({ id, data }) => {
  const defaults = { ...data, inputName: data?.inputName || id.replace('customInput-', 'input_') };
  const { fieldValues, onFieldChange } = useNodeFields(fields, defaults);

  return (
    <BaseNode
      id={id}
      title="Input"
      icon="&#8594;"
      className="node-input"
      outputs={[{ id: 'value' }]}
      fields={fields}
      fieldValues={fieldValues}
      onFieldChange={onFieldChange}
    />
  );
};
