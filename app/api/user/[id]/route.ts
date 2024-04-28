import { firestore } from "@/config/firebase/firebase";
import { COLLECTION_NAME_PROFILE } from "@/lib/constants";

import { profileConverter } from "@/model/profile";
import { getDoc, doc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

interface UserParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: UserParams) {
  const userId = params.id;

  try {
    const profileDocSnap = await getDoc(
      doc(firestore, COLLECTION_NAME_PROFILE, userId!)
    );

    if (profileDocSnap.exists()) {
      const profile = profileConverter.fromFirestore(profileDocSnap);
      return NextResponse.json({ status: 200, profile });
    }
    return NextResponse.json({ status: 400 });
  } catch (error) {
    console.error("[ERROR] Error white fetching profile Information: ", error);
    return NextResponse.json({ status: 500 });
  }
}
