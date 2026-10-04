const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://amkbuftsfyetbcypzyrk.supabase.co';
const supabaseService = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFta2J1ZnRzZnlldGJjeXB6eXJrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzIyNDc5MCwiZXhwIjoyMTAyODAwNzkwfQ.rDurfOgPwwOteu1kNf4gOhf1V-WIicHi7TFpPlQPK74';

const supabase = createClient(supabaseUrl, supabaseService);

const DEFAULT_GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80",
];

async function getDbPortfolioGalleryImages(locale = "en", prefix = "pf_gal") {
  try {
    const { data, error } = await supabase
      .from("site_content")
      .select("key, value, locale")
      .like("key", `${prefix}%`);

    console.log("DB Query error:", error, "data:", data);

    const map = {};
    if (data && !error) {
      data.forEach((row) => {
        if (row.value && (row.value.startsWith("http") || row.value.startsWith("/"))) {
          if (!map[row.key] || row.locale === locale) {
            map[row.key] = row.value;
          }
        }
      });
    }

    return Array.from({ length: 9 }).map((_, i) => {
      const key = `${prefix}${i + 1}`;
      return map[key] || DEFAULT_GALLERY_IMAGES[i % DEFAULT_GALLERY_IMAGES.length];
    });
  } catch (e) {
    console.error("Catch error:", e);
    return DEFAULT_GALLERY_IMAGES;
  }
}

getDbPortfolioGalleryImages("en", "pf_gal").then(res => console.log("Final Returned Gallery Images:", res));
