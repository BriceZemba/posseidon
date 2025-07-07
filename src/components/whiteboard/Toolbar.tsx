
import { Button } from '@/components/ui/button';
import { Square, Circle, Type, MousePointer2, Palette, Trash2 } from 'lucide-react';

interface ToolbarProps {
  activeTool: "select" | "draw" | "rectangle" | "circle";
  onToolClick: (tool: "select" | "draw" | "rectangle" | "circle") => void;
  onClear: () => void;
}

export const Toolbar = ({ activeTool, onToolClick, onClear }: ToolbarProps) => {
  const tools = [
    { id: "select" as const, icon: MousePointer2, label: "Select" },
    { id: "draw" as const, icon: Type, label: "Draw" },
    { id: "rectangle" as const, icon: Square, label: "Rectangle" },
    { id: "circle" as const, icon: Circle, label: "Circle" },
  ];

  return (
    <div className="flex items-center gap-2 p-2 bg-neutral-900/30 backdrop-blur-sm rounded-lg border border-neutral-800">
      {tools.map((tool) => (
        <Button
          key={tool.id}
          variant={activeTool === tool.id ? "default" : "ghost"}
          size="sm"
          onClick={() => onToolClick(tool.id)}
          className={`text-neutral-300 hover:text-white ${
            activeTool === tool.id ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""
          }`}
        >
          <tool.icon className="w-4 h-4" />
        </Button>
      ))}
      <div className="w-px h-6 bg-neutral-700 mx-2" />
      <Button
        variant="ghost"
        size="sm"
        onClick={onClear}
        className="text-red-400 hover:text-red-300"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};
