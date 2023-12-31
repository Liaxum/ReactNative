import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_ANON_KEY, SUPABASE_URL } from './constant'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  // @ts-ignore
  localStorage: AsyncStorage as any,
})

export default supabase;