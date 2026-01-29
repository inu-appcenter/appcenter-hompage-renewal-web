import { activityApi } from 'entities/activity';
import { AddActivityForm, EditActivityForm } from 'features/activity';

export async function AdminActivityWritePage({ params }: { params: Promise<{ id?: string }> }) {
  const { id } = await params;

  const initialData = id ? await activityApi.getById(Number(id)) : undefined;

  if (initialData) {
    return <EditActivityForm initialData={initialData} />;
  } else {
    return <AddActivityForm />;
  }
}
