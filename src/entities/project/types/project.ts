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
  stack: string[];
  groups: string[];
}

export interface ProjectForm {
  body: string;
  multipartFiles: File[];
  title: string;
  subTitle: string;
  androidStoreLink: string;
  appleStoreLink: string;
  websiteLink: string;
  isActive: boolean;
  stackIds: string[];
  groupIds: string[];
}
