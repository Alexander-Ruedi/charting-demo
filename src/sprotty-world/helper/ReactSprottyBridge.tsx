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

    elkLayout.knownLayoutAlgorithms().then((data) => console.log("algo", data));
    elkLayout.knownLayoutOptions().then((data) => console.log("knownLayoutOptions", data));
    elkLayout.knownLayoutCategories().then((data) => console.log("knownLayoutCategories", data));

    elkLayout
        .layout(graph, {
            layoutOptions: {
                "elk.direction": "DOWN",
                "elk.spacing.nodeNode": "100",
            },
        })
        .then((a) => {
            let sGraph = new ElkGraphJsonToSprotty().transform(graph);
            modelSource.setModel(sGraph);
        });
}
