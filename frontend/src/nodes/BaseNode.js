// BaseNode.js
// Reusable node abstraction for building pipeline nodes quickly.

import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

// Field renderers keyed by type — all use CSS classes from index.css
const fieldRenderers = {
  text: ({ id, field, value, onChange }) => (
    <div key={field.name} className="node-field">
      <label className="node-field-label">
        <span className="node-field-label-text">{field.label}</span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(field.name, e.target.value)}
          placeholder={field.placeholder || ''}
        />
      </label>
    </div>
  ),

  select: ({ id, field, value, onChange }) => (
    <div key={field.name} className="node-field">
      <label className="node-field-label">
        <span className="node-field-label-text">{field.label}</span>
        <select
          value={value}
          onChange={(e) => onChange(field.name, e.target.value)}
        >
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  ),

  textarea: ({ id, field, value, onChange }) => (
    <div key={field.name} className="node-field">
      <label className="node-field-label">
        <span className="node-field-label-text">{field.label}</span>
        <textarea
          value={value}
          onChange={(e) => onChange(field.name, e.target.value)}
          placeholder={field.placeholder || ''}
          rows={field.rows || 3}
        />
      </label>
    </div>
  ),

  checkbox: ({ id, field, value, onChange }) => (
    <div key={field.name} className="node-field">
      <label className="node-field-label-row">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(field.name, e.target.checked)}
        />
        <span className="node-field-label-text">{field.label}</span>
      </label>
    </div>
  ),

  number: ({ id, field, value, onChange }) => (
    <div key={field.name} className="node-field">
      <label className="node-field-label">
        <span className="node-field-label-text">{field.label}</span>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(field.name, e.target.value)}
          min={field.min}
          max={field.max}
          step={field.step}
        />
      </label>
    </div>
  ),

  slider: ({ id, field, value, onChange }) => (
    <div key={field.name} className="node-field">
      <label className="node-field-label">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="node-field-label-text">{field.label}</span>
          <span className="node-field-slider-value">{value}</span>
        </div>
        <input
          type="range"
          value={value}
          onChange={(e) => onChange(field.name, parseFloat(e.target.value))}
          min={field.min ?? 0}
          max={field.max ?? 1}
          step={field.step ?? 0.1}
        />
      </label>
    </div>
  ),
};

/**
 * BaseNode — config-driven node wrapper.
 *
 * Props:
 *   id        – node id (from ReactFlow)
 *   title     – display name shown in the header
 *   icon      – optional icon string/element for header
 *   inputs    – array of { id, label?, position? } handle configs (target handles, left side)
 *   outputs   – array of { id, label?, position? } handle configs (source handles, right side)
 *   fields    – array of field configs: { name, type, label, defaultValue, options?, ... }
 *   fieldValues – current field state object { [name]: value }
 *   onFieldChange – (fieldName, value) => void
 *   children  – optional custom JSX to render inside the body
 *   className – optional extra class name
 */
export const BaseNode = ({
  id,
  title,
  icon,
  inputs = [],
  outputs = [],
  fields = [],
  fieldValues = {},
  onFieldChange = () => {},
  children,
  className = '',
}) => {
  const deleteNode = useStore((state) => state.deleteNode);

  // Distribute handles evenly along the edge
  const handleStyle = (index, total) => ({
    top: `${((index + 1) / (total + 1)) * 100}%`,
  });

  return (
    <div className={`base-node ${className}`}>
      {/* Header */}
      <div className="base-node-header">
        {icon && <span className="base-node-header-icon">{icon}</span>}
        <span style={{ flex: 1 }}>{title}</span>
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
        {/* Declarative fields */}
        {fields.map((field) => {
          const Renderer = fieldRenderers[field.type];
          if (!Renderer) return null;
          return (
            <Renderer
              key={field.name}
              id={id}
              field={field}
              value={fieldValues[field.name] ?? field.defaultValue ?? ''}
              onChange={onFieldChange}
            />
          );
        })}

        {/* Custom children */}
        {children}
      </div>

      {/* Input handles (target, left side) with labels */}
      {inputs.map((input, i) => {
        const topPos = input.position || `${((i + 1) / (inputs.length + 1)) * 100}%`;
        return (
          <div key={input.id}>
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-${input.id}`}
              style={input.position ? { top: input.position } : handleStyle(i, inputs.length)}
            />
            {input.label !== false && (
              <span
                className="handle-label handle-label-left"
                style={{ top: topPos, transform: 'translateY(-50%)' }}
              >
                {input.label || input.id}
              </span>
            )}
          </div>
        );
      })}

      {/* Output handles (source, right side) with labels */}
      {outputs.map((output, i) => {
        const topPos = output.position || `${((i + 1) / (outputs.length + 1)) * 100}%`;
        return (
          <div key={output.id}>
            <Handle
              type="source"
              position={Position.Right}
              id={`${id}-${output.id}`}
              style={output.position ? { top: output.position } : handleStyle(i, outputs.length)}
            />
            {output.label !== false && (
              <span
                className="handle-label handle-label-right"
                style={{ top: topPos, transform: 'translateY(-50%)' }}
              >
                {output.label || output.id}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
