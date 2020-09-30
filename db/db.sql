CREATE TABLE resturants(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    price_range INT NOT NULL CHECK (price_range >=1 AND price_range <=5)
)

CREATE TABLE reviews(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    resturant_id  BIGINT NOT NULL REFERENCES resturants(id), 
    name VARCHAR(255) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL CHECK ( rating >=1 AND rating <=5)
)