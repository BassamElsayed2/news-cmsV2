import supabase from "./supabase";

export async function getNews() {
  const { data, error } = await supabase.from("news").select("*"); 

  if (error) {
    console.error("فشل في جلب البيانات:", error.message);
    throw new Error("فشل في تحميل الأخبار");
  }

  return data;
}



// get news by id

export async function getNewsById(id) {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
    if (!data) throw new Error("الخبر غير موجود");

  return data;
}