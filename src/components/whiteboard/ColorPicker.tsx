
import { Button } from '@/components/ui/button';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const colors = [
    "#000000", "#ff0000", "#00ff00", "#0000ff",
    "#ffff00", "#ff00ff", "#00ffff", "#ffa500",
    "#800080", "#008000", "#000080", "#808080"
  ];

  return (
    <div className="flex items-center gap-2 p-2 bg-neutral-900/30 backdrop-blur-sm rounded-lg border border-neutral-800">
      <div className="flex gap-1">
        {colors.map((c) => (
          <Button
            key={c}
            variant="ghost"
            size="sm"
            onClick={() => onChange(c)}
            className={`w-8 h-8 p-0 rounded-full border-2 ${
              color === c ? "border-white" : "border-neutral-600"
            }`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 rounded border border-neutral-600 bg-transparent cursor-pointer"
      />
    </div>
  );
};
