import type { BuiltInNode, Node, NodeTypes } from "@xyflow/react"
import PositionLoggerNode, {
  type PositionLoggerNode as PositionLoggerNodeType,
} from "./nodeTypes/PositionLoggerNode"
import RectangleNode, {
  type RectangleNode as RectangleNodeType
} from "./nodeTypes/RectangleNode"
import CircleNode, {
  type CircleNode as CircleNodeType
} from "./nodeTypes/CircleNode"

export const initialNodes = [
  { id: "a", type: "rectangle-node", position: { x: 0, y: 0 }, data: { label: "Starting Node" } },
] satisfies Node[]

export const nodeTypes = {
  "position-logger-node": PositionLoggerNode,
  "rectangle-node": RectangleNode,
  "circle-node": CircleNode
} satisfies NodeTypes

export type CustomNodeType = BuiltInNode | PositionLoggerNodeType | RectangleNodeType | CircleNodeType
