# E-Survey
## Features
- Integrated **Create-React-App** frontend with a **NodeJS** + **Express** backend
- Provided data maintenance and communication with **MongoDB**
- Enhanced authentication flows with **Google OAuth authentication** 
- Utilized **Stripe** APIs to process credit cards and payments from users
- Implemented reusable user inputs for survey form using **Redux Form**
- Supported email automation and handled feedback webhooks with **SendGrid**
## Deployment Checklist
- **Dynamic Port Binding**: Heroku tells us which port our app will use, so we listen to that
- **Specify Node Environment**: We want to use a specific version of node, so we need to tell Heroku which version we want
- **Specify start script**: Instruct Heroku what command to run to start our server running
- **Create `.gitignore` file**: We don't want to include dependencies, Heroku will do that for us