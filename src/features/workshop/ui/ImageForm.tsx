'use client';
import { useState, useRef } from 'react';
import { Pencil, Plus, Trash2, Loader2, X, Upload } from 'lucide-react';
import { Modal } from 'shared/ui/modal';
import { ImageManagement, useImageManagementActions } from 'entities/workshop';

export const AddImageForm = () => {
  const { addMutation } = useImageManagementActions();

  return (
    <Modal
      title="사진 등록"
      trigger={
        <button className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-bold text-white transition-all hover:bg-blue-600">
          <Plus size={18} /> 새 이미지 추가
        </button>
      }
    >
      {(close) => (
        <ImageForm
          isPending={addMutation.isPending}
          onSubmit={async (data) => {
            await addMutation.mutateAsync(data);
            close();
          }}
        />
      )}
    </Modal>
  );
};

export const EditImageForm = ({ image }: { image: ImageManagement }) => {
  const { editMutation } = useImageManagementActions();

  return (
    <Modal
      title="이미지 수정"
      trigger={
        <button className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500">
          <Pencil size={16} />
        </button>
      }
    >
      {(close) => (
        <ImageForm
          initialData={image}
          isPending={editMutation.isPending}
          onSubmit={async (formData) => {
            await editMutation.mutateAsync({ id: image.id, data: formData });
            close();
          }}
        />
      )}
    </Modal>
  );
};

export const DeleteImageButton = ({ imageId }: { imageId: number }) => {
  const { deleteMutation } = useImageManagementActions();

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteMutation.mutate(imageId);
    }
  };

  return (
    <button disabled={deleteMutation.isPending} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-50" onClick={handleDelete}>
      {deleteMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
};

interface ImageFormProps {
  initialData?: { body: string; images?: Record<string, string> };
  onSubmit: (formData: FormData) => Promise<void>;
  isPending: boolean;
}

export const ImageForm = ({ initialData, onSubmit, isPending }: ImageFormProps) => {
  const [body, setBody] = useState(initialData?.body || '');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>(() => {
    if (initialData?.images) {
      return Object.values(initialData.images);
    }
    return [];
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setSelectedFiles((prev) => [...prev, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('body', body);
    selectedFiles.forEach((file) => {
      formData.append('multipartFiles', file);
    });

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-400">게시글 내용</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="내용을 입력해주세요."
          className="min-h-30 w-full rounded-2xl bg-slate-50 p-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-400">이미지 첨부</label>

        <div className="grid grid-cols-3 gap-4">
          {previews.map((url, index) => (
            <div key={url} className="relative aspect-square overflow-hidden rounded-lg border border-slate-200">
              <img src={url} alt="preview" className="h-full w-full object-cover" />
              <button type="button" onClick={() => removeFile(index)} className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600">
                <X size={12} />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400 transition-colors hover:border-blue-400 hover:bg-blue-50"
          >
            <Upload size={24} />
            <span className="text-xs">사진 추가</span>
          </button>
        </div>

        <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
      </div>

      <button
        type="submit"
        disabled={isPending || !body}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-4 font-bold text-white transition-all hover:bg-blue-600 disabled:bg-slate-300"
      >
        {isPending ? <Loader2 className="animate-spin" /> : '저장하기'}
      </button>
    </form>
  );
};
