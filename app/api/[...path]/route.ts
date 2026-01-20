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

  const cookieStore = await cookies();
  const token = cookieStore.get('admin_access_token')?.value;

  const headers = new Headers();
  const contentType = req.headers.get('content-type');

  if (contentType) {
    headers.set('content-type', contentType);
  }
  headers.set('X-AUTH-TOKEN', token || '');
  headers.set('Accept', 'application/json');

  try {
    const fetchOptions: RequestInit = {
      method: req.method,
      headers: headers
    };
    if (!['GET', 'HEAD'].includes(req.method)) {
      const arrayBuffer = await req.arrayBuffer();
      fetchOptions.body = arrayBuffer;
    }

    const response = await fetch(`${process.env.API_URL}/${path}${searchParams}`, fetchOptions);

    if (response.status === 204) return new NextResponse(null, { status: 204 });

    const resData = await response.json();
    return NextResponse.json(resData, { status: response.status });
  } catch (error) {
    console.error('BFF Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
