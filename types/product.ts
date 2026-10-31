import { LucideIcon } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  slug: string;

  category: string;
  material?: string;
  process?: string;
  industry?: string;

  image: string;
  gallery?: string[];

  description?: string;

  tolerance?: string;
  finish?: string;

  dimensions?: string;
  weight?: string;

  moq?: number;

  featured?: boolean;
  inStock?: boolean;

  icon?: LucideIcon;

  tags?: string[];
}
