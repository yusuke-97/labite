import type { ArticleCard } from './column';
import { client, cmsRequestInit } from './microcms';

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
    customRequestInit: cmsRequestInit,
  });

  return steps.sort((a, b) => a.stepNumber - b.stepNumber);
}
