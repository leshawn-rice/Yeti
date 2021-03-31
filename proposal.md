# Yeti

Yeti will be a full-stack website & mobile app. The backend will use Node & Express, and the frontend will use
React for the website, and React Native for the mobile app.

The goal of this project is to create an app that allows users to anonymously create, view, and vote on text
posts. The text posts will only be visible to other users within a given radius

The target demographic of this app is primarily young adults (18-25), but the UI should be simple enough that
older users shouldn't have a negative user experience.

The data that this app will utilize is geolocation data based on a user's IP on the website, and geolocation data
based on the user's device location on the mobile app.

# The Approach
## Database Schema

### Table: Users

Columns: 
- ID (serial primary key)
- Email (text)
- Username (auto-generated)
- Posts (references Posts table)
- Comments (references Comments table)
- Karma (name will change to something that doesn't rip off reddit)

### Table: Posts
Columns:
- ID (serial primary key)
- Title (text)
- Body (text)
- Comments (references Comments table)
- User_ID (references Users table)
- Karma (name will change to something that doesnt rip off reddit)
	
### Table: Comments
Columns:
- ID (serial primary key)
- User_ID (references Users table)
- Post_ID (references Posts table)
- Body (text)
- Karma (name will change …)

### Table: Searches (for internal use to see what users are searching for)
Columns:
- ID (serial primary key)
- User_ID (references Users table)
- Query (text)



## Sensitive Information
 The user locations are sensitive information that I will likely obfuscate in the database. I can achieve this by just using bcrypt on either the IP Address or the Long/Lat of the user (will need to figure out exactly how to store location data based on react native)

## Functionality
The features of this app will include:
1. Create a post
2. Comment on a post
3. Upvote/Downvote a post
4. Delete a post
5. Favorite/Save a post
6. Recover account (via email)
7. Delete account
8. Create public groups (no private, may be problematic)

## User Flow
The User flow will look something like:
1. Login/Signup
2. Browse nearby posts
3. Search for something
4. Upvote/Downvote some posts
5. Check any groups you belong to
6. Navigate away

## What makes this more than just a CRUD app?
The features that make this more than just a crud app, is that the posts you see are based on your current location.
 
Some stretch goals for this app are
1. Update post radius (which posts can be seen) based on population of their current location
2. Add filters, so if users didn't want to see posts with a certain keyword (yams, microsoft, twitch etc) they could filter those out of their feed
