'use server';
import { updateTag } from 'next/cache';

export async function revalidateTag(tag: string) {
  try {
    updateTag(tag);
    console.log(`[Cache Debug] Successfully expired tag: ${tag}`);
  } catch (error) {
    console.error(`[Cache Error] Failed to expire tag ${tag}:`, error);
  }
}
