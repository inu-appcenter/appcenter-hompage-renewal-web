'use client';
import { WebLink, AppStore, GooglePlay } from 'entities/link';

import { ImagePlus, X, Trash2, ArrowRight, Loader2 } from 'lucide-react';
import { useState, ChangeEvent, MouseEvent } from 'react';
import { useProjectSubmit } from '../hooks/useProjectSubmit';
import { MainForm } from '../types/form';

type PreviewUrls = {
  appIcon: string | null;
  mockupImage: string | null;
};
export const MainSectionForm = ({ setStep }: { setStep: React.Dispatch<React.SetStateAction<'main' | 'introduce' | 'grid'>> }) => {
  const [form, setForm] = useState<MainForm>({
    title: '',
    subTitle: '',
    isActive: true,
    androidStoreLink: '',
    appleStoreLink: '',
    websiteLink: '',
    appIcon: null,
    mockupImage: null
  });

  const [previewUrls, setPreviewUrls] = useState<PreviewUrls>({
    appIcon: null,
    mockupImage: null
  });

  const { submit, isPending } = useProjectSubmit({
    mode: 'create',
    onSuccess: () => setStep('introduce')
  });

  // 유효성 검사 로직 (필수 항목이 모두 있는지 확인)
  const isFormValid = form.title.trim().length > 0 && form.subTitle.trim().length > 0 && form.appIcon !== null && form.mockupImage !== null;

  const handleInputChange = (key: keyof MainForm) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleImageUpload = (type: 'appIcon' | 'mockupImage') => (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, [type]: file }));
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrls((prev) => ({ ...prev, [type]: objectUrl }));
    }
  };

  const handleRemoveImage = (type: 'appIcon' | 'mockupImage') => (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setForm((prev) => ({ ...prev, [type]: null }));

    if (previewUrls[type]) {
      URL.revokeObjectURL(previewUrls[type]!);
    }
    setPreviewUrls((prev) => ({ ...prev, [type]: null }));
  };

  const handleSubmit = () => {
    submit({
      title: form.title,
      subTitle: form.subTitle,
      isActive: form.isActive,
      body: '',
      androidStoreLink: form.androidStoreLink,
      appleStoreLink: form.appleStoreLink,
      webSiteLink: form.websiteLink,
      images: [form.appIcon, form.mockupImage],
      stackIds: [],
      groupIds: []
    });
  };

  const inputContainerClass =
    'group flex items-center gap-3 rounded-xl border border-white/10 bg-surface-elevated px-4 py-3 transition-all focus-within:border-brand-primary/50 focus-within:bg-[#202024] focus-within:ring-1 focus-within:ring-brand-primary/50 hover:border-white/20';
  const inputClass = 'w-full bg-transparent text-sm text-gray-200 outline-none placeholder:text-gray-600';

  return (
    <section className="relative flex w-full flex-col px-8 pt-8 text-white">
      <div className="flex w-full flex-row justify-between gap-6 pb-24">
        {/* --- Left Column --- */}
        <div className="flex w-140 flex-1 flex-col gap-6">
          <div className="flex flex-row items-start gap-6">
            {/* 앱 아이콘 업로드 */}
            <div className="group flex flex-col">
              <label className="mb-2 ml-1 block text-xs font-bold tracking-wider text-gray-500">앱 아이콘 (필수)</label>
              <div
                className={`relative flex h-32 w-32 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[28px] border-2 border-dashed transition-all duration-300 ${
                  previewUrls.appIcon ? 'border-transparent bg-black shadow-lg' : 'hover:border-brand-primary/50 border-gray-700 bg-[#151518] hover:bg-[#1a1a1f]'
                }`}
              >
                <input type="file" className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0" accept="image/*" onChange={handleImageUpload('appIcon')} />

                {previewUrls.appIcon ? (
                  <div className="group relative h-full w-full">
                    <img src={previewUrls.appIcon} alt="Icon Preview" className="h-full w-full object-cover" />

                    <button
                      onClick={handleRemoveImage('appIcon')}
                      className="absolute top-2 right-2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-red-500"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-500">
                    <div className="group-hover:text-brand-primary flex h-12 w-12 items-center justify-center rounded-full bg-[#1e1e22] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] ring-1 ring-white/5 transition-transform group-hover:scale-110">
                      <ImagePlus size={24} strokeWidth={1.5} />
                    </div>
                    <span className="group-hover:text-brand-primary text-xs font-bold text-gray-300">앱 아이콘</span>
                  </div>
                )}
              </div>
            </div>

            {/* 서비스 상태 토글 */}
            <div className="flex flex-col justify-end">
              <label className="mb-2 ml-1 block text-xs font-bold tracking-wider text-gray-500">서비스 상태</label>
              <label className="relative inline-flex w-fit cursor-pointer items-center select-none">
                <input type="checkbox" className="peer sr-only" checked={form.isActive} onChange={(e) => setForm((prev) => ({ ...prev, isActive: e.target.checked }))} />
                <div
                  className={`group hover:ring-offset-background flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm font-bold transition-all duration-300 hover:ring-2 hover:ring-offset-1 ${
                    form.isActive
                      ? 'border-brand-secondary-light/30 bg-brand-secondary-light/10 text-brand-secondary-light hover:ring-brand-secondary-light/30 shadow-[0_0_15px_rgba(var(--brand-secondary-light-rgb),0.15)]'
                      : 'border-gray-700 bg-gray-800/50 text-gray-500 hover:ring-gray-700'
                  } `}
                >
                  <div className="relative flex h-2.5 w-2.5">
                    {form.isActive && <span className="bg-brand-secondary-light absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>}
                    <span className={`relative inline-flex h-2.5 w-2.5 rounded-full transition-colors ${form.isActive ? 'bg-brand-secondary-light' : 'bg-gray-600'}`}></span>
                  </div>
                  <span>{form.isActive ? '서비스이용가능' : '서비스 종료'}</span>
                </div>
              </label>
            </div>
          </div>

          {/* 제목 입력 */}
          <div className="group relative">
            <label className="mb-2 ml-1 block text-xs font-bold text-gray-500">프로젝트 제목 (필수)</label>
            <div className="focus-within:border-brand-primary/50 focus-within:ring-brand-primary/50 bg-surface-elevated relative rounded-2xl border border-white/10 px-4 py-4 caret-white transition-all focus-within:ring-1 hover:border-white/20">
              <input
                type="text"
                className="w-full bg-transparent text-[72px] font-bold text-gray-300 outline-none placeholder:text-gray-700"
                placeholder="프로젝트 제목"
                value={form.title}
                onChange={handleInputChange('title')}
              />
            </div>
          </div>

          {/* 설명 입력 */}
          <div className="group relative">
            <label className="mb-2 ml-1 block text-xs font-bold text-gray-500">프로젝트 설명 (필수)</label>
            <div className="focus-within:border-brand-primary/50 focus-within:ring-brand-primary/50 bg-surface-elevated rounded-2xl border border-white/10 p-5 transition-all focus-within:ring-1 hover:border-white/20">
              <textarea
                className="h-32 w-full resize-none bg-transparent text-xl/7 text-gray-300 outline-none placeholder:text-gray-600"
                placeholder="프로젝트에 대한 핵심 설명을 작성해주세요. (최대 5줄 권장)"
                spellCheck={false}
                value={form.subTitle}
                onChange={handleInputChange('subTitle')}
              />
            </div>
          </div>

          {/* 관련 링크 입력 */}
          <div className="flex flex-col gap-3">
            <label className="ml-1 block text-xs font-bold tracking-wider text-gray-500">관련 링크</label>
            <div className={inputContainerClass}>
              <GooglePlay href="#" className="h-8" />
              <div className="h-4 w-px bg-gray-700"></div>
              <input type="text" placeholder="Google Play 스토어 링크를 입력하세요" className={inputClass} value={form.androidStoreLink} onChange={handleInputChange('androidStoreLink')} />
            </div>
            <div className={inputContainerClass}>
              <AppStore href="#" className="h-8" />
              <div className="h-4 w-px bg-gray-700"></div>
              <input type="text" placeholder="App Store 스토어 링크를 입력하세요" className={inputClass} value={form.appleStoreLink} onChange={handleInputChange('appleStoreLink')} />
            </div>
            <div className={inputContainerClass}>
              <WebLink href="#" className="h-8" />
              <div className="h-4 w-px bg-gray-700"></div>
              <input type="text" placeholder="웹사이트 URL을 입력하세요" className={inputClass} value={form.websiteLink} onChange={handleInputChange('websiteLink')} />
            </div>
          </div>
        </div>

        {/* --- Right Column --- */}
        <div className="group flex flex-col">
          <label className="mb-2 ml-1 block text-xs font-bold tracking-wider text-gray-500">디바이스 목업 이미지 (필수)</label>
          <div
            className={`relative flex h-150 w-150 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[40px] border-2 border-dashed transition-all duration-300 ${
              previewUrls.mockupImage ? 'border-transparent bg-black shadow-2xl' : 'hover:border-brand-primary/50 border-gray-700 bg-[#151518] hover:bg-[#1a1a1f]'
            }`}
          >
            <input type="file" className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0" accept="image/*" onChange={handleImageUpload('mockupImage')} />

            {previewUrls.mockupImage ? (
              <div className="group relative h-full w-full">
                <img src={previewUrls.mockupImage} alt="Mockup Preview" className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-40" />

                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={handleRemoveImage('mockupImage')}
                    className="flex transform items-center gap-2 rounded-full bg-red-500/90 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-red-500"
                  >
                    <Trash2 size={20} /> 이미지 제거
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6 text-gray-500">
                <div className="group-hover:text-brand-primary flex h-24 w-24 items-center justify-center rounded-full bg-[#1e1e22] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] ring-1 ring-white/5 transition-transform group-hover:scale-110">
                  <ImagePlus size={40} strokeWidth={1.5} />
                </div>
                <div className="text-center">
                  <p className="group-hover:text-brand-primary text-xl font-bold text-gray-300 transition-colors">목업 이미지 업로드</p>
                  <p className="mt-2 text-sm text-gray-500">900 x 900 이하 권장</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed right-24 bottom-10 z-50 flex items-center gap-4">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid || isPending}
          className="group bg-brand-primary-cta text-custom-black flex items-center gap-2 rounded-full px-6 py-4 text-xl font-semibold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span className="font-medium">저장 중...</span>
            </>
          ) : (
            <>
              <span className="font-medium">다음 (저장)</span>
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={20} />
            </>
          )}
        </button>
      </div>
    </section>
  );
};
