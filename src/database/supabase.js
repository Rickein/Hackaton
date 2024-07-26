const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ggjuytdnorpbymeyxfnx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnanV5dGRub3JwYnltZXl4Zm54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2OTIyODcsImV4cCI6MjAzNzI2ODI4N30.bMNPEqQi6fYD2ooWQe1-378n1qIedrEvsTzJFE0E3wU';
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;