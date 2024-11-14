export interface IPost {
  id: number;
  post_name: string;
  post_content: string;
  slug: string;
  img_thumbnail: string;
  user_id: number;
  category_id: number;
  featured: boolean;
  status: boolean;
}
