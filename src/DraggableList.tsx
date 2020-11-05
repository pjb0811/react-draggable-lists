import * as React from "react";
import { useState, ReactNode } from "react";
import { Motion, spring } from "react-motion";
import { generateChildren, clamp, reinsert } from "./utils";

type DraggableListProps = {
  rowSize: number;
  width: number;
  height: number;
  children: ReactNode;
};

interface State {
  rowSize: number;
  width: number;
  height: number;
  count: number;
  mouseXY: number[];
  mouseDelta: number[];
  lastPress: number;
  isMoved: boolean;
  isPressed: boolean;
  itemsOrder: number[];
}

export default function DraggableList({
  rowSize = 3,
  width,
  height,
  children,
}: DraggableListProps) {
  const newChildren = generateChildren(children);
  const count = newChildren.length;
  const [state, setState] = useState<State>({
    rowSize,
    width,
    height,
    count,
    mouseXY: [0, 0],
    mouseDelta: [0, 0],
    lastPress: 0,
    isMoved: false,
    isPressed: false,
    itemsOrder: [...Array(count)].map((_, i) => i),
  });

  // TODO: add new item to itemOrder
  // React.useEffect(() => {
  //   if (count > state.itemsOrder.length) {
  //     setState((x) => ({ ...x, itemsOrder: [...x.itemsOrder, count - 1] }));
  //   }
  // }, [count]);

  const handleMouseDown = (params: {
    key: number;
    pressLocation: [number, number];
    e: any;
  }) => {
    const { key, pressLocation, e } = params;
    const [pressX, pressY] = pressLocation;
    const { pageX, pageY } = e;
    setState((x) => ({
      ...x,
      lastPress: key,
      isPressed: true,
      isMoved: false,
      mouseDelta: [pageX - pressX, pageY - pressY],
      mouseXY: [pressX, pressY],
    }));
    e.preventDefault();
  };

  const handleClick = (e: any) => {
    if (state.isMoved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleItemMove = (e: { pageX: number; pageY: number }) => {
    const { pageX, pageY } = e;
    const {
      width,
      height,
      count,
      itemsOrder,
      rowSize,
      lastPress,
      isPressed,
      mouseDelta: [dx, dy],
    } = state;

    if (isPressed) {
      const mouseXY = [pageX - dx, pageY - dy];
      const col = clamp({
        n: Math.floor(mouseXY[0] / width),
        min: 0,
        max: rowSize - 1,
      });
      const row = clamp({
        n: Math.floor(mouseXY[1] / height),
        min: 0,
        max: Math.floor(count / rowSize),
      });
      const index = row * rowSize + col;
      const newItemsOrder = reinsert({
        arr: itemsOrder,
        from: itemsOrder.indexOf(lastPress),
        to: index,
      });

      setState((x) => ({
        ...x,
        mouseXY,
        isMoved: Math.abs(mouseXY[0]) > 10 || Math.abs(mouseXY[1]) > 10,
        itemsOrder: newItemsOrder,
      }));
    }
  };

  const handleMouseUp = () => {
    setState((x) => ({
      ...x,
      isPressed: false,
      mouseDelta: [0, 0],
    }));
  };

  const getLayout = () => {
    const { count, width, height, rowSize } = state;
    return [...Array(count)].map((_, n) => {
      const row = Math.floor(n / rowSize);
      const col = n % rowSize;
      return [width * col, height * row];
    });
  };
  console.log("order", state.itemsOrder);
  return (
    <div style={{ height: height * Math.ceil(count / rowSize) }}>
      {state.itemsOrder.map((_, key) => {
        let style;
        let x: number;
        let y: number;
        const visualPosition = state.itemsOrder.indexOf(key);
        if (key === state.lastPress && state.isPressed) {
          [x, y] = state.mouseXY;
          style = {
            translateX: x,
            translateY: y,
            scale: spring(1.2),
          };
        } else {
          [x, y] = getLayout()[visualPosition];
          style = {
            translateX: spring(x),
            translateY: spring(y),
            scale: spring(1),
          };
        }
        return (
          <Motion key={key} style={style}>
            {({ translateX, translateY, scale }) => (
              <div
                onMouseDown={(e) =>
                  handleMouseDown({ key, pressLocation: [x, y], e })
                }
                onClickCapture={(e) => handleClick(e)}
                onMouseMove={(e) => handleItemMove(e)}
                onMouseUp={() => handleMouseUp()}
                style={{
                  position: "absolute",
                  width,
                  height,
                  transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                  zIndex: key === state.lastPress ? 99 : visualPosition,
                }}
              >
                {newChildren[key]}
              </div>
            )}
          </Motion>
        );
      })}
    </div>
  );
}
