export const EmptyResult = ({ message }: { message?: string }) => {
  return (
    <tr>
      <td colSpan={4} className="px-6 py-10 text-center text-sm whitespace-pre-line text-slate-400">
        {message ?? '결과가 없습니다.\n 데이터를 추가하거나 검색어를 변경해보세요.'}
      </td>
    </tr>
  );
};
