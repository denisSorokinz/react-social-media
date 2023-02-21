export interface IUser {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  picturePath: string;
  friends: Array<IUser> | [];
  location: string;
  occupation: string;
  viewedProfile: number;
  impressions: number;
}

export interface IPost {
  _id: number;
  userId: string;
  firstName: string;
  lastName: string;
  location: string;
  description: string;
  userPicturePath: string;
  picturePath: string;
  likes: Map<string, boolean>;
  comments: Array<string> | [];
}
