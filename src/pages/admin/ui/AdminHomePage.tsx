'use client';
import { Users, Layout, Image as ImageIcon, MessageCircle, ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const adminFeatures = [
  {
    title: '동아리 관리',
    tag: 'Management',
    description: '동아리원 정보 및 기수별 활동 상태 관리',
    icon: <Users className="h-5 w-5" />,
    path: '/admin/members',
    color: 'emerald'
  },
  {
    title: '프로젝트 성과',
    tag: 'Portfolio',
    description: '프로젝트 등록 및 출시 상태 업데이트',
    icon: <Layout className="h-5 w-5" />,
    path: '/admin/projects',
    color: 'blue'
  },
  {
    title: '갤러리 아카이브',
    tag: 'Gallery',
    description: '활동 사진 업로드 및 메인 갤러리 큐레이션',
    icon: <ImageIcon className="h-5 w-5" />,
    path: '/admin/gallery',
    color: 'purple'
  },
  {
    title: '문의 및 FAQ',
    tag: 'Support',
    description: '자주 묻는 질문 편집 및 카테고리 관리',
    icon: <MessageCircle className="h-5 w-5" />,
    path: '/admin/faq',
    color: 'amber'
  }
];

export const AdminHomePage = () => {
  const router = useRouter();

  return (
    <div className="h-screen bg-[#F8F9FA] text-slate-900 selection:bg-emerald-100">
      <main className="mx-auto max-w-7xl px-8 py-16">
        <header className="mb-16">
          <h1 className="mb-3 text-sm font-semibold tracking-widest text-slate-400 uppercase">관리자 페이지</h1>
          <h2 className="text-5xl font-bold tracking-tight text-slate-900">
            앱센터의 모든 기록을 <br />
            <span className="text-slate-400">간결하게 관리하세요.</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {adminFeatures.map((feature, index) => (
            <button
              key={index}
              onClick={() => router.push(feature.path)}
              className="group relative flex h-64 flex-col justify-between overflow-hidden rounded-4xl border border-slate-200 bg-white p-8 transition-all hover:-translate-y-2 hover:border-transparent hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] active:scale-[0.98]"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-900 transition-colors group-hover:bg-slate-900 group-hover:text-white">
                  {feature.icon}
                </div>
                <ArrowUpRight className="h-5 w-5 text-slate-300 transition-all group-hover:rotate-45 group-hover:text-slate-900" />
              </div>

              <div>
                <span className="mb-2 inline-block text-[11px] font-bold tracking-wider text-slate-400 uppercase">{feature.tag}</span>
                <h3 className="mb-1 text-xl font-bold text-slate-900">{feature.title}</h3>
                <p className="text-sm leading-snug font-medium text-slate-500 opacity-0 transition-opacity group-hover:opacity-100">{feature.description}</p>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};
