import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://qesknynvufjftndxrmdz.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlc2tueW52dWZqZnRuZHhybWR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMDc5MzIsImV4cCI6MjAyNDY4MzkzMn0.KNHMhbiWnJHAP-3skEPWnrgV-91x3ndD1dwz7yPuKnI';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
