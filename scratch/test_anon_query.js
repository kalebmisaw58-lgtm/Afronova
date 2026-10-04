const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://amkbuftsfyetbcypzyrk.supabase.co';
// Public Anon Key used by browser client!
const supabaseAnon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFta2J1ZnRzZnlldGJjeXB6eXJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcyMjQ3OTAsImV4cCI6MjEwMjgwMDc5MH0.KZQJx4BGUUBd09BjTqX_DKrZ5Jln3ZGLmfQCVz_99-s';

const supabase = createClient(supabaseUrl, supabaseAnon);

async function testAnon() {
  const { data, error } = await supabase.from('site_content').select('*').like('key', 'pf_gal%');
  console.log("Anon Query Error:", error);
  console.log("Anon Query Data Count:", data ? data.length : 0);
  console.log("Anon Data:", data);
}

testAnon();
