import { useContext, useEffect, useRef, useState } from "react";
import { LoggersDispatchContext } from "../context/LoggersContext";
import { v4 as uuidv4 } from "uuid";  // Используем uuid для генерации уникальных id

interface Coordinate {
  x: number | null;
  y: number | null;
}

interface CoordinateLoggerProps {
  children: React.ReactNode;
}

function CoordinateLogger({ children }: CoordinateLoggerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<Coordinate>({ x: null, y: null });
  const dispatch = useContext(LoggersDispatchContext);
  const id = useRef<string>(uuidv4()); // Генерируем уникальный ID

  useEffect(() => {
    const loggerId = id.current;

    if (containerRef.current) {
      const childElements = Array.from(containerRef.current.children) as HTMLElement[]; // Явно указываем тип элементов
      const setx = new Set<number>(),
        sety = new Set<number>();
        
      childElements.forEach((child) => {
        if (child.style.display !== "none") {
          const rect = child.getBoundingClientRect();
          setx.add(rect.left);
          setx.add(rect.right);
          sety.add(rect.top);
          sety.add(rect.bottom);
        }
      });

      const arrx = Array.from(setx),
        arry = Array.from(sety);

      if (arrx.length > 1 && arry.length > 1) {
        const resultPos = {
          x: (arrx[arrx.length - 1] - arrx[0]) / 2,
          y: (arry[arry.length - 1] - arry[0]) / 2,
        };

        if (pos.x !== resultPos.x || pos.y !== resultPos.y) {
          setPos(resultPos);
          if (dispatch) {
            dispatch({
              type: "ADD_LOGGER",
              payload: { id: loggerId, center: resultPos },
            });
          }
        }
      }
    }
  }, [dispatch, children, pos]);

  useEffect(() => {
    const loggerId = id.current;
    return () => {
      if (dispatch) {
        dispatch({
          type: "REMOVE_LOGGER",
          payload: { id: loggerId },
        });
      }
    };
  }, [dispatch]);

  return (
    <>
      {pos.x !== null && pos.y !== null && (
        <div
          style={{
            position: "relative",
            top: `${pos.y}px`,
            left: `${pos.x}px`,
            width: "20px",
            height: "20px",
            backgroundColor: "red",
          }}
        ></div>
      )}
      <div ref={containerRef}>{children}</div>
    </>
  );
}

export default CoordinateLogger;