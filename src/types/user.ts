export interface iUser {
  id?: string;
  name: string;
  username: string;
  email?: string;
  emailVerified?: string;
  verified: boolean;
  image: string;
  description: string;
  website: string;
  linkedinUrl: string;
  twitterUrl: string;
}