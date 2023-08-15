export const graphData: any = {
  id: "root",
  layoutOptions: { algorithm: "layered" },
  children: [
    { id: "n1", width: 200, height: 200 },
    { id: "n2", width: 200, height: 200 },
    { id: "n3", width: 200, height: 200 },
    { id: "n4", width: 200, height: 200 },
  ],
  edges: [
    { id: "e1", sources: ["n1"], targets: ["n2"] },
    { id: "e2", sources: ["n1"], targets: ["n3"] },
    { id: "e3", sources: ["n1"], targets: ["n4"] },
    { id: "e4", sources: ["n4"], targets: ["n1"] },
    { id: "e5", sources: ["n4"], targets: ["n3"] },
  ],
};

export interface NodeInfo {
  companyId: string;
  name: string;
  incoming: number;
  outgoing: number;
  cogs: number;
  qty: number;
  sales: number;
}

export const nodeInfos: NodeInfo[] = [
  {
    companyId: "n1",
    name: "0001-DE01",
    incoming: 1000,
    outgoing: 1500,
    cogs: 800,
    qty: 50,
    sales: 50,
  },
  {
    companyId: "n2",
    name: "0002-DE02",
    incoming: 2000,
    outgoing: 1000,
    cogs: 1000,
    qty: 10,
    sales: 50,
  },
  {
    companyId: "n3",
    name: "0003-DE03",
    incoming: 2000,
    outgoing: 1000,
    cogs: 1000,
    qty: 10,
    sales: 50,
  },
  {
    companyId: "n4",
    name: "0004-DE04",
    incoming: 2000,
    outgoing: 1000,
    cogs: 1000,
    qty: 10,
    sales: 50,
  },
];

export const getNodeInfo = (companyId: string) =>
  nodeInfos.find((nodeInfo) => nodeInfo.companyId === companyId);
