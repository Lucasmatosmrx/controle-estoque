import { from } from "core-js/core/array";
import useSupabase from "src/boot/supabase";
import useAuthUser from "./UseAuthUser";

export default function useApi() {
  const supabase = useSupabase();
  const { user } = useAuthUser();

  const list = async () => {
    const { data, error } = await supabase.from(table).select("*");
    if (error) throw error;
    return data;
  };
  const getByid = async (table, id) => {
    const { data, error } = await supabase.from(table).select("*").eq("id", id);
    if (error) throw error;
    return data[0];
  };
  const post = async (table, form) => {
    const { data, error } = await supabase.from(table).insert([
      {
        ...from,
        user_id: user.value.id,
      },
    ]);
    if (error) throw error;
    return data;
  };
  const update = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .update([...from])
      .match({ id: form.id });
    if (error) throw error;
    return data;
  };

  const remove = async (table, id) => {
    const { data, error } = await supabase
      .from(table)
      .delete()
      .match({ id: id });
    if (error) throw error;
    return data;
  };

  return {
    list,
    getByid,
    post,
    update,
    remove,
  };
}
