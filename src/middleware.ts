import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    if(req.url.endsWith('/login')) {
        const cookieStore = await cookies();
        const cookie = cookieStore.get('connect.sid');
        if(cookie) {
            // return NextResponse.redirect(new URL('/dashboard', req.url)); // TODO: uncomment this when dashboard is created
        }
        return NextResponse.next();
    }

}

export const config = {
  matcher: ['/login'],
};
