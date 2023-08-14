# bloglist-react-test-app

## Simple react app for developing React Skills

![Main page of the application](/images/main-page.png)

## How to use?

<ol>
 <li>Clone the repository to your machine: git clone https://github.com/rodrigogarcia1986/bloglist-react-test-app/new/main?readme=1</li>
 <li>In the CLI, use "NPM INSTALL"</li>  
<li>Configure your env variables (server's secret, PORT and credentials for using MongoDB)</li>
</ol>

#### You're ready to use it as you please!

## Functionalities

Users may:

<ul>
    <li>sign-up</li>
    <li>login</li>
    <li>see registered users</li>
    <li>add/edit/delete blogs</li>
    <li>see blogs' details</li>
    <li>make/see comments</li>
</ul>

## Structure

### General

Backend uses Node.Js and Express and Frontend uses React.
For state management both redux and React's built-in useState are used, database uses MongoDB (a simple free-account) and there are only two models.
Styles are defined by means of styled-components and can be modified in the styles.js file.

### Backend

There are basically 3 endpoints:

![Basic endpoints](/images/endpoints.png)

<h3>The app's backend is simple Node.Js using express and the dependencies:<h3>
<ul>
    <li>bcrypt": "^5.1.0"</li>
    <li>"cors": "^2.8.5",</li>
    <li>"cross-env": "^7.0.3"</li>
    <li>"dotenv": "^16.1.4"</li>
    <li>"express-async-errors": "^3.1.1"</li>
    <li>"jsonwebtoken": "^9.0.0"</li>
    <li>"mongoose": "^7.2.4"</li>
    <li>"mongoose-unique-validator": "^4.0.0"</li>
</ul>
<p>There are some testing dependencies that were previously used but not updated for the final app. So one would use or discard it.<p>

### Frontend

Using React, the frontend also includes the following dependencies:

<ul>
<li>"@reduxjs/toolkit": "^1.9.5" - unused</li>
<li>"@tanstack/react-query": "^4.32.6" - unused</li>
<li>"@testing-library/jest-dom": "^5.16.5" - unused</li>
<li>"@testing-library/react": "^13.4.0" - unused</li>
<li>"@testing-library/user-event": "^13.5.0" - unused</li>
<li>"axios": "^1.2.3"</li>
<li>"prop-types": "^15.8.1"</li>
<li>"react": "^18.2.0"</li>
<li>"react-dom": "^18.2.0"</li>
<li>"react-query": "^3.39.3"</li>
<li>"react-redux": "^8.1.2"</li>
<li>"react-router-dom": "^6.14.2"</li>
<li>"react-scripts": "5.0.1"</li>
<li>"styled-components": "^6.0.7"</li>
<li>"web-vitals": "^2.1.4" - unused</li>
</ul>
Here again there are some testing dependencies that were previously used but not updated for the final app. So one would use or discard it.
