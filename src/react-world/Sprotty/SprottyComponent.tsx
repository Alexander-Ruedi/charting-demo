import "../../sprotty-world/style.css";
import { SNode } from "sprotty-protocol";
import "reflect-metadata";
import { useEffect } from "react";
import run from "../../sprotty-world/TasknodeView";


import './container-style.css'
export interface TaskNode extends SNode {
  name: string;
  isRunning: boolean;
  isFinished: boolean;
}
export const SprottyComponent = () => {
  useEffect(() => {
    run();
  }, []);

  return <div id="sprotty-container"/>;
};
