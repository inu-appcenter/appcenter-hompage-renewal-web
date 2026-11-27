import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

type RouteParams = { params: Promise<{ path: string[] }> };
export const GET = (req: NextRequest, { params }: RouteParams) => params.then((p) => handleProxy(req, p));
export const POST = (req: NextRequest, { params }: RouteParams) => params.then((p) => handleProxy(req, p));
export const PATCH = (req: NextRequest, { params }: RouteParams) => params.then((p) => handleProxy(req, p));
export const DELETE = (req: NextRequest, { params }: RouteParams) => params.then((p) => handleProxy(req, p));
export const PUT = (req: NextRequest, { params }: RouteParams) => params.then((p) => handleProxy(req, p));

async function handleProxy(req: NextRequest, { path: pathSegments }: { path: string[] }) {
  const path = pathSegments?.join('/') || '';
  const searchParams = req.nextUrl.search;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const headers = new Headers();
  const contentType = req.headers.get('content-type');

  if (contentType) {
    headers.set('content-type', contentType);
  }
  headers.set('Authorization', `Bearer ${accessToken}`);
  headers.set('Accept', 'application/json');

  try {
    const fetchOptions: RequestInit = {
      method: req.method,
      headers: headers
    };

    if (!['GET', 'HEAD'].includes(req.method)) {
      fetchOptions.body = req.body;
      (fetchOptions as any).duplex = 'half';
    }

    const response = await fetch(`${process.env.API_URL}/${path}${searchParams}`, fetchOptions);

    // 401은 재발급하지 않고 그대로 전달한다. 재발급은 클라이언트(http.ts)에서 한 번만 처리한다.
    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json({ message: errorData }, { status: response.status });
    }

    if (response.status === 204) return new NextResponse(null, { status: 204 });

    return NextResponse.json(await response.json(), { status: response.status });
  } catch (error) {
    console.error('BFF Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
