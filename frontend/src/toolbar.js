// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div className="toolbar">
            <div className="toolbar-title">Pipeline Builder</div>
            <div className="toolbar-divider" />
            <div className="toolbar-nodes">
                <div className="toolbar-group">
                    <span className="toolbar-group-label">I/O</span>
                    <div className="toolbar-group-items">
                        <DraggableNode type='customInput' label='Input' icon='&#8594;' accent='input' />
                        <DraggableNode type='customOutput' label='Output' icon='&#8592;' accent='output' />
                    </div>
                </div>
                <div className="toolbar-group-divider" />
                <div className="toolbar-group">
                    <span className="toolbar-group-label">Processing</span>
                    <div className="toolbar-group-items">
                        <DraggableNode type='llm' label='LLM' icon='&#9672;' accent='llm' />
                        <DraggableNode type='text' label='Text' icon='T' accent='text' />
                        <DraggableNode type='api' label='API Call' icon='&#8644;' accent='api' />
                        <DraggableNode type='filter' label='Filter' icon='&#9700;' accent='filter' />
                    </div>
                </div>
                <div className="toolbar-group-divider" />
                <div className="toolbar-group">
                    <span className="toolbar-group-label">Config</span>
                    <div className="toolbar-group-items">
                        <DraggableNode type='timer' label='Timer' icon='&#9201;' accent='timer' />
                        <DraggableNode type='temperature' label='LLM Config' icon='&#9881;' accent='config' />
                        <DraggableNode type='merge' label='Merge' icon='&#8651;' accent='merge' />
                    </div>
                </div>
            </div>
        </div>
    );
};
