
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://sezhsqljmfuhjhucywok.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlemhzcWxqbWZ1aGpodWN5d29rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwMTU3MTQsImV4cCI6MjA1NjU5MTcxNH0.Pm28rlUAvMTr6Mc148DXf7LZokTJeKlfW93fQ5f-CQs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
