export interface ImageManagement {
  id: number;
  body: string;
  createdDate: string;
  lastModifiedDate: string;
  images: Record<string, string>;
}
