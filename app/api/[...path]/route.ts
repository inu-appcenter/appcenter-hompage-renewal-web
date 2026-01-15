import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

type RouteParams = { params: Promise<{ path: string[] }> };

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { path } = await params;
  return handleProxy(req, path);
}

export async function POST(req: NextRequest, { params }: RouteParams) {
  const { path } = await params;
  return handleProxy(req, path);
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const { path } = await params;
  return handleProxy(req, path);
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const { path } = await params;
  return handleProxy(req, path);
}

async function handleProxy(req: NextRequest, pathSegments: string[]) {
  const path = pathSegments?.join('/') || '';
  const searchParams = req.nextUrl.search;
  const backendUrl = `${process.env.API_URL}/${path}${searchParams}`;

  const cookieStore = await cookies();
  const token = cookieStore.get('admin_access_token')?.value;

  let body: any = null;
  if (!['GET', 'HEAD'].includes(req.method)) {
    try {
      body = await req.text();
    } catch (e) {
      console.error('Request body read error:', e);
    }
  }

  try {
    const response = await fetch(backendUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-AUTH-TOKEN': token || ''
      },
      body: body
    });

    if (response.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('BFF Proxy Error:', error);
    return NextResponse.json({ message: '서버 응답 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
