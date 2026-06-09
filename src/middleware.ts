// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // إذا كان المستخدم داخل الصفحة الرئيسية بدون تحديد لغة، حوله للعربية تلقائياً
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/ar', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};