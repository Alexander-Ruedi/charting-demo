/** @jsxRuntime classic */
/** @jsx svg */
import { svg } from 'sprotty/lib/lib/jsx';
import { injectable } from "inversify";
import {IView, LocalModelSource, RenderingContext, SNode, TYPES} from "sprotty";
import {graph} from "./model-source";
import {jsx, VNode} from "snabbdom";
import {TaskNode} from "../react-world/Sprotty/SprottyComponent";
import {createContainer} from "./ContainerCreator";

@injectable()
export class TaskNodeView implements IView {
  render(node: Readonly<SNode & TaskNode>, context: RenderingContext): any {
    const position = 50;
    return (
      <g>
        <rect
          class-sprotty-node={true}
          class-task={true}
          class-running={node.isRunning}
          class-finished={node.isFinished}
          width={node.size.width}
          height={node.size.height}
        />
        <text x={position} y={position + 5}>
          {node.name}
        </text>
      </g>
    );
  }
}


export default function run() {
    const container = createContainer("sprotty-container");
    const modelSource = container.get<LocalModelSource>(TYPES.ModelSource);
    modelSource.setModel(graph);
}