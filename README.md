
[![Build Status](https://travis-ci.org/BonifaceMaina/freementors.svg?branch=ft-api-admin-delete-session-review-168022022)](https://travis-ci.org/BonifaceMaina/freementors)
[![Maintainability](https://api.codeclimate.com/v1/badges/79c528f6c6dd6e23b15b/maintainability)](https://codeclimate.com/github/BonifaceMaina/freementors/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/BonifaceMaina/freementors/badge.svg?branch=ft-api-signup-168022030)](https://coveralls.io/github/BonifaceMaina/freementors?branch=ft-api-signup-168022030)

# FreeMentors
Free Mentors is a social initiative where accomplished professionals become role models to young people to provide free mentorship sessions.

## FreeMentors Features
Users can:
- Sign Up
- Sign In
- View All Mentors
- Create Sessions
- Create Session Reviews
- View all their sessions

Mentors can:
- View all their sessions
- Accept requested sessions
- Reject requested sessions

Admin can:
- Upgrade user to mentor
- Delete Session Reviews.

## API Endpoints
| Resource URL | Methods | Description |
| -------- | ------------- | --------- |
| `/api/v1/auth/signup` | POST  | Creates a user account |
| `/api/V1/auth/signin/` | POST  | Logs in a user |
| `/api/v1/users/:userId/` | PATCH  | Change a user to a mentor |
| `/api/v1/mentors/` | GET  | Lists all mentors |
| `/api/v1/mentors/:mentorId` | GET  | Lists one mentor |
|  `/api/v1/sessions/` | POST | Creates a mentorship session request |
|  `/api/v1/sessions/` | GET | Mentor/mentee sees all mentorship session requests |
|  `/api/v1/sessions/:sessionId/accept` | PATCH | Mentor accepts a mentorship session request |
|  `/api/v1/sessions/:sessionId/reject` | PATCH | Mentor rejects a mentorship session request |
|  `/api/v1/sessions/:sessionId/review` | POST | Review a mentor after a mentorship session |
|  `/api/v1/sessions/:sessionId/review` | DELETE | Delete a mentorship session review |

## UI Templates 
The UI templates are located at [Free Mentors](https://bonifacemaina.github.io/freementors/UI/)

## Heroku Deployment
The API is hosted on Heroku [here](https://freementorsapi.herokuapp.com/)

## Project Prerequisites 
The project is built on [NodeJS](https://nodejs.org/en/)

View the [Pivotal Tracker stories](https://www.pivotaltracker.com/n/projects/2381456)

View the project endpoint documentation on [SwaggerHub](https://app.swaggerhub.com/apis/Personal969/freementorsAPI/1.0.0#/)

Clone the repo into your desired folder

``` 
git clone https://github.com/BonifaceMaina/brightevents.git
```

Install project requirements

```
npm i
```

Run the tests

```
npm test
```

## Author
Created by Boniface Maina.

## Acknowledgements
[Andela](https://andela.com/)
