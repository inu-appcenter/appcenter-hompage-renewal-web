'use client';
import Link from 'next/link';
import { EmptyResult } from 'shared/error/EmptyResult';
import { Table, TableBody, TableHeader, TableHeaderCell } from 'shared/ui/table';
import { useImageManagement } from 'entities/image-management';
import { AddImageForm, DeleteImageButton, EditImageForm } from './ImageForm';

export const AdminImageList = () => {
  const { data } = useImageManagement();

  return (
    <div className="flex flex-col items-end gap-6">
      <AddImageForm />
      <Table>
        <TableHeader>
          <TableHeaderCell className="w-16">ID</TableHeaderCell>
          <TableHeaderCell className="w-60">내용</TableHeaderCell>
          <TableHeaderCell>이미지</TableHeaderCell>
          <TableHeaderCell className="w-48">등록일</TableHeaderCell>
          <TableHeaderCell className="w-32">작업</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <Item key={item.id} data={item} />
          ))}
          {data.length === 0 && <EmptyResult />}
        </TableBody>
      </Table>
    </div>
  );
};

const Item = ({ data }: { data: ReturnType<typeof useImageManagement>['data'][number] }) => {
  const imageUrls = Object.values(data.images);

  return (
    <tr className="group transition-colors hover:bg-slate-50/50">
      <td className="px-6 py-5 text-center text-sm text-slate-400">#{data.id}</td>
      <td className="px-6 py-5 text-sm font-medium text-slate-900">{data.body || '내용 없음'}</td>
      <td className="px-6 py-5">
        <div className="flex max-w-75 items-center gap-2 overflow-x-auto pb-2">
          {imageUrls.map((url, index) => (
            <div key={index} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 transition-transform hover:scale-105">
              <Link href={url} target="_blank" rel="noreferrer" className="block h-full w-full cursor-zoom-in">
                <img src={url} alt={`image-${index}`} className="h-full w-full object-cover" />
              </Link>
            </div>
          ))}
          {imageUrls.length === 0 && <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-slate-100 text-xs text-slate-400">이미지 없음</div>}
        </div>
      </td>
      <td className="px-6 py-5 text-sm text-slate-500">{new Date(data.createdDate).toLocaleDateString()}</td>
      <td className="px-6 py-5 text-right">
        <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <EditImageForm image={data} />
          <DeleteImageButton imageId={data.id} />
        </div>
      </td>
    </tr>
  );
};
