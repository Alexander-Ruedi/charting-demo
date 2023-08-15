
import "reflect-metadata";
import { Container, ContainerModule } from "inversify";
import {
  configureModelElement,
  configureViewerOptions,
  loadDefaultModules,
  LocalModelSource,
  PolylineEdgeView,
  SEdge,
  SGraph, SGraphFactory,
  SGraphView, SLabel,
  SNode,
  TYPES,
} from "sprotty";
import {ElkEdge, ElkJunction, ElkNode, ElkPort} from "./helper/sprotty-model";
import {ElkEdgeView, ElkLabelView, ElkNodeView, ElkPortView, JunctionView} from "./helper/views";

export const createContainer = (containerId: string) => {
  const myModule = new ContainerModule((bind, unbind, isBound, rebind) => {
    bind(TYPES.ModelSource).to(LocalModelSource).inSingletonScope();

    const context = { bind, unbind, isBound, rebind } as any;

    configureModelElement(context, 'graph', SGraph, SGraphView);
    configureModelElement(context, 'node', ElkNode, ElkNodeView);
    configureModelElement(context, 'port', ElkPort, ElkPortView);
    configureModelElement(context, 'edge', ElkEdge, ElkEdgeView);
    configureModelElement(context, 'label', SLabel, ElkLabelView);
    configureModelElement(context, 'junction', ElkJunction, JunctionView);


    configureViewerOptions(context, {
      needsClientLayout: false,
      needsServerLayout: false,
      baseDiv: containerId,
    });
  });

  const container = new Container();
  loadDefaultModules(container as any);
  container.load(myModule);
  return container;
};
