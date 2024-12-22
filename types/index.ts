import { Category, Course, Purchase } from "@prisma/client";

export type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  progress: number | null;
  purchases: Purchase[] | null;
  sections: {
    chapters: { id: string }[];
  }[];
};
