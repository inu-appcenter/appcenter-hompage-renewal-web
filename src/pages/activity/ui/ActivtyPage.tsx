import { activityApi } from 'entities/activity';
import { ImageSection } from './ImageSection';
import { ImageTransitionSection } from './ImageTransitionSection';
import { MainSection } from './MainSection';

export async function ActivityPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const data = await activityApi.getById(id);

  return (
    <>
      <MainSection data={data} />
      <ImageTransitionSection data={data} />
      {data.contents.map((content, index) => (
        <ImageSection key={index} data={content} />
      ))}
    </>
  );
}
