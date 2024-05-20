import { Button } from '@/components/ui/button';
import { Ghost } from 'lucide-react';
import Link from 'next/link';
export default function Home() {
  return (
    <div>
      <Button asChild size='lg'>
        <Link href='/'>Boton</Link>
      </Button>
    </div>
  );
}
