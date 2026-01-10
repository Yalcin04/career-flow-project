import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://smxgvwrpicnijukruydo.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_w12TLNyUhvLYATq6VxLzMg_mct9SYcK'

export const supabase = createClient(supabaseUrl, supabaseKey)
