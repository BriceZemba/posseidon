
import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Circle, Rect, Line, Point, Path } from "fabric";
import { toast } from "sonner";

interface CanvasProps {
  activeColor: string;
  activeTool: 'select' | 'draw' | 'rectangle' | 'circle' | 'arrow';
  brushSize: number;
}

export const Canvas = ({ activeColor, activeTool, brushSize }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [isDrawingArrow, setIsDrawingArrow] = useState(false);
  const [arrowStart, setArrowStart] = useState<Point | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: window.innerWidth - 48,
      height: window.innerHeight - 200,
      backgroundColor: "#ffffff",
    });

    canvas.freeDrawingBrush.color = activeColor;
    canvas.freeDrawingBrush.width = brushSize;

    setFabricCanvas(canvas);
    toast("Canvas ready! Start creating!");

    const handleResize = () => {
      canvas.setDimensions({
        width: window.innerWidth - 48,
        height: window.innerHeight - 200,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = activeTool === "draw";
    
    if (activeTool === "draw" && fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = activeColor;
      fabricCanvas.freeDrawingBrush.width = brushSize;
    }

    // Handle shape creation
    if (activeTool === "rectangle") {
      const rect = new Rect({
        left: 100,
        top: 100,
        fill: activeColor,
        width: 100,
        height: 100,
        stroke: activeColor,
        strokeWidth: 2,
      });
      fabricCanvas.add(rect);
      fabricCanvas.setActiveObject(rect);
    } else if (activeTool === "circle") {
      const circle = new Circle({
        left: 100,
        top: 100,
        fill: 'transparent',
        radius: 50,
        stroke: activeColor,
        strokeWidth: 2,
      });
      fabricCanvas.add(circle);
      fabricCanvas.setActiveObject(circle);
    }
  }, [activeTool, activeColor, brushSize, fabricCanvas]);

  // Arrow drawing functionality
  useEffect(() => {
    if (!fabricCanvas) return;

    const handleMouseDown = (e: any) => {
      if (activeTool === 'arrow' && e.e) {
        const pointer = fabricCanvas.getPointer(e.e);
        setArrowStart(new Point(pointer.x, pointer.y));
        setIsDrawingArrow(true);
      }
    };

    const handleMouseUp = (e: any) => {
      if (activeTool === 'arrow' && isDrawingArrow && arrowStart && e.e) {
        const pointer = fabricCanvas.getPointer(e.e);
        const arrowEnd = new Point(pointer.x, pointer.y);
        
        // Create arrow line
        const line = new Line([arrowStart.x, arrowStart.y, arrowEnd.x, arrowEnd.y], {
          stroke: activeColor,
          strokeWidth: brushSize,
          originX: 'center',
          originY: 'center',
        });

        // Calculate arrow head
        const angle = Math.atan2(arrowEnd.y - arrowStart.y, arrowEnd.x - arrowStart.x);
        const headLength = 20;
        
        const arrowHead1 = new Line([
          arrowEnd.x,
          arrowEnd.y,
          arrowEnd.x - headLength * Math.cos(angle - Math.PI / 6),
          arrowEnd.y - headLength * Math.sin(angle - Math.PI / 6)
        ], {
          stroke: activeColor,
          strokeWidth: brushSize,
        });

        const arrowHead2 = new Line([
          arrowEnd.x,
          arrowEnd.y,
          arrowEnd.x - headLength * Math.cos(angle + Math.PI / 6),
          arrowEnd.y - headLength * Math.sin(angle + Math.PI / 6)
        ], {
          stroke: activeColor,
          strokeWidth: brushSize,
        });

        fabricCanvas.add(line);
        fabricCanvas.add(arrowHead1);
        fabricCanvas.add(arrowHead2);
        
        setIsDrawingArrow(false);
        setArrowStart(null);
      }
    };

    if (activeTool === 'arrow') {
      fabricCanvas.on('mouse:down', handleMouseDown);
      fabricCanvas.on('mouse:up', handleMouseUp);
    }

    return () => {
      fabricCanvas.off('mouse:down', handleMouseDown);
      fabricCanvas.off('mouse:up', handleMouseUp);
    };
  }, [activeTool, fabricCanvas, isDrawingArrow, arrowStart, activeColor, brushSize]);

  return (
    <div className="flex justify-center">
      <div className="border border-neutral-700 rounded-lg shadow-lg overflow-hidden bg-white">
        <canvas ref={canvasRef} className="max-w-full" />
      </div>
    </div>
  );
};
