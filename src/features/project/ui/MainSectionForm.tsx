'use client';
import { ChangeEvent, MouseEvent } from 'react';
import { ProjectFormType, StepType } from '../types/form';
import { AppIconUploader, LinkInput, MockupImageUploader, SubTitleInput, TitleInput, ToggleActiveButton } from './main-section';

interface MainSectionFormProps {
  form: ProjectFormType;
  setForm: React.Dispatch<React.SetStateAction<ProjectFormType>>;
  setStep: React.Dispatch<React.SetStateAction<StepType>>;
}
export const MainSectionForm = ({ form, setForm }: MainSectionFormProps) => {
  const handleInputChange = (key: keyof ProjectFormType) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleImageUpload = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setForm((prev) => {
        const newImages = [...prev.images];
        const existingImage = newImages[index];
        newImages[index] = { id: existingImage.id, url: previewUrl, file };
        return { ...prev, images: newImages };
      });
    }
  };

  const handleRemoveImage = (index: number) => (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setForm((prev) => {
      const newImages = [...prev.images];
      const existingImage = newImages[index];
      newImages[index] = { id: existingImage.id, url: '' };
      return { ...prev, images: newImages };
    });
  };

  return (
    <section className="relative flex w-full flex-col px-8 pt-8 text-white">
      <div className="flex w-full flex-row justify-between gap-6 pb-24">
        <div className="flex w-140 flex-1 flex-col gap-6">
          <div className="flex flex-row items-start gap-6">
            <AppIconUploader imageFile={form.images[0].url} onUpload={handleImageUpload(0)} onRemove={handleRemoveImage(0)} />
            <ToggleActiveButton isActive={form.isActive} onClick={() => setForm((prev) => ({ ...prev, isActive: !prev.isActive }))} />
          </div>
          <TitleInput form={form} onChange={handleInputChange} />
          <SubTitleInput form={form} onChange={handleInputChange} />
          <LinkInput form={form} onChange={handleInputChange} />
        </div>
        <MockupImageUploader imageFile={form.images[1].url} onUpload={handleImageUpload(1)} onRemove={handleRemoveImage(1)} />
      </div>
    </section>
  );
};
