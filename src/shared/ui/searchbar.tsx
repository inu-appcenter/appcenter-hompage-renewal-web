import { ComponentPropsWithoutRef } from 'react';
import { Search } from 'lucide-react';

export const SearchBar = ({ className, ...props }: ComponentPropsWithoutRef<'input'>) => {
  return (
    <div className={`relative flex-1 rounded-2xl border border-slate-200 bg-white shadow-sm ${className || ''}`}>
      <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-300" size={18} />
      <input type="text" className="w-full bg-transparent py-3 pr-4 pl-12 text-sm focus:outline-none" {...props} />
    </div>
  );
};
