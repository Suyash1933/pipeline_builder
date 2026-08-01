// draggableNode.js

export const DraggableNode = ({ type, label, icon, accent }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType };
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    return (
      <div
        className={`draggable-node ${accent ? `draggable-${accent}` : ''}`}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
      >
        {icon && <span className="draggable-node-icon">{icon}</span>}
        <span>{label}</span>
      </div>
    );
};
