import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type UserType = {
  uid: string;
  email: string | null;
  displayName: string | null;
  verified: boolean;
};

type UserProfile = UserType | null;

type UserToken = string | null;

export const userAtom = atomWithStorage<UserProfile>("user_profile", null);
export const userTokenAtom = atomWithStorage<UserToken>("user_token", null);
