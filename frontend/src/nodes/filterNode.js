// filterNode.js — Filters/transforms data with a condition

import { BaseNode } from './BaseNode';
import { useNodeFields } from './useNodeFields';

const fields = [
  {
    name: 'condition',
    type: 'select',
    label: 'Condition',
    defaultValue: 'contains',
    options: [
      { value: 'contains', label: 'Contains' },
      { value: 'equals', label: 'Equals' },
      { value: 'startsWith', label: 'Starts with' },
      { value: 'regex', label: 'Regex match' },
    ],
  },
  { name: 'value', type: 'text', label: 'Value', defaultValue: '', placeholder: 'Filter value' },
  { name: 'caseSensitive', type: 'checkbox', label: 'Case sensitive', defaultValue: false },
];

export const FilterNode = ({ id, data }) => {
  const { fieldValues, onFieldChange } = useNodeFields(fields, data);

  return (
    <BaseNode
      id={id}
      title="Filter"
      icon="&#9700;"
      className="node-filter"
      inputs={[{ id: 'input' }]}
      outputs={[
        { id: 'match' },
        { id: 'noMatch' },
      ]}
      fields={fields}
      fieldValues={fieldValues}
      onFieldChange={onFieldChange}
    />
  );
};
