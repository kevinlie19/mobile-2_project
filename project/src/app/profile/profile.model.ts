export type Profile = {
  user: userDetail;
  post: Array<PostObject>;
};

export type userDetail = {
  id: number;
  email: string;
  username: string;
  full_name: string;
  password: string;
  telephone: string;
  location: string;
  avatar: string;
  gender: string;
  following: [];
  follower: [];
};

export type PostObject = {
  id: number;
  user_id: number;
  item_name: number;
  image_url: string;
  buy_date: Date;
  exp_date: Date;
  category: string;
  description: string;
  tag: 'AVAILABLE' | 'UNAVAILABLE' | 'EXPIRED';
};
