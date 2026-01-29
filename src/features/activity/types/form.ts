import { Activity } from 'entities/activity';

export type ActivityForm = Omit<Activity, 'id' | 'createdDate' | 'lastModifiedDate' | 'thumbnail' | 'contents'> & {
  thumbnail: File | string | null; // 썸네일 이미지 파일
  contents: Array<{
    id: number;
    subTitle: string;
    text: string;
    imageUrls: Array<File | string>;
    sequence: number;
  }>;
};
