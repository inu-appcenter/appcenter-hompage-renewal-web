export interface OurTeam {
  title: string;
  partName: string;
  description: string;
  techStack: string[];
  icon: React.ReactNode;
  motionProps?: {
    x?: string[];
    y?: string[];
    scale?: number[];
    rotate?: number[];
  };
}
