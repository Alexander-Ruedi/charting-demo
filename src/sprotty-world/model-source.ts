import { SEdge, SGraph, SNode } from "sprotty-protocol";
import {TaskNode} from "../react-world/Sprotty/SprottyComponent";


export const graphData: any = {
  id: "root",
  layoutOptions: { 'algorithm': 'layered' },
  children: [
    { id: "n1", width: 30, height: 30 },
    { id: "n2", width: 30, height: 30 },
    { id: "n3", width: 30, height: 30 },
    { id: "n4", width: 30, height: 30 }
  ],
  edges: [
    { id: "e1", sources: [ "n1" ], targets: [ "n2" ] },
    { id: "e2", sources: [ "n1" ], targets: [ "n3" ] },
    { id: "e3", sources: [ "n1" ], targets: [ "n4" ] }
  ]
};
