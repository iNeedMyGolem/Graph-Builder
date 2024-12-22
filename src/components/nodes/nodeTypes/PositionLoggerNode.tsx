import type { Node, NodeProps } from "@xyflow/react"
import { Handle, Position, useReactFlow } from "@xyflow/react"

export type PositionLoggerNodeData = {
  label?: string
}

export type PositionLoggerNode = Node<PositionLoggerNodeData>

export default function PositionLoggerNode({
  positionAbsoluteX,
  positionAbsoluteY,
  data,
  id,
  selected
}: NodeProps<PositionLoggerNode>) {
  const { setNodes, setEdges } = useReactFlow()

  const handleDelete = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id))
    setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id))
  }

  const x = `${Math.round(positionAbsoluteX)}px`
  const y = `${Math.round(positionAbsoluteY)}px`

  return (
    <div className="react-flow__node-default">
      <Handle
        type="source"
        position={Position.Top}
        id={`${id}-top`}
        style={{
          top: "-5px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id={`${id}-target-top`}
        style={{
          top: "-5px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id={`${id}-bottom`}
        style={{
          bottom: "-5px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id={`${id}-target-bottom`}
        style={{
          bottom: "-5px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id={`${id}-left`}
        style={{
          top: "50%",
          left: "-5px",
          transform: "translateY(-50%)",
        }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-target-left`}
        style={{
          top: "50%",
          left: "-5px",
          transform: "translateY(-50%)",
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-right`}
        style={{
          top: "50%",
          right: "-5px",
          transform: "translateY(-50%)",
        }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id={`${id}-target-right`}
        style={{
          top: "50%",
          right: "-5px",
          transform: "translateY(-50%)",
        }}
      />
      {data.label && <div>{data.label}</div>}
      <div>
        {x} {y}
      </div>
      {selected && (
        <button
          style={{
            position: "absolute",
            top: "-15px",
            right: "-15px",
            background: "red",
            border: "none",
            color: "white",
            fontSize: "12px",
            cursor: "pointer",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            zIndex: 10,
          }}
          onClick={(e) => {
            e.stopPropagation()
            handleDelete()
          }}
        >
          X
        </button>
      )}
    </div>
  )
}
