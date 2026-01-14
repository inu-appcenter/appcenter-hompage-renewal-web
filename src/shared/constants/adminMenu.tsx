import { Users, Layout, Image as ImageIcon, MessageCircle, Activity, ChevronRight } from 'lucide-react';

export const ADMIN_MENU = [
  {
    group: '동아리 관리',
    tag: 'Management',
    description: '구성원 정보, 기수 및 권한 체계 관리',
    path: '/admin/member',
    color: 'emerald',
    icon: Users,
    subMenu: [
      { name: '동아리원 관리', href: '/admin/member', icon: Users },
      { name: '기수 관리', href: '/admin/generation', icon: Activity },
      { name: '역할 관리', href: '/admin/role', icon: ChevronRight }
    ]
  },
  {
    group: '프로젝트 관리',
    tag: 'Portfolio',
    description: '동아리에서 진행한 프로젝트 관리',
    path: '/admin/project',
    color: 'blue',
    icon: Layout
  },
  {
    group: '사진게시판 관리',
    tag: 'Gallery',
    description: '동아리 사진 업로드 및 관리',
    icon: ImageIcon,
    path: '/admin/image',
    color: 'purple'
  },
  {
    group: '질문 관리(FAQ)',
    tag: 'Support',
    description: '자주 묻는 질문 관리',
    icon: MessageCircle,
    path: '/admin/faq',
    color: 'amber'
  }
];
