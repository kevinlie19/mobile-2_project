export type Feeds = {
  id: number;
  user_id: number;
  item_name: string;
  image: string;
  buy_date: string;
  exp_date: string;
  category: string;
  description: string;
  tag: 'Available' | 'Unavailable' | 'Expired';
  timestamp: string;
  username: string;
  full_name: string;
  location: string;
  avatar: string;
};
