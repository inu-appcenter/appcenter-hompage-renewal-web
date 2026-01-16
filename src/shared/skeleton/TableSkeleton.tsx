export const TableSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="h-12 max-w-md flex-1 rounded-2xl bg-slate-100" />
        <div className="h-12 w-24 rounded-xl bg-slate-100" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full table-fixed border-collapse">
          <thead className="border-b border-slate-100 bg-slate-50/50">
            <tr>
              <th className="w-16 px-6 py-5">
                <div className="mx-auto h-4 w-4 rounded bg-slate-200" />
              </th>
              <th className="w-68 px-6 py-5">
                <div className="h-4 w-20 rounded bg-slate-200" />
              </th>
              <th className="w-64 px-6 py-5">
                <div className="h-4 w-20 rounded bg-slate-200" />
              </th>
              <th className="px-6 py-5">
                <div className="h-4 w-24 rounded bg-slate-200" />
              </th>
              <th className="w-28 px-6 py-5 text-right">
                <div className="ml-auto h-4 w-12 rounded bg-slate-200" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[...Array(3)].map((_, i) => (
              <tr key={i}>
                <td className="px-6 py-8">
                  <div className="mx-auto h-4 w-4 rounded bg-slate-100" />
                </td>
                <td className="px-6 py-8">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-slate-100" />
                    <div className="space-y-2">
                      <div className="h-4 w-24 rounded bg-slate-100" />
                      <div className="h-3 w-32 rounded bg-slate-50" />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-8">
                  <div className="space-y-2">
                    <div className="h-4 w-20 rounded bg-slate-100" />
                    <div className="h-3 w-16 rounded bg-slate-50" />
                  </div>
                </td>
                <td className="px-6 py-8">
                  <div className="space-y-2">
                    <div className="h-3 w-40 rounded bg-slate-50" />
                    <div className="h-3 w-32 rounded bg-slate-50" />
                  </div>
                </td>
                <td className="px-6 py-8">
                  <div className="ml-auto h-8 w-16 rounded-lg bg-slate-50" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
