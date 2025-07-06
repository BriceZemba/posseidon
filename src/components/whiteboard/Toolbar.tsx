
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { MousePointer, Pencil, Square, Circle, ArrowRight, Trash2 } from 'lucide-react';

interface ToolbarProps {
  activeTool: 'select' | 'draw' | 'rectangle' | 'circle' | 'arrow';
  onToolClick: (tool: 'select' | 'draw' | 'rectangle' | 'circle' | 'arrow') => void;
  brushSize: number;
  onBrushSizeChange: (size: number) => void;
}

export const Toolbar = ({ activeTool, onToolClick, brushSize, onBrushSizeChange }: ToolbarProps) => {
  const tools = [
    { id: 'select' as const, icon: MousePointer, label: 'Select' },
    { id: 'draw' as const, icon: Pencil, label: 'Draw' },
    { id: 'rectangle' as const, icon: Square, label: 'Rectangle' },
    { id: 'circle' as const, icon: Circle, label: 'Circle' },
    { id: 'arrow' as const, icon: ArrowRight, label: 'Arrow' },
  ];

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        {tools.map((tool) => (
          <Button
            key={tool.id}
            variant={activeTool === tool.id ? "default" : "outline"}
            size="sm"
            onClick={() => onToolClick(tool.id)}
            className={
              activeTool === tool.id
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "border-neutral-600 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            }
          >
            <tool.icon className="w-4 h-4" />
            <span className="hidden sm:inline ml-2">{tool.label}</span>
          </Button>
        ))}
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-neutral-300 text-sm">Brush:</span>
        <div className="w-24">
          <Slider
            value={[brushSize]}
            onValueChange={(value) => onBrushSizeChange(value[0])}
            max={20}
            min={1}
            step={1}
            className="w-full"
          />
        </div>
        <span className="text-neutral-300 text-sm w-6">{brushSize}</span>
      </div>
    </div>
  );
};
