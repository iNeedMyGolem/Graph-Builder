import {
    BaseEdge,
    EdgeLabelRenderer,
    getBezierPath,
    useReactFlow,
    type EdgeProps,
    type Edge,
  } from "@xyflow/react"
  import { useState } from "react"
  
  const buttonStyle = {
    width: 20,
    height: 20,
    background: "#eee",
    border: "1px solid #fff",
    cursor: "pointer",
    borderRadius: "50%",
    fontSize: "12px",
    lineHeight: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
  
  type DeleteableEdgeData = {}
  
  export type DeleteableEdge = Edge<DeleteableEdgeData>
  
  export default function DeleteableEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    selected,
  }: EdgeProps<DeleteableEdge>) {
    const { setEdges } = useReactFlow()
    const [edgePath, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    })
  
    const [showDeleteButton, setShowDeleteButton] = useState(false)
  
    const onEdgeClick = (e: React.MouseEvent) => {
      e.stopPropagation()
      setShowDeleteButton(true)
    }
  
    const deleteEdge = () => {
      setEdges((edges) => edges.filter((edge) => edge.id !== id))
      setShowDeleteButton(false)
    }
  
    return (
      <>
        <BaseEdge
          path={edgePath}
          style={{ pointerEvents: "all" }}
          onClick={onEdgeClick}
          interactionWidth={20}
        />
        <EdgeLabelRenderer>
          {(selected || showDeleteButton) && (
            <div
              style={{
                position: "absolute",
                transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                pointerEvents: "all",
                zIndex: 10,
              }}
              className="nodrag nopan"
            >
              <button
                style={buttonStyle}
                onClick={deleteEdge}
                onMouseDown={(e) => e.stopPropagation()}
              >
                ×
              </button>
            </div>
          )}
        </EdgeLabelRenderer>
      </>
    )
  }
  