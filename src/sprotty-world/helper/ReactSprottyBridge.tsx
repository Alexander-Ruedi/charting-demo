/** @jsxRuntime classic */
/** @jsx svg */
import {svg} from "sprotty/lib/lib/jsx";
import {LocalModelSource, TYPES} from "sprotty";
import {createContainer} from "./ContainerCreator";
import {ElkGraphJsonToSprotty} from "../render/ElkToSprotty";
import ELK from "elkjs";

export default function run(graph: any) {
  const container = createContainer("sprotty-container");
  const modelSource = container.get<LocalModelSource>(TYPES.ModelSource);
  const elkLayout = new ELK();
  elkLayout
    .layout(graph, {
      layoutOptions: { "elk.direction": "DOWN", "elk.alignment": "CENTER" },
    })
    .then((a) => {
      let sGraph = new ElkGraphJsonToSprotty().transform(graph);
      modelSource.setModel(sGraph);
    });
}
