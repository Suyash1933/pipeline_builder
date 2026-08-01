// textNode.js

import { useState, useMemo, useRef, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

// Matches valid JS identifiers inside {{ }}
const VAR_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

const extractVariables = (text) => {
  const vars = [];
  const seen = new Set();
  let match;
  while ((match = VAR_REGEX.exec(text)) !== null) {
    if (!seen.has(match[1])) {
      seen.add(match[1]);
      vars.push(match[1]);
    }
  }
  return vars;
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);
  const deleteNode = useStore((state) => state.deleteNode);

  // Auto-resize textarea to fit content
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }, [currText]);

  // Extract unique variables from text
  const variables = useMemo(() => extractVariables(currText), [currText]);

  // Dynamic width: base 220px, grows with longest line
  const dynamicWidth = useMemo(() => {
    const lines = currText.split('\n');
    const longestLine = Math.max(...lines.map((l) => l.length));
    return Math.max(220, Math.min(400, longestLine * 7.5 + 40));
  }, [currText]);

  return (
    <div className="base-node node-text" style={{ width: dynamicWidth }}>
      {/* Header */}
      <div className="base-node-header">
        <span className="base-node-header-icon">T</span>
        <span style={{ flex: 1 }}>Text</span>
        <button
          className="base-node-delete"
          onClick={() => deleteNode(id)}
          title="Delete node"
        >
          &times;
        </button>
      </div>

      {/* Body */}
      <div className="base-node-body">
        <div className="node-field">
          <label className="node-field-label">
            <span className="node-field-label-text">Text</span>
            <textarea
              ref={textareaRef}
              value={currText}
              onChange={(e) => setCurrText(e.target.value)}
              placeholder="Enter text... use {{variable}} for inputs"
              rows={1}
              style={{
                overflow: 'hidden',
                minHeight: 32,
              }}
            />
          </label>
        </div>

        {/* Variable tags preview */}
        {variables.length > 0 && (
          <div className="text-node-variables">
            {variables.map((v) => (
              <span key={v} className="text-node-var-tag">{`{{${v}}}`}</span>
            ))}
          </div>
        )}
      </div>

      {/* Dynamic variable handles (left / target) */}
      {variables.map((varName, i) => (
        <Handle
          key={varName}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{ top: `${((i + 1) / (variables.length + 1)) * 100}%` }}
          title={varName}
        />
      ))}

      {/* Output handle (right / source) */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />
    </div>
  );
};
