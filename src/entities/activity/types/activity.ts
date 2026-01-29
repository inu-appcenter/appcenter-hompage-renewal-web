export interface ActivityContent {
  id: number;
  subTitle: string;
  text: string;
  imageUrls: string[] | [];
  sequence: number;
}
export interface Activity {
  readonly id: number;
  readonly createdDate: string;
  readonly lastModifiedDate: string;
  body: string;
  title: string;
  author: string;
  thumbnail: string;
  contents: ActivityContent[];
  titleEng: string;
}
export type ActivityMetaData = Omit<Activity, 'id' | 'createdDate' | 'lastModifiedDate' | 'thumbnail' | 'contents'> & {
  contents: Array<{
    contentId: number;
    subTitle: string;
    text: string;
  }>;
};
