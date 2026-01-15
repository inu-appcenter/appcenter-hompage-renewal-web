import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface SignResponse {
  token: string[];
}
export async function POST(request: Request) {
  const { id, password } = await request.json();

  // 서버로 부터 토큰 발급 받기
  const res = await fetch(`${process.env.API_URL}/sign/sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, password })
  });

  const data: SignResponse = await res.json();

  // 토큰이 정상적으로 발급되었으면 쿠키에 저장
  if (res.ok) {
    const cookieStore = await cookies();
    cookieStore.set('admin_access_token', data.token[0], {
      httpOnly: true,
      sameSite: 'strict',
      expires: new Date(Date.now() + 60 * 60 * 1000),
      secure: true,
      path: '/'
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
