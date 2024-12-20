import { IProductCategory } from './product-category';

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];
}
