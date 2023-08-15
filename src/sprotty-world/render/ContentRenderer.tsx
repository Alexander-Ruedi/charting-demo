/** @jsxRuntime classic */
/** @jsx svg */
import {svg} from "sprotty/lib/lib/jsx";
/*******************************************************************************
 * Copyright (c) 2017 TypeFox GmbH (http://www.typefox.io) and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
import * as snabbdom from "snabbdom-jsx";
import {injectable} from "inversify";
// @ts-ignore
import {VNode} from "snabbdom/vnode";
import {
    angleOfPoint,
    CircularNodeView,
    IView,
    Point,
    PolylineEdgeView,
    RectangularNodeView,
    RenderingContext,
    SEdge,
    SLabel,
    toDegrees,
} from "sprotty";
import {ElkJunction, ElkNode, ElkPort} from "../helper/FeatureExtension";
import {getNodeInfo} from "../sample-data/model-source";

const JSX = { createElement: snabbdom.svg };

@injectable()
export class ElkNodeView extends RectangularNodeView {
  render(node: ElkNode, context: RenderingContext): VNode {
    console.log("has my node the info?", node);
    const nodeInfos = getNodeInfo(node.id);
    return (
      <g>
        <rect
          class-elknode={true}
          class-mouseover={node.hoverFeedback}
          class-selected={node.selected}
          x="0"
          y="0"
          rx="5px"
          ry="6px"
          width={node.bounds.width}
          height={node.bounds.height}
        ></rect>
        <text x="100" y="40" className="node-label-text">
          {nodeInfos?.name}
        </text>
        <text x="30" y="80" className="node-label-left">
          Incoming:
        </text>
        <text x="170" y="80" className="node-label-right">
          {nodeInfos?.incoming}
        </text>
        <text x="30" y="100" className="node-label-left">
          Outgoing:
        </text>
        <text x="170" y="100" className="node-label-right">
          {nodeInfos?.outgoing}
        </text>

        <line
          x1="0"
          y1="115"
          x2="200"
          y2="115"
          stroke="#9ca3af"
          stroke-width="1"
        />

        <text x="30" y="140" className="node-label-left">
          Sales:
        </text>
        <text x="170" y="140" className="node-label-right">
          {nodeInfos?.sales}
        </text>
        <text x="30" y="160" className="node-label-left">
          COGs:
        </text>
        <text x="170" y="160" className="node-label-right">
          {nodeInfos?.cogs}
        </text>
        <text x="30" y="180" className="node-label-left">
          Qty:
        </text>
        <text x="170" y="180" className="node-label-right">
          {nodeInfos?.qty}
        </text>
        {context.renderChildren(node)}
      </g>
    );
  }
}

@injectable()
export class ElkPortView extends RectangularNodeView {
  render(port: ElkPort, context: RenderingContext): VNode {
    return (
      <g>
        <rect
          class-elkport={true}
          class-mouseover={port.hoverFeedback}
          class-selected={port.selected}
          x="0"
          y="0"
          width={port.bounds.width}
          height={port.bounds.height}
        ></rect>
        {context.renderChildren(port)}
      </g>
    );
  }
}

@injectable()
export class ElkEdgeView extends PolylineEdgeView {
  protected renderLine(
    edge: SEdge,
    segments: Point[],
    context: RenderingContext
  ): VNode {
    const firstPoint = segments[0];
    let path = `M ${firstPoint.x},${firstPoint.y}`;
    for (let i = 1; i < segments.length; i++) {
      const p = segments[i];
      path += ` L ${p.x},${p.y}`;
    }
    return <path class-elkedge={true} d={path} />;
  }

  protected renderAdditionals(
    edge: SEdge,
    segments: Point[],
    context: RenderingContext
  ): VNode[] {
    const p1 = segments[segments.length - 2];
    const p2 = segments[segments.length - 1];
    return [
      <path
        class-elkedge={true}
        class-arrow={true}
        d="M 0,0 L 8,-3 L 8,3 Z"
        transform={`rotate(${toDegrees(
          angleOfPoint({
            x: p1.x - p2.x,
            y: p1.y - p2.y,
          })
        )} ${p2.x} ${p2.y}) translate(${p2.x} ${p2.y})`}
      />,
    ];
  }
}

@injectable()
export class ElkLabelView implements IView {
  render(label: SLabel, context: RenderingContext): VNode {
    return <text class-elklabel={true}>{label.text}</text>;
  }
}

@injectable()
export class JunctionView extends CircularNodeView {
  render(node: ElkJunction, context: RenderingContext): VNode {
    const radius = this.getRadius(node);
    return (
      <g>
        <circle class-elkjunction={true} r={radius}></circle>
      </g>
    );
  }

  protected getRadius(node: ElkJunction): number {
    return 2;
  }
}
