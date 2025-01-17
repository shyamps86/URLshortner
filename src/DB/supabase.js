import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = import.meta.env.VITE_PROJECTURL_KEY;
export const supabaseKey = import.meta.env.VITE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase

