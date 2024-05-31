interface EmptyProps {
  title: string;
  text: string;
}

export const Empty = ({ title, text }: EmptyProps) => {
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-semibold mt-6'>{title}</h2>
      <p className='text-muted-foreground text-sm mt-2'>{text}</p>
    </div>
  );
};
