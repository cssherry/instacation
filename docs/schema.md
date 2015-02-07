# Schema Information

## albums
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references users)
title       | string    | not null
location_id | integer   |

## followings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
follower_id | string    | not null, foreign key (references users)
follow_type | string    | not null
follow_id   | integer   | not null, foreign key (references users or locations)

## photos
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
album_id    | integer   | not null, foreign key (references album)
caption     | string    |
order       | integer   | default 0
photo_url   | string    | not null
cloudinary_id| string   | not null
location_id | integer   |

## locations
column name | data type | details
------------|-----------|-----------------------
id          | integer   |
street_number| integer   |
street      | integer   |
city        | integer   | not null
state       | integer   | not null
country     | string    | not null
place_id    | string    |

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
first_name      | string    | not null
last_name       | string    | not null
username        | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique
