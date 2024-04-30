export interface NewsData {
  id: number;
  title: string;
  slug: string;
  body: string;
  image: string;
  created_at: string;
  updated_at: string;
  views: number;
  category: {
    id: number;
    name: string;
  };
}
