
import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Circle, Rect, PencilBrush } from "fabric";
import { toast } from "sonner";

interface CanvasProps {
  activeTool: "select" | "draw" | "rectangle" | "circle";
  activeColor: string;
  whiteboardId?: string;
  initialData?: any;
  onDataChange?: (data: any) => void;
}

export const Canvas = ({ activeTool, activeColor, whiteboardId, initialData, onDataChange }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#ffffff",
    });

    // Initialize the freeDrawingBrush
    canvas.freeDrawingBrush = new PencilBrush(canvas);
    canvas.freeDrawingBrush.color = activeColor;
    canvas.freeDrawingBrush.width = 2;

    // Set up event listeners for real-time collaboration
    canvas.on('path:created', () => {
      if (onDataChange && isInitialized) {
        const canvasData = canvas.toJSON();
        onDataChange(canvasData);
      }
    });

    canvas.on('object:added', () => {
      if (onDataChange && isInitialized) {
        const canvasData = canvas.toJSON();
        onDataChange(canvasData);
      }
    });

    canvas.on('object:modified', () => {
      if (onDataChange && isInitialized) {
        const canvasData = canvas.toJSON();
        onDataChange(canvasData);
      }
    });

    setFabricCanvas(canvas);
    console.log('Canvas initialized');

    return () => {
      canvas.dispose();
    };
  }, []);

  // Load initial data when canvas is ready
  useEffect(() => {
    if (!fabricCanvas || !initialData || isInitialized) return;

    try {
      fabricCanvas.loadFromJSON(initialData, () => {
        fabricCanvas.renderAll();
        setIsInitialized(true);
        console.log('Canvas data loaded from initial data');
      });
    } catch (error) {
      console.error('Error loading initial canvas data:', error);
      setIsInitialized(true);
    }
  }, [fabricCanvas, initialData, isInitialized]);

  // Update canvas data when real-time updates are received
  useEffect(() => {
    if (!fabricCanvas || !initialData || !isInitialized) return;

    try {
      // Temporarily disable event listeners to prevent infinite loops
      const tempOnDataChange = onDataChange;
      
      fabricCanvas.loadFromJSON(initialData, () => {
        fabricCanvas.renderAll();
        console.log('Canvas updated from real-time data');
      });
    } catch (error) {
      console.error('Error updating canvas from real-time data:', error);
    }
  }, [initialData]);

  useEffect(() => {
    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = activeTool === "draw";
    
    if (activeTool === "draw" && fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = activeColor;
      fabricCanvas.freeDrawingBrush.width = 2;
    }
  }, [activeTool, activeColor, fabricCanvas]);

  useEffect(() => {
    if (!fabricCanvas || !isInitialized) return;

    if (activeTool === "rectangle") {
      const rect = new Rect({
        left: 100,
        top: 100,
        fill: activeColor,
        width: 100,
        height: 100,
      });
      fabricCanvas.add(rect);
    } else if (activeTool === "circle") {
      const circle = new Circle({
        left: 100,
        top: 100,
        fill: activeColor,
        radius: 50,
      });
      fabricCanvas.add(circle);
    }
  }, [activeTool, activeColor, fabricCanvas, isInitialized]);

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    fabricCanvas.renderAll();
    
    if (onDataChange) {
      const canvasData = fabricCanvas.toJSON();
      onDataChange(canvasData);
    }
    
    toast("Canvas cleared!");
  };

  // Expose clear function to parent
  useEffect(() => {
    if (fabricCanvas) {
      (fabricCanvas as any).clearCanvas = handleClear;
    }
  }, [fabricCanvas]);

  return (
    <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden bg-white">
      <canvas ref={canvasRef} className="max-w-full" />
    </div>
  );
};
