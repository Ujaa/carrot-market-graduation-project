import { AvatarColorType, EyeType, BodyType } from "@/lib/enum";
import { DocumentSnapshot, QueryDocumentSnapshot } from "firebase/firestore";

export interface IAvatar {
  bodyType: BodyType;
  eyeType: EyeType;
  eyeColor: AvatarColorType;
}

export interface IProfile {
  username: string;
  avatar: IAvatar;
}

export const profileConverter = {
  fromFirestore: (snapshot: DocumentSnapshot): IProfile => {
    const id = snapshot.id;
    const data = snapshot.data();
    return {
      username: data?.username,
      avatar: {
        bodyType: data?.avatar.bodyType,
        eyeType: data?.avatar.eyeType,
        eyeColor: data?.avatar.eyeColor,
      },
    };
  },
};
