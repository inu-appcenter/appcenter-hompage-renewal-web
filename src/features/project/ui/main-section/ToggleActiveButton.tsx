export const ToggleActiveButton = ({ isActive, onClick }: { isActive: boolean; onClick: () => void }) => {
  return (
    <div className="flex flex-col justify-end">
      <label className="mb-2 ml-1 block text-xs font-bold tracking-wider text-gray-500">서비스 상태</label>
      <label className="relative inline-flex w-fit cursor-pointer items-center select-none">
        <input type="checkbox" className="peer sr-only" checked={isActive} onChange={onClick} />
        <div
          className={`group hover:ring-offset-background flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm font-bold transition-all duration-300 hover:ring-2 hover:ring-offset-1 ${
            isActive
              ? 'border-brand-secondary-light/30 bg-brand-secondary-light/10 text-brand-secondary-light hover:ring-brand-secondary-light/30 shadow-[0_0_15px_rgba(var(--brand-secondary-light-rgb),0.15)]'
              : 'border-gray-700 bg-gray-800/50 text-gray-500 hover:ring-gray-700'
          } `}
        >
          <div className="relative flex h-2.5 w-2.5">
            {isActive && <span className="bg-brand-secondary-light absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>}
            <span className={`relative inline-flex h-2.5 w-2.5 rounded-full transition-colors ${isActive ? 'bg-brand-secondary-light' : 'bg-gray-600'}`}></span>
          </div>
          <span>{isActive ? '서비스이용가능' : '서비스 종료'}</span>
        </div>
      </label>
    </div>
  );
};
