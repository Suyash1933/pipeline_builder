// useNodeFields.js
// Tiny hook that manages field state for any node built with BaseNode.

import { useState, useCallback } from 'react';

/**
 * @param {Array} fields – field config array (each has { name, defaultValue })
 * @param {Object} data  – initial data passed by ReactFlow
 * @returns {{ fieldValues, onFieldChange }}
 */
export const useNodeFields = (fields, data = {}) => {
  const [fieldValues, setFieldValues] = useState(() => {
    const init = {};
    fields.forEach((f) => {
      init[f.name] = data[f.name] ?? f.defaultValue ?? '';
    });
    return init;
  });

  const onFieldChange = useCallback((name, value) => {
    setFieldValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  return { fieldValues, onFieldChange };
};
