# E-Survey
## Deployment Checklist
- **Dynamic Port Binding**: Heroku tells us which port our app will use, so we listen to that
- **Specify Node Environment**: We want to use a specific version of node, so we need to tell Heroku which version we want
- **Specify start script**: Instruct Heroku what command to run to start our server running
- **Create `.gitignore` file**: We don't want to include dependencies, Heroku will do that for us
