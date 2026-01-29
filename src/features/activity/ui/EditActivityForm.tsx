'use client';
import { useState } from 'react';
import { Plus, Trash2, Image as ImageIcon, X, Save } from 'lucide-react';
import type { ActivityForm } from '../types/form';
import { Activity, useActivityActions } from 'entities/activity';
import { useEditActivity } from '../hooks/useEditActivity';

const DEFAULT_CONTENT = {
  sequence: 0,
  subTitle: '',
  text: '',
  imageUrls: [],
  id: 0
};
export function EditActivityForm({ initialData }: { initialData: Activity }) {
  const { editActivity, isPending } = useEditActivity();
  const { deleteImageMutation } = useActivityActions(initialData.id);

  const [form, setForm] = useState<ActivityForm>({
    title: initialData.title || '',
    author: initialData.author || '',
    body: initialData.body || '',
    titleEng: initialData.titleEng || '',
    thumbnail: initialData.thumbnail || null,
    contents: initialData.contents
      ? initialData.contents.map((content) => ({
          ...content,
          imageUrls: content.imageUrls || []
        }))
      : [
          {
            ...DEFAULT_CONTENT
          }
        ]
  });

  // 썸네일 변경
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, thumbnail: file });
    }
  };

  // 섹션 추가
  const addSection = () => {
    setForm({
      ...form,
      contents: [
        ...form.contents,
        {
          ...DEFAULT_CONTENT
        }
      ]
    });
  };

  // 섹션 삭제
  const removeSection = (id: number) => {
    setForm({ ...form, contents: form.contents.filter((s) => s.id !== id) });
  };

  const updateSection = (id: number, field: keyof (typeof form.contents)[number], value: string) => {
    setForm({ ...form, contents: form.contents.map((s) => (s.id === id ? { ...s, [field]: value } : s)) });
  };

  // 섹션 이미지 추가
  const handleSectionImageAdd = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);

      setForm({
        ...form,
        contents: form.contents.map((s) => {
          if (s.id === id) {
            return {
              ...s,
              imageUrls: [...s.imageUrls, ...newFiles]
            };
          }
          return s;
        })
      });
    }
  };

  // 섹션 이미지 개별 삭제
  const removeSectionImage = async (sectionId: number, targetImage: string | File) => {
    // 방금 추가한 파일(File)이면 -> State에서만 삭제
    if (targetImage instanceof File) {
      setForm((prev) => ({
        ...prev,
        contents: prev.contents.map((s) => (s.id === sectionId ? { ...s, imageUrls: s.imageUrls.filter((img) => img !== targetImage) } : s))
      }));
      return;
    }

    // 서버에 있는 이미지(String)면 -> 즉시 API 호출로 삭제
    if (!confirm('서버에 저장된 이미지를 삭제하시겠습니까?')) return;

    try {
      const urlParts = targetImage.split('/');
      const lastPart = urlParts.pop();
      const imageId = Number(lastPart);

      await deleteImageMutation.mutateAsync({ id: sectionId, imageIds: [imageId] });

      // 성공하면 State에서도 제거
      setForm((prev) => ({
        ...prev,
        contents: prev.contents.map((s) => (s.id === sectionId ? { ...s, imageUrls: s.imageUrls.filter((img) => img !== targetImage) } : s))
      }));
    } catch {
      alert('삭제 실패');
    }
  };
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="mb-8 text-2xl font-bold text-slate-900">활동 게시글 수정</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          editActivity(initialData, form);
        }}
        className="space-y-8"
      >
        {/* --- 기본 정보 섹션 --- */}
        <section className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-500">1</span>
            기본 정보
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">제목 *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder="활동 제목을 입력하세요"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">영문 제목 *</label>
              <input
                type="text"
                value={form.titleEng}
                onChange={(e) => setForm({ ...form, titleEng: e.target.value })}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder="활동 제목을 입력하세요"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">작성자 *</label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="작성자 이름"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">요약 내용 (Body)</label>
            <textarea
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              rows={3}
              className="w-full resize-none rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="게시글 목록에 표시될 요약 내용입니다."
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">대표 썸네일 *</label>
            <div className="flex items-start gap-4">
              <label className="flex h-32 w-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100">
                {form.thumbnail ? (
                  <img src={typeof form.thumbnail === 'string' ? form.thumbnail : URL.createObjectURL(form.thumbnail)} alt="thumb-preview" className="h-full w-full rounded-lg object-cover" />
                ) : (
                  <>
                    <ImageIcon className="mb-2 text-slate-400" />
                    <span className="text-xs text-slate-500">이미지 선택</span>
                  </>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleThumbnailChange} />
              </label>
              <div className="pt-2 text-xs text-slate-400">
                * 목록에 표시될 대표 이미지입니다.
                <br />* 권장 비율 16:9
              </div>
            </div>
          </div>
        </section>

        <hr className="border-slate-200" />

        {/* --- 상세 콘텐츠 섹션 (반복) --- */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-500">2</span>
              상세 콘텐츠
            </h2>
          </div>

          <div className="space-y-6">
            {form.contents.map((section, index) => (
              <div key={section.id} className="relative rounded-lg border border-slate-200 bg-slate-50/50 p-5 transition-shadow hover:shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded bg-blue-100 px-2 py-1 text-xs font-bold text-blue-600">SECTION {index + 1}</span>
                  <button type="button" onClick={() => removeSection(section.id)} className="text-slate-400 hover:text-red-500">
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {/* 텍스트 입력 영역 */}
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={section.subTitle}
                      onChange={(e) => updateSection(section.id, 'subTitle', e.target.value)}
                      placeholder="소제목을 입력하세요"
                      className="w-full rounded border border-slate-300 px-3 py-2 text-sm font-medium focus:border-blue-500 focus:outline-none"
                    />
                    <textarea
                      value={section.text}
                      onChange={(e) => updateSection(section.id, 'text', e.target.value)}
                      placeholder="본문 내용을 입력하세요"
                      rows={5}
                      className="w-full resize-none rounded border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  {/* 이미지 업로드 영역 */}
                  <div className="space-y-2">
                    <div className="min-h-35 rounded border border-slate-200 bg-white p-3">
                      <div className="mb-2 grid grid-cols-3 gap-2">
                        {section.imageUrls.map((url, imgIdx) => (
                          <div key={imgIdx} className="group relative aspect-square overflow-hidden rounded border border-slate-100">
                            <img src={typeof url === 'string' ? url : URL.createObjectURL(url)} alt="content" className="h-full w-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeSectionImage(section.id, section.imageUrls[imgIdx])}
                              className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                        <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded border border-dashed border-slate-300 bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-blue-500">
                          <Plus size={20} />
                          <span className="mt-1 text-[10px]">추가</span>
                          <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleSectionImageAdd(section.id, e)} />
                        </label>
                      </div>
                      {section.imageUrls.length === 0 && <p className="py-4 text-center text-xs text-slate-400">이미지가 없습니다.</p>}
                    </div>
                    <p className="text-right text-xs text-slate-400">{section.imageUrls.length}개의 이미지 선택됨</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addSection}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 py-4 text-sm text-slate-500 transition-colors hover:border-blue-300 hover:bg-slate-50 hover:text-blue-600"
          >
            <Plus size={16} /> 새로운 섹션 추가하기
          </button>
        </section>

        <div className="flex justify-end pt-4">
          <button disabled={isPending} type="submit" className="flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-blue-700">
            <Save size={18} /> 게시글 저장하기
          </button>
        </div>
      </form>
    </div>
  );
}
