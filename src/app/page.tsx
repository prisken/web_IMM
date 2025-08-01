import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to Chinese locale by default
  redirect('/zh');
} 