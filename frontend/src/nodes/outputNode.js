// outputNode.js

import { BaseNode } from './BaseNode';
import { useNodeFields } from './useNodeFields';

const fields = [
  { name: 'outputName', type: 'text', label: 'Name', defaultValue: '' },
  {
    name: 'outputType',
    type: 'select',
    label: 'Type',
    defaultValue: 'Text',
    options: [
      { value: 'Text', label: 'Text' },
      { value: 'Image', label: 'Image' },
    ],
  },
];

export const OutputNode = ({ id, data }) => {
  const defaults = { ...data, outputName: data?.outputName || id.replace('customOutput-', 'output_') };
  const { fieldValues, onFieldChange } = useNodeFields(fields, defaults);

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="&#8592;"
      className="node-output"
      inputs={[{ id: 'value' }]}
      fields={fields}
      fieldValues={fieldValues}
      onFieldChange={onFieldChange}
    />
  );
};
