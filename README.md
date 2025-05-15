# Wordpress 2 API

API for Wordpress 2

## Description

This is the API for Wordpress 2, the sequel to Wordpress. This repo contains all the CRUD operations for blog posts and comments.
Admin actions should be gated behind authentication (CRUD operations on posts and comments).

## Notes

- Data model will likely need 3 entities:

  - Posts
  - Comments
  - Users

- Posts will contain

  - Title
  - Body
  - Author
  - Date Created
  - Date Updated
  - Comments? (relationship to comments)

- Comments will contain

  - Body
  - Author
  - Date Created

- Users will contain

  - Username
  - Password
  - IsAdmin
  - Posts? (relationship to posts)

- Authentication will be done using JWT tokens
- Admin actions will be gated behind authentication
- All data will be stored in a PostgreSQL database
