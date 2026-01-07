export const HomePageBackground = () => {
  return (
    <div className="absolute -top-20 right-60 rotate-30">
      <div className="relative flex flex-col items-end gap-6">
        <div className="absolute top-64 right-0">
          <PowerKey />
        </div>
        <div className="absolute top-112 -right-64">
          <VerticalKey />
        </div>
        <div className="flex flex-row gap-6">
          <Key value="-" />
          <Key value="+" />
          <LongKey value={`⟵`} align="right" />
        </div>
        <div className="flex flex-row gap-6">
          <Key value="p" />
          <Key value="{[" />
          <Key value="}]" />
          <div className="h-60 w-72" />
        </div>
        <div className="flex flex-row gap-6">
          <Key value={`"'`} />
          <Key value="/|" />
          <div className="h-60 w-50"></div>
        </div>
        <div className="flex flex-row gap-6">
          <Key value="?" />
          <LongKey value="SHIFT" />
        </div>
        <div className="flex flex-row gap-6">
          <LongKey value="ALT" align="right" />
          <Key value="" />
        </div>
      </div>
    </div>
  );
};

const Key = ({ value }: { value: string }) => {
  return (
    <div className="border-brand-primary-light flex h-60 w-60 justify-center rounded-[40px] border">
      <span className="text-brand-primary-light mt-6 text-6xl font-bold">{value}</span>
    </div>
  );
};
const LongKey = ({ value, align = 'left' }: { value: string; align?: 'left' | 'right' }) => {
  return (
    <div className={`border-brand-primary-light flex h-60 w-120 ${align === 'left' ? 'justify-start' : 'justify-end'} rounded-[40px] border px-10`}>
      <span className="text-brand-primary-light mt-6 text-6xl font-bold">{value}</span>
    </div>
  );
};
const PowerKey = () => {
  return (
    <>
      <svg viewBox="0 0 300 514" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full" preserveAspectRatio="none">
        <path
          d="M260 10H50C27.9 10 10 27.9 10 50V192C10 214.1 27.9 232 50 232H100V470C100 492.1 117.9 510 140 510H260C282.1 510 300 492.1 300 470V50C300 27.9 282.1 10 260 10Z"
          className="stroke-brand-primary-light"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-end p-8">
        <span
          className="text-brand-primary-light text-6xl font-bold"
          style={{
            writingMode: 'vertical-lr'
          }}
        >
          POWER
        </span>
      </div>
    </>
  );
};

const VerticalKey = () => {
  return <div className="border-brand-primary-light flex h-120 w-60 justify-center rounded-[40px] border" />;
};
