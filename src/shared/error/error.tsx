'use client';

import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset?: () => void;
}

export function Error({ error, reset }: ErrorProps) {
  const isUnauthorized = error.message.includes('401') || error.message.includes('Unauthorized');

  return (
    <div className="flex max-h-200 flex-col items-center justify-center p-10 text-center">
      <h2 className="text-2xl font-bold text-slate-900">{isUnauthorized ? '인증 세션이 만료되었습니다' : '문제가 발생했습니다'}</h2>

      <p className="mt-2 text-slate-500">{isUnauthorized ? '서비스 이용을 위해 다시 로그인해 주세요.' : '잠시 후 다시 시도하거나 관리자에게 문의하세요.'}</p>

      <div className="mt-8 flex gap-3">
        {isUnauthorized ? (
          <Link href="/admin/login" className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">
            로그인하러 가기
          </Link>
        ) : (
          <>
            <button onClick={() => reset?.()} className="rounded-lg bg-slate-100 px-6 py-2.5 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-200">
              다시 시도
            </button>
            <Link href="/admin" className="rounded-lg border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
              홈으로 이동
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
