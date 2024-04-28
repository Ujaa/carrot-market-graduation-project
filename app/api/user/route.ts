import { firestore } from "@/config/firebase/firebase";
import { COLLECTION_NAME_PROFILE } from "@/lib/constants";

import { profileConverter } from "@/model/profile";
import { getDoc, doc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    const profileDocSnap = await getDoc(
      doc(firestore, COLLECTION_NAME_PROFILE, id!)
    );

    const profile = profileConverter.fromFirestore(profileDocSnap);

    return NextResponse.json({ status: 200, profile });
  } catch (error) {
    console.error("[ERROR] Error white fetching profile Information: ", error);
    return NextResponse.json({ status: 500 });
  }
}
