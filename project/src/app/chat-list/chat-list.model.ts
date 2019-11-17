export type Chat = {
  my_data: userDetail;
  chat_list: Array<ChatList>;
};

export type EmptyChat = {
  id: number;
  full_name: string;
  avatar: string;
};

export type userDetail = {
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

export type ChatList = {
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
  messages: Array<Messages>;
};

export type Messages = {
  sender_id: number;
  timestamp: string;
  message: string;
};
