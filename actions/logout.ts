"use server";

import * as auth from "@/auth";

export async function logout() {
  return auth.signOut();
}
