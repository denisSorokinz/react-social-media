export interface IUser {
  _id: string;
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
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  location: string;
  description: string;
  userPicturePath: string;
  picturePath: string;
  likes: { [k: string]: string };
  comments: Array<string> | [];
}
