/** @jsxRuntime classic */
/** @jsx svg */
import { svg } from 'sprotty/lib/lib/jsx';
import { injectable } from "inversify";
import {IView, LocalModelSource, RenderingContext, SNode, TYPES} from "sprotty";
import {TaskNode} from "../react-world/Sprotty/SprottyComponent";
import {createContainer} from "./ContainerCreator";
import {ElkGraphJsonToSprotty} from "./helper/elkgraph-to-sprotty";
import ELK from "elkjs"

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


export default function run(graph: any) {
    const container = createContainer("sprotty-container");
    const modelSource = container.get<LocalModelSource>(TYPES.ModelSource);
    const elkLayout = new ELK();
    elkLayout.layout(graph).then((a) => {
        let sGraph = new ElkGraphJsonToSprotty().transform(graph);
        modelSource.setModel(sGraph);
    })
}