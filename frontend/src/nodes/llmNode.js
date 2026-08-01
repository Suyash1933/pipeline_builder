// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="&#9672;"
      className="node-llm"
      inputs={[
        { id: 'system', position: `${100 / 3}%` },
        { id: 'prompt', position: `${200 / 3}%` },
      ]}
      outputs={[{ id: 'response' }]}
    >
      <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>This is a LLM.</span>
    </BaseNode>
  );
};
