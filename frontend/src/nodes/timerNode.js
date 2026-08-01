// timerNode.js — Delays execution by a configurable duration

import { BaseNode } from './BaseNode';
import { useNodeFields } from './useNodeFields';

const fields = [
  { name: 'delay', type: 'number', label: 'Delay (ms)', defaultValue: 1000, min: 0, max: 60000, step: 100 },
  {
    name: 'mode',
    type: 'select',
    label: 'Mode',
    defaultValue: 'delay',
    options: [
      { value: 'delay', label: 'Delay' },
      { value: 'interval', label: 'Interval' },
      { value: 'debounce', label: 'Debounce' },
    ],
  },
];

export const TimerNode = ({ id, data }) => {
  const { fieldValues, onFieldChange } = useNodeFields(fields, data);

  return (
    <BaseNode
      id={id}
      title="Timer"
      icon="&#9201;"
      className="node-timer"
      inputs={[{ id: 'trigger' }]}
      outputs={[{ id: 'output' }]}
      fields={fields}
      fieldValues={fieldValues}
      onFieldChange={onFieldChange}
    />
  );
};
