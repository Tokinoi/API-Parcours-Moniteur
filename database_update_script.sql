-- Drop all existing tables
DROP TABLE IF EXISTS itineraries_pois CASCADE;
DROP TABLE IF EXISTS lists_pois CASCADE;
DROP TABLE IF EXISTS auth_codes CASCADE;
DROP TABLE IF EXISTS itineraries CASCADE;
DROP TABLE IF EXISTS lists CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS modification_requests CASCADE;
DROP TABLE IF EXISTS pois CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Points of Interest (POIs) Table
CREATE TABLE IF NOT EXISTS pois (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for location-based queries
CREATE INDEX IF NOT EXISTS idx_pois_location ON pois(latitude, longitude);
