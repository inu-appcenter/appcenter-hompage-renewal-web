import { useGroupYear, usePart } from 'entities/generation';
import { useRoles } from 'entities/role';
import { PART_COLORS } from 'shared/constants/part';

export const CommonFields = ({ formData, setFormData }: { formData: any; setFormData: any }) => {
  const { data: partData } = usePart();
  const { data: roleData } = useRoles();
  const { data: groupYear } = useGroupYear();

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <form className="space-y-4">
      <div className="space-y-3">
        <label className="flex items-center gap-2 px-1 text-xs font-bold text-slate-400">기수 선택</label>
        <div className="flex flex-wrap gap-2">
          {groupYear.yearList.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => handleChange('year', y)}
              className={`rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${formData.year === y ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-50 text-slate-400'}`}
            >
              {y}기
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="flex items-center gap-2 px-1 text-xs font-bold text-slate-400">파트 선택</label>
        <div className="flex flex-wrap gap-2">
          {partData.parts.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => handleChange('part', p)}
              className={`rounded-xl px-5 py-2.5 text-xs font-bold transition-all ${formData.part === p ? `${PART_COLORS[p].bg} ${PART_COLORS[p].text}` : 'bg-slate-50 text-slate-400'}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="flex items-center gap-2 px-1 text-xs font-bold text-slate-400">역할 선택</label>
        <div className="flex flex-wrap gap-2">
          {roleData.map((r) => (
            <button
              key={r.roleId}
              type="button"
              onClick={() => handleChange('role_id', r.roleId)}
              className={`rounded-xl px-5 py-2.5 text-xs font-bold transition-all ${formData.role_id === r.roleId ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-400'}`}
            >
              {r.roleName}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
};
