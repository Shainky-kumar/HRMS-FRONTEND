import { Suspense } from 'react';
import LoginContent from './LoginContent';

// 👇 Ye line add karo - force dynamic rendering
export const dynamic = 'force-dynamic';

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}