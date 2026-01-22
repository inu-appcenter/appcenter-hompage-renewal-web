import { Project } from 'entities/project';

export type IntroduceForm = Pick<Project, 'stack' | 'groups'>;

export type MainForm = Pick<Project, 'title' | 'subTitle' | 'isActive' | 'androidStoreLink' | 'appleStoreLink' | 'websiteLink'> & {
  appIcon: File | null;
  mockupImage: File | null;
};
