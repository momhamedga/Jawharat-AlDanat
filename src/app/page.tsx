import { redirect } from 'next/navigation';

export default function RootPage() {
  // التوجيه التلقائي إلى اللغة الافتراضية للموقع
  redirect('/ar');
}