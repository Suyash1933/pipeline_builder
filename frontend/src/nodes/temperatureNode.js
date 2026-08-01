// temperatureNode.js — Controls LLM generation parameters

import { BaseNode } from './BaseNode';
import { useNodeFields } from './useNodeFields';

const fields = [
  { name: 'temperature', type: 'slider', label: 'Temperature', defaultValue: 0.7, min: 0, max: 2, step: 0.05 },
  { name: 'maxTokens', type: 'number', label: 'Max Tokens', defaultValue: 256, min: 1, max: 4096, step: 1 },
  { name: 'topP', type: 'slider', label: 'Top P', defaultValue: 1, min: 0, max: 1, step: 0.05 },
];

export const TemperatureNode = ({ id, data }) => {
  const { fieldValues, onFieldChange } = useNodeFields(fields, data);

  return (
    <BaseNode
      id={id}
      title="LLM Config"
      icon="&#9881;"
      className="node-config"
      inputs={[{ id: 'llm' }]}
      outputs={[{ id: 'config' }]}
      fields={fields}
      fieldValues={fieldValues}
      onFieldChange={onFieldChange}
    />
  );
};
