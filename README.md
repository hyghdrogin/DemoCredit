
# DEMO CREDIT

Demo Credit is a mobile lending app that requires wallet functionality. This is needed as borrowers need a wallet to receive the loans they have been granted and also send the money for repayments.

# DOCUMENTATION
A detailed documentation of the api can be found here: [API Documentation](https://documenter.getpostman.com/view/21130368/2s8ZDU4PXg)

E-R Diagram can be found [here](https://drive.google.com/file/d/1xLeE-ohwA2WURx1uJJ8rN_Fo_KJnXIKk/view?usp=share_link)

- Run Project Locally

- Clone the project

- cd into the project's folder and run npm install to install dependencies

- Create a .env file and check src/config/index.ts folder for all environment keys.

- Run npm run migrate to seed data into the database

- Run npm run seed to seed data into the database

- Run npm run dev to start the server

# HTTP Request

All API requests are made by sending a secure HTTPS request using one of the following methods:

- POST Create a resource

- GET Get a resource or list of resources

- PATCH updates a resource or list of resources

- DELETE deletes a resource or list of resources

For POST, the body of your request must be a JSON payload.

# HTTP Response Code

Each response will be returned with one of the following HTTP status codes:

- 200 OK Successful request

- 400 Bad Request There was a problem with the request

- 500 Server Error Server error
