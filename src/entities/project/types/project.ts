export interface Project {
  id: number;
  body: string;
  createdDate: string;
  lastModifiedDate: string;
  title: string;
  subTitle: string;
  androidStoreLink: string;
  appleStoreLink: string;
  websiteLink: string;
  isActive: boolean;
  images: Record<string, string>;
  stack: number[];
  groups: number[];
}
