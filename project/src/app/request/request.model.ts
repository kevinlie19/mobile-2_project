export type myRequests = {
  user_data: userData;
  post_data: postData;
  status: string;
};

export type userData = {
  avatar: string;
  full_name: string;
  location: string;
};

export type postData = {
  item_name: string;
  image: string;
};

export type Request = {
  user_data: userData;
  post_data: postData;
  status: string;
};
