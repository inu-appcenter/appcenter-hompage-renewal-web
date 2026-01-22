import { useProjectActions } from 'entities/project';
import { convertURLtoFile } from 'shared/utils/convertURLtoFile';

interface ProjectSubmitPayload {
  title: string;
  subTitle: string;
  isActive: boolean;
  androidStoreLink?: string;
  appleStoreLink?: string;
  webSiteLink?: string;
  body?: string;
  stackIds?: number[];
  groupIds?: number[];
  // 순서 중요: [앱 아이콘, 목업 이미지]
  images: Array<File | string | null>;
}

interface EditProjectSubmitProps {
  mode: 'edit';
  projectId: number;
  onSuccess: () => void;
}
interface AddProjectSubmitProps {
  mode: 'create';
  onSuccess: () => void;
}

export const useProjectSubmit = (props: EditProjectSubmitProps | AddProjectSubmitProps) => {
  const { addMutation, editMutation } = useProjectActions();

  const isPending = props.mode === 'create' ? addMutation.isPending : editMutation.isPending;

  const submit = async (payload: ProjectSubmitPayload) => {
    const formData = new FormData();

    // 1. 기본 텍스트 데이터
    formData.append('title', payload.title);
    formData.append('subTitle', payload.subTitle);
    formData.append('body', payload.body || '');
    formData.append('isActive', String(payload.isActive));
    formData.append('androidStoreLink', payload.androidStoreLink || '');
    formData.append('appleStoreLink', payload.appleStoreLink || '');
    formData.append('webSiteLink', payload.webSiteLink || '');

    // 2. 이미지 처리 로직 (File이면 그대로, URL이면 변환)
    const filePromises = [...payload.images].map(async (item) => {
      if (!item) return null;
      if (item instanceof File) return item; // 이미 파일이면 그대로 반환
      if (typeof item === 'string') {
        try {
          return await convertURLtoFile(item); // URL이면 파일로 변환
        } catch (error) {
          console.error('이미지 변환 실패:', item, error);
          return null;
        }
      }
      return null;
    });

    const files = await Promise.all(filePromises);

    files.forEach((file) => {
      if (file) formData.append('multipartFiles', file);
    });

    if (payload.stackIds) payload.stackIds.forEach((id) => formData.append('stackIds', String(id)));
    if (payload.groupIds) payload.groupIds.forEach((id) => formData.append('groupIds', String(id)));

    if (props.mode === 'create') {
      addMutation.mutate(formData, { onSuccess: props.onSuccess });
    } else {
      editMutation.mutate({ data: formData, id: props.projectId }, { onSuccess: props.onSuccess });
    }
  };

  return {
    submit,
    isPending
  };
};
