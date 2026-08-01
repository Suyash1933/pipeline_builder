// mergeNode.js — Merges multiple inputs into a single output

import { BaseNode } from './BaseNode';
import { useNodeFields } from './useNodeFields';

const fields = [
  {
    name: 'strategy',
    type: 'select',
    label: 'Merge Strategy',
    defaultValue: 'concat',
    options: [
      { value: 'concat', label: 'Concatenate' },
      { value: 'join', label: 'Join with delimiter' },
      { value: 'array', label: 'As array' },
      { value: 'object', label: 'As object' },
    ],
  },
  { name: 'delimiter', type: 'text', label: 'Delimiter', defaultValue: '\\n', placeholder: 'e.g. \\n or ,' },
];

export const MergeNode = ({ id, data }) => {
  const { fieldValues, onFieldChange } = useNodeFields(fields, data);

  return (
    <BaseNode
      id={id}
      title="Merge"
      icon="&#8651;"
      className="node-merge"
      inputs={[
        { id: 'inputA' },
        { id: 'inputB' },
        { id: 'inputC' },
      ]}
      outputs={[{ id: 'merged' }]}
      fields={fields}
      fieldValues={fieldValues}
      onFieldChange={onFieldChange}
    />
  );
};
