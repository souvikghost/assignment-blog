import type { Category } from "../lib/constant";

export interface Blog {
  id: number;
  title: string;
   category: Category[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
}

export type FormErrors = {
  title?: string;
  coverImage?: string;
  description?: string;
  content?: string;
  category?: string;
};