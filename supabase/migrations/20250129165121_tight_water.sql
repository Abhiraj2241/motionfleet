/*
  # Initial Schema Setup for MotionFleet

  1. New Tables
    - `drivers`
      - Basic driver information and verification status
    - `vehicles`
      - Vehicle details for registered drivers
    - `ad_campaigns`
      - Campaign information and targeting
    - `campaign_analytics`
      - Real-time analytics for campaigns
    - `chat_history`
      - Store chat interactions for AI training
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drivers table
CREATE TABLE IF NOT EXISTS drivers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  license_number text,
  verification_status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  driver_id uuid REFERENCES drivers(id),
  make text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  plate_number text NOT NULL,
  screen_size text,
  screen_resolution text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Ad Campaigns table
CREATE TABLE IF NOT EXISTS ad_campaigns (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  advertiser_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  description text,
  budget decimal NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  target_audience jsonb,
  status text DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Campaign Analytics table
CREATE TABLE IF NOT EXISTS campaign_analytics (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id uuid REFERENCES ad_campaigns(id),
  date date NOT NULL,
  impressions integer DEFAULT 0,
  clicks integer DEFAULT 0,
  engagement_rate decimal,
  location_data jsonb,
  created_at timestamptz DEFAULT now()
);

-- Chat History table
CREATE TABLE IF NOT EXISTS chat_history (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id),
  message text NOT NULL,
  is_bot boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read own driver profile"
  ON drivers FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own driver profile"
  ON drivers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own driver profile"
  ON drivers FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read own vehicles"
  ON vehicles FOR SELECT
  TO authenticated
  USING (driver_id IN (
    SELECT id FROM drivers WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can manage own vehicles"
  ON vehicles FOR ALL
  TO authenticated
  USING (driver_id IN (
    SELECT id FROM drivers WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can read own campaigns"
  ON ad_campaigns FOR SELECT
  TO authenticated
  USING (advertiser_id = auth.uid());

CREATE POLICY "Users can manage own campaigns"
  ON ad_campaigns FOR ALL
  TO authenticated
  USING (advertiser_id = auth.uid());

CREATE POLICY "Users can read own campaign analytics"
  ON campaign_analytics FOR SELECT
  TO authenticated
  USING (campaign_id IN (
    SELECT id FROM ad_campaigns WHERE advertiser_id = auth.uid()
  ));

CREATE POLICY "Users can read own chat history"
  ON chat_history FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own chat messages"
  ON chat_history FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());