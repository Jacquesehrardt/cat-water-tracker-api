-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE cats (
   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
   cat_name VARCHAR(255) NOT NULL,
   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE consumptions (
   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
   cat_id UUID NOT NULL,
   volume NUMERIC(10,2) NOT NULL,
   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (cat_id) REFERENCES cats(id)
);

CREATE FUNCTION updated_at_trigger()
   RETURNS TRIGGER
   LANGUAGE plpgsql
AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$;

CREATE TRIGGER update_consumptions_update_at
   BEFORE UPDATE ON consumptions
   FOR EACH ROW
   EXECUTE FUNCTION updated_at_trigger();

CREATE TRIGGER update_cats_update_at
   BEFORE UPDATE ON cats
   FOR EACH ROW
   EXECUTE FUNCTION updated_at_trigger();