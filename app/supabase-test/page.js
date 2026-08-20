import { supabase } from "../../lib/supabase";

export default async function SupabaseTestPage() {
  const { data, error } = await supabase.from("test").select("*").limit(1).maybeSingle();

  if (error) {
    return <p>Error fetching row: {error.message}</p>;
  }

  if (!data) {
    return <p>No rows found in the test table.</p>;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
