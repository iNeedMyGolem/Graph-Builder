import type { Edge, EdgeTypes } from "@xyflow/react"
import DeleteableEdge, { type DeleteableEdge as DeleteableEdgeType } from "./DeleteableEdge"

export const initialEdges = [] satisfies Edge[]

export const edgeTypes = {
  "deleteable-edge": DeleteableEdge,
} satisfies EdgeTypes

export type CustomEdgeType = DeleteableEdgeType
