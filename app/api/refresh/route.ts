import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { refreshTokens } from 'features/sign';

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const newTokens = await refreshTokens(refreshToken);

  if (!newTokens) {
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    cookieStore.delete('role');
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const cookieOptions = { httpOnly: true, sameSite: 'strict' as const, secure: true, path: '/' };
  cookieStore.set('accessToken', newTokens.accessToken, { ...cookieOptions, maxAge: 30 * 60 });
  cookieStore.set('refreshToken', newTokens.refreshToken, { ...cookieOptions, maxAge: 14 * 24 * 60 * 60 });

  return NextResponse.json({ success: true });
}
