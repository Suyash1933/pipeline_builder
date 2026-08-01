// submit.js

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
            const response = await fetch(`${backendUrl}/pipelines/parse`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setResult(null);
        setError(null);
    };

    return (
        <>
            <div className="submit-bar">
                <span className="submit-node-count">
                    <strong>{nodes.length}</strong> node{nodes.length !== 1 ? 's' : ''}
                    {' \u00B7 '}
                    <strong>{edges.length}</strong> edge{edges.length !== 1 ? 's' : ''}
                </span>
                <span className="submit-hint">
                    <kbd>Delete</kbd> to remove selected
                </span>
                <button
                    className="submit-btn"
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Analyzing\u2026' : 'Submit Pipeline'}
                </button>
            </div>

            {/* Result Modal */}
            {(result || error) && (
                <div className="result-overlay" onClick={closeModal}>
                    <div className="result-overlay-backdrop" />
                    <div className="result-modal" onClick={(e) => e.stopPropagation()}>
                        {error ? (
                            <>
                                <div className="result-modal-title">
                                    <span className="result-modal-title-icon error">!</span>
                                    Error
                                </div>
                                <div className="result-stats">
                                    <div className="result-stat">
                                        <span className="result-stat-label">{error}</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="result-modal-title">
                                    <span className="result-modal-title-icon success">{'\u2713'}</span>
                                    Pipeline Analysis
                                </div>
                                <div className="result-stats">
                                    <div className="result-stat">
                                        <span className="result-stat-label">Nodes</span>
                                        <span className="result-stat-value">{result.num_nodes}</span>
                                    </div>
                                    <div className="result-stat">
                                        <span className="result-stat-label">Edges</span>
                                        <span className="result-stat-value">{result.num_edges}</span>
                                    </div>
                                    <div className="result-stat">
                                        <span className="result-stat-label">Valid DAG</span>
                                        <span className={`result-stat-badge ${result.is_dag ? 'yes' : 'no'}`}>
                                            {result.is_dag ? '\u2713 Yes' : '\u2717 No'}
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}
                        <button className="result-modal-close" onClick={closeModal}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
