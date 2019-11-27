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
  phone_number: string;
  location: string;
  avatar: string;
  gender: string;
  following: [];
  follower: [];
};

export type PostObject = {
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
};

export type Friend = {
  id: number;
  email: string;
  username: string;
  full_name: string;
  phone_number: string;
  location: string;
  avatar: string;
  gender: string;
  following: [];
  follower: [];
};
