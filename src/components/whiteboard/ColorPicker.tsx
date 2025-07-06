
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Palette } from 'lucide-react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const predefinedColors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
    '#FFC0CB', '#A52A2A', '#808080', '#000080', '#008000',
    '#FF6347', '#4169E1', '#32CD32', '#FFD700', '#FF1493'
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="border-neutral-600 text-neutral-300 hover:bg-neutral-800">
          <div 
            className="w-4 h-4 rounded mr-2 border border-neutral-500" 
            style={{ backgroundColor: color }}
          />
          <Palette className="w-4 h-4" />
          <span className="hidden sm:inline ml-2">Color</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 bg-neutral-900 border-neutral-700">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-neutral-300 mb-2 block">Custom Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => onChange(e.target.value)}
              className="w-full h-10 rounded border border-neutral-600 bg-transparent cursor-pointer"
            />
          </div>
          <div>
            <label className="text-sm text-neutral-300 mb-2 block">Preset Colors</label>
            <div className="grid grid-cols-5 gap-2">
              {predefinedColors.map((presetColor) => (
                <button
                  key={presetColor}
                  onClick={() => onChange(presetColor)}
                  className={`w-10 h-10 rounded border-2 ${
                    color === presetColor ? 'border-blue-500' : 'border-neutral-600'
                  } hover:border-blue-400 transition-colors`}
                  style={{ backgroundColor: presetColor }}
                />
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
