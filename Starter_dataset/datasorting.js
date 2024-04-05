// how i handled it:
/*
--------------------------------------------------------
first i imported the csv file into the database with MySQL workbench
and chose these collumns for the new table:
|location_name|parameter|value|unit|datetimeUtc|
--------------------------------------------------------
i wanted another structure so i made a new table that looked like this:
|datetime|no2|pm10|pm25|location|
with this code:
CREATE TABLE aq_knarrdalstranda (
    datetimeUtc DATETIME,
    no2 FLOAT,
    pm10 FLOAT,
    pm25 FLOAT,
    location VARCHAR(255)
);
--------------------------------------------------------
then i transfered the information i wanted with this:

INSERT INTO aq_knarrdalstranda (datetimeUtc, no2, pm10, pm25, location)
SELECT 
    datetimeUtc,
    MAX(CASE WHEN parameter = 'no2' THEN value END) AS no2,
    MAX(CASE WHEN parameter = 'pm10' THEN value END) AS pm10,
    MAX(CASE WHEN parameter = 'pm2.5' THEN value END) AS pm25,
    location_name AS location
FROM 
    openaq_location_10592_measurements
GROUP BY 
    datetimeUtc, location_name;
--------------------------------------------------------
i decided later the location wasnt realy needed as it was in the table name.
i ran :

ALTER TABLE aq_knarrdalstranda DROP COLUMN location;
--------------------------------------------------------

all in all i dont know if this is the most efficient way to do it.

*/