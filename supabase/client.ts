import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://vgfimzfmtiyzwprpdsqq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnZmltemZtdGl5endwcnBkc3FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUwMjY4NDUsImV4cCI6MjAxMDYwMjg0NX0.3dK7EItpfVFKuDLiWIQXI8Gkj2oZ8EuZ0du-vaste4E",
);