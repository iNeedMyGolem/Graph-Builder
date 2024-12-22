import { useCallback, useState } from "react"
import {
  Background,
  Controls,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
  MiniMap,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

import { initialNodes, nodeTypes, type CustomNodeType } from "./nodes"
import { initialEdges, edgeTypes, type CustomEdgeType } from "./edges"

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNodeType>(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState<CustomEdgeType>(initialEdges)
  const [newNodeType, setNewNodeType] = useState("rectangle")
  const [error, setError] = useState<string | null>(null)
  const [newNodeLabel, setNewNodeLabel] = useState("")
  const scaleFactor = 2

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  )

  const getNewNodePosition = () => {
    const maxX = Math.max(...nodes.map((node) => node.position.x), 0)
    const maxY = Math.max(...nodes.map((node) => node.position.y), 0)
    return {
      x: maxX + 100,
      y: maxY + 100,
    }
  }

  const addNode = () => {
    if (!newNodeLabel) {
      setError("Node label cannot be empty")
      return
    }

    if (newNodeLabel.length > 12) {
      setError("Node label must be 12 characters or less.")
      return;
    }
  
    const nodeId = `${newNodeType}-node-${nodes.length + 1}`
    const newNode: CustomNodeType = {
      id: nodeId,
      type:
        newNodeType === "rectangle"
          ? "rectangle-node"
          : newNodeType === "circle"
          ? "circle-node"
          : "position-logger-node",
      data: { label: newNodeLabel },
      position: getNewNodePosition(),
    }
  
    setNodes((prevNodes) => [...prevNodes, newNode])
    setNewNodeLabel("")
    setError(null)
  }
  const handleConnect = (params: any) => {
    if (params.source === params.target) {
      console.log("Cannot create an edge to the same node.");
      return;
    }
  
    // Add the edge if valid
    setEdges((eds) => addEdge({ ...params, type: "deleteable-edge" }, eds));
    console.log(edges);
  };


  const handleNodeTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewNodeType(e.target.value)
  }

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>, nodeId: string) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === nodeId ? { ...node, data: { label: e.target.value } } : node
      )
    )
  }

  const deleteNode = (nodeId: string) => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId))
    setEdges((prevEdges) => prevEdges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId))
  }

  const deleteEdge = (edgeId: string) => {
    setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== edgeId))
  }

  const nodeListData = nodes.map((node) => ({
    id: node.id,
    type: node.type,
    label: node.data.label,
    position: node.position,
    selected: node.selected,
  }))

  const edgeListData = edges.map((edge) => {
    const sourceNode = nodes.find((node) => node.id === edge.source)
    const targetNode = nodes.find((node) => node.id === edge.target)

    return {
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceLabel: sourceNode?.data.label || edge.source,
      targetLabel: targetNode?.data.label || edge.target,
      label: edge.label || "",
    }
  })

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          width: "300px",
          backgroundColor: "#f4f4f4",
          padding: "20px",
          borderRight: "1px solid #ddd",
          overflowY: "auto",
        }}
      >
        <h3>Add Node</h3>
        <select style={{marginBottom: '8px'}} onChange={handleNodeTypeChange} value={newNodeType}>
          <option value="rectangle">Rectangle</option>
          <option value="circle">Circle</option>
          <option value="position-logger">Position Logger</option>
        </select>
        <input
          type="text"
          placeholder="Node Label"
          value={newNodeLabel}
          onChange={(e) => {
            setNewNodeLabel(e.target.value)
            setError(null)
          }}
          style={{
            padding: "5px",
            borderColor: error ? "red" : "#ccc", 
            borderWidth: "2px",
          }}
        />
        <button onClick={addNode} style={{ marginLeft: "10px" }}>
          Add Node
        </button>
        {error && <div style={{ color: "red", marginTop: "5px" }}>{error}</div>}
        <h3 style={{ marginTop: "20px" }}>Node List</h3>
        <ul style={{ paddingLeft: "0", listStyleType: "none" }}>
          {nodeListData.map((node) => (
            <li key={node.id} style={{ 
              marginBottom: "10px",
              border: node.selected ? "2px solid blue" : "",
              backgroundColor: node.selected ? "#e0f7fa" : "transparent",
              }}>
              <strong>{node.label}</strong> ( ID: {node.id} )
              <div style={{ marginTop: "5px" }}>
                <input
                  type="text"
                  value={node.label}
                  onChange={(e) => handleLabelChange(e, node.id)}
                  style={{ 
                    marginRight: "10px", 
                    padding: "5px",
                  }}
                />
                <button onClick={() => deleteNode(node.id)}>Delete</button>
                <div style={{ marginTop: "5px", fontSize: "smaller", color: "#888" }}>
                  Type: {node.type}
                </div>
                <div style={{ marginTop: "5px", fontSize: "smaller", color: "#888" }}>
                  Position: x: {node.position.x.toFixed(2)} px, y: {node.position.y.toFixed(2)} px
                </div>
              </div>
            </li>
          ))}
        </ul>

        <h3 style={{ marginTop: "20px" }}>Edge List</h3>
        <ul style={{ paddingLeft: "0", listStyleType: "none" }}>
          {edgeListData.map((edge) => (
            <li key={edge.id} style={{ marginBottom: "10px" }}>
              <strong>
                {edge.targetLabel} → {edge.sourceLabel} 
              </strong>
              <button style={{marginLeft: '10px'}} onClick={() => deleteEdge(edge.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ flex: 1 }}>
        <ReactFlow<CustomNodeType, CustomEdgeType>
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          edges={edges}
          edgeTypes={edgeTypes}
          onEdgesChange={onEdgesChange}
          onConnect={handleConnect}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  )
}
