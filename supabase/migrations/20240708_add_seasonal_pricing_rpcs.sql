
-- Create RPC for inserting seasonal pricing
CREATE OR REPLACE FUNCTION insert_seasonal_pricing(
  p_hotel_id BIGINT,
  p_name TEXT,
  p_start_date DATE,
  p_end_date DATE,
  p_price_multiplier NUMERIC
) RETURNS VOID AS $$
BEGIN
  INSERT INTO seasonal_pricing (
    hotel_id, 
    name, 
    start_date, 
    end_date, 
    price_multiplier
  ) VALUES (
    p_hotel_id,
    p_name,
    p_start_date,
    p_end_date,
    p_price_multiplier
  );
END;
$$ LANGUAGE plpgsql;

-- Create RPC for deleting all seasonal pricing for a hotel
CREATE OR REPLACE FUNCTION delete_seasonal_pricing_by_hotel(
  p_hotel_id BIGINT
) RETURNS VOID AS $$
BEGIN
  DELETE FROM seasonal_pricing
  WHERE hotel_id = p_hotel_id;
END;
$$ LANGUAGE plpgsql;
