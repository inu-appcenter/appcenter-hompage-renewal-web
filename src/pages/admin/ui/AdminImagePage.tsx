import { AdminImageList } from 'features/image-management';
import { PageTitle } from './Components';
import { Suspense } from 'react';
import { TableSkeleton } from 'shared/skeleton/TableSkeleton';

export const AdminImagePage = () => {
  return (
    <>
      <PageTitle title="이미지 관리" description="동아리와 관련된 이미지들을 관리합니다." />
      <Suspense fallback={<TableSkeleton />}>
        <AdminImageList />
      </Suspense>
    </>
  );
};
