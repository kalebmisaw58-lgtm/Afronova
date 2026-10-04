const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://amkbuftsfyetbcypzyrk.supabase.co';
const supabaseService = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFta2J1ZnRzZnlldGJjeXB6eXJrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzIyNDc5MCwiZXhwIjoyMTAyODAwNzkwfQ.rDurfOgPwwOteu1kNf4gOhf1V-WIicHi7TFpPlQPK74';

const supabase = createClient(supabaseUrl, supabaseService);

async function check() {
  const { data, error } = await supabase.from('site_content').select('*');
  console.log("Site Content Count:", data?.length, "Error:", error);
  console.log("Rows:", data);
}

check();
