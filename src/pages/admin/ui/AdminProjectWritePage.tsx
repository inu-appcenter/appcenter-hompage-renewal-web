import { projectApi } from 'entities/project/api';
import { ProjectForm } from 'features/project';

export async function AdminProjectWritePage({ params }: { params: Promise<{ id?: string[] }> }) {
  const { id } = await params;

  const projectId = id?.[0];

  const initialData = projectId ? await projectApi.getById(Number(projectId)) : undefined;

  return <ProjectForm initialData={initialData} />;
}
