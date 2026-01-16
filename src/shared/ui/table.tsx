export const Table = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
      <table className="w-full table-fixed border-collapse text-left text-sm">{children}</table>
    </div>
  );
};

export const TableHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <thead className="border-b border-slate-100 bg-slate-50/50 uppercase">
      <tr>{children}</tr>
    </thead>
  );
};

export const TableBody = ({ children }: { children: React.ReactNode }) => {
  return <tbody className="divide-y divide-slate-50">{children}</tbody>;
};

export const TableRow = ({ children }: { children: React.ReactNode }) => {
  return <tr className="group transition-colors hover:bg-slate-50/80">{children}</tr>;
};

export const TableHeaderCell = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <th className={`px-6 py-5 font-bold text-slate-400 ${className}`}>{children}</th>;
};
