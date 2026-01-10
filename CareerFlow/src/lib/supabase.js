import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zjuslsgzlwjefyzxbtfq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqdXNsc2d6bHdqZWZ5enhidGZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwNDAzNjYsImV4cCI6MjA4MzYxNjM2Nn0.tyA2TXavvtIVpDUk_isDC9bTqQj1EwE1ik46cYlKi1I'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
