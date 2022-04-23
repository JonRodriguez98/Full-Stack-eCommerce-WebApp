# Full-Stack-eCommerce-WebApp
<h2>End to End Full-Stack eCommerce WebApp: Spring Boot and Angular</h2>

<h3>Current Version: 1.0</h3>
<br>
<h4>Version 1.0</h4>
This version of the application displays the information retrieved from a database on the client.
The purpose of this application is to show the ability to connect the Front-end, Back-end and Database of the eCommerce Application.

<h4>How does it work?</h4>

The Back-End is a Spring Boot application that handle HTTP requests through REST APIs. Accesses the Database using CRUD methods from JPA, and returns the data as JSON to the front-End Angular application.

The Front-End Angular App service sends a request to the REST API through an HTTP GET request, if the response is successful after the Server handles the request, the Front-End Service recieves the JSON data as an Array. The main content component (Product.list.component.ts) accesses that data recieved by making the service a dependency and accessing it through a constructor. This allows the component to access the method which returns the array of JSON objects recieved by the service. This Array is then placed within a local array local to the main component. Finally the HTML of the component which is linked to the TypeScript file accesses the components looping through the Array of JSON objects, accessing the individual key value pairs and displaying them on screen.

The Database holds the information of each individual product.
