# Description: #
You are able to register as a vendor and then login to be able to create job postings and can also see job postings without auth

# Getting Started: # 

for setup have a .env file where you specify the following:

```
DATABASE=${local_db_location}
PORT=8000
NODE_ENV=dev
```


You then run:

to install dependencies: 
`npm i`

to run integration tests:
`npm run test`

to run server locally:
`npm run dev`

# Features: #

Register user  
POST /user/register

------

```
body: 
{
    "email": "test@gmail.com",
    "password": "hello123",
    "type": "vendor",
    "otherInfo": {
        "companyName": "Lumaki",
        "address": "425 John St, Waterloo, Canada"
    }
}
```

------

to login  
POST /user/login
```
{
    "email": "test@gmail.com",
    "password": "hello123"
} 
```

will return token to use as bearer token for creating posts

------

to create post  
POST /posting/  

```
{
    "position" : "Software Engineer Intern",
    "description": "You can do cool stuff here!",
    "duration": "September - December 2021",
    "deadline": "July 24th, 2021"
} 
```

will need Bearer token recieved from login which will have company encoded, thus you don't need company in body  

------

to get post(s)  
GET posting/?company=Lumaki&title=soft


only supports queries -
```
company: needs to be exact match (case insensitive)
title: can be partial match (case insensitive) 
```


# Roadmap: #
- would continue with update/delete api
- would add more query parameters
- would add validation and testing for inputs like password requirements, description length, valid email address checks etc
- would add api for being able to create users who want notifications of certain postings (have architecture setup to extend to this)
- would add endpoints for admin usage
- would add a pending check when a vendor wants to be registered if the company does not exist (redo whole procedure where the company would need
exist in our db or the creation of company would have to be pending to avoid fraud company creations)

# Edge Cases: #
- did not add invalid or null validation for user input, so weird inputs will go through like super long description or invalid email/time

