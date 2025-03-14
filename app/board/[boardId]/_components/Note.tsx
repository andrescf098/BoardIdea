import { Kalam } from 'next/font/google';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { cn, colorToCss, getContrastingTextColor } from '@/lib/utils';
import { NoteLayer } from '@/types/canvas';
import { useMutation } from '@/liveblocks.config';

const font = Kalam({
  subsets: ['latin'],
  weight: ['400'],
});

interface NoteProps {
  id: string;
  layer: NoteLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.15;
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;
  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
};

export const Note = ({
  layer,
  onPointerDown,
  id,
  selectionColor,
}: NoteProps) => {
  const { x, y, width, height, fill, value } = layer;
  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get('layers');
    liveLayers.get(id)?.set('value', newValue);
  }, []);
  const handlerContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };
  const colorBg = fill ? colorToCss(fill) : '#000';
  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : 'none',
      }}
      className='shadow-md drop-shadow-xl'
    >
      <ContentEditable
        html={value || 'Text'}
        onChange={handlerContentChange}
        className={cn(
          'h-full w-full flex items-center justify-center text-center outline-none',
          font.className
        )}
        style={{
          fontSize: calculateFontSize(width, height),
          color: fill ? getContrastingTextColor(fill) : '#000',
          backgroundColor: fill ? colorToCss(fill) : '#000',
        }}
      />
    </foreignObject>
  );
};
