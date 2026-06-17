import type { ArticleCard } from './column';
import { client } from './microcms';

type RoadmapPoint = string | {
  text?: string;
  title?: string;
  content?: string;
};

export type RoadmapStep = {
  id: string;
  title: string;
  stepNumber: number;
  lead: string;
  description: string;
  points?: RoadmapPoint[];
  relatedArticles?: ArticleCard[];
};

const noStoreRequestInit = {
  cache: 'no-store',
} satisfies RequestInit;

export function getRoadmapPointText(point: RoadmapPoint) {
  if (typeof point === 'string') {
    return point;
  }

  return point.text ?? point.title ?? point.content ?? '';
}

export async function getRoadmapSteps(): Promise<RoadmapStep[]> {
  const steps = await client.getAllContents<RoadmapStep>({
    endpoint: 'roadmap',
    queries: {
      fields: 'id,title,stepNumber,lead,description,points,relatedArticles',
      orders: 'stepNumber',
      depth: 2,
    },
    customRequestInit: noStoreRequestInit,
  });

  return steps.sort((a, b) => a.stepNumber - b.stepNumber);
}
