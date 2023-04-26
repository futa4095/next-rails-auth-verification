import {
  createAdminAuthClient,
  createServerClient,
} from "@/lib/supabase-server";

export async function DELETE(request: Request) {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const id = session?.user.id ?? "";
  const adminAuthClient = createAdminAuthClient();
  const { error } = await adminAuthClient.deleteUser(id);
  if (error) {
    throw new Error(error.message);
  }
  return new Response("Success");
}
