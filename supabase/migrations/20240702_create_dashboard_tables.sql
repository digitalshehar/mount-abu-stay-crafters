
-- Car Rentals Table
CREATE TABLE IF NOT EXISTS public.car_rentals (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  transmission TEXT NOT NULL,
  price NUMERIC NOT NULL,
  image TEXT NOT NULL,
  bookings INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'available',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bike Rentals Table
CREATE TABLE IF NOT EXISTS public.bike_rentals (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  engine TEXT NOT NULL,
  price NUMERIC NOT NULL,
  image TEXT NOT NULL,
  bookings INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'available',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Adventures Table
CREATE TABLE IF NOT EXISTS public.adventures (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  duration TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  price NUMERIC NOT NULL,
  image TEXT NOT NULL,
  bookings INTEGER DEFAULT 0,
  rating NUMERIC DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  image TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.car_rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bike_rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.adventures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create default policies to allow all operations for now
-- These can be refined later as authentication is implemented
CREATE POLICY "Allow all operations on car_rentals" ON public.car_rentals FOR ALL USING (true);
CREATE POLICY "Allow all operations on bike_rentals" ON public.bike_rentals FOR ALL USING (true);
CREATE POLICY "Allow all operations on adventures" ON public.adventures FOR ALL USING (true);
CREATE POLICY "Allow all operations on blog_posts" ON public.blog_posts FOR ALL USING (true);
