# Schema Information

## albums
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references users)
title       | string    | not null
photo_id    | integer   | not null, foreign key (references thumbnail pic)

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
author_id   | integer   | not null, foreign key (references users)
album_id    | integer   | not null, foreign key (references album)
caption     | string    |
order       | integer   | default 0.0
photo_url   | string    | not null

## locations
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
label       | string    | not null, unique

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
album_id    | integer   | not null, foreign key (references album)
location_id | integer   | not null, foreign key (references location)

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
first_name      | string    | not null, unique
last_name       | string    | not null, unique
username        | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique
