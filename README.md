# Full-Stack-eCommerce-WebApp
<h2>End to End Full-Stack eCommerce WebApp: Spring Boot and Angular</h2>

<h3>Current Version: 2.0</h3>
<br>
<h4>Version 1.0</h4>
This version of the application displays the information retrieved from a database on the client.
The purpose of this application is to show the ability to connect the Front-End, Back-End and Database of the eCommerce Application.


<h4>Version 2.0</h4>
This version of the application adds the search functionality, item description view, pagination, and shopping cart functionality.
The purpose of version 2.0 is to allow users to view more information on individual products, display an organized list of products and allow users to manipulate their shopping cart.

<h4>How does it work?</h4>

The <em>Back-End</em> is a Spring Boot application that handles HTTP requests through REST APIs. Accesses the Database using CRUD methods from JPA, and returns the data as JSON to the Front-End Angular service.

The <em>Front-End Angular App</em> service sends a request to the REST API through an HTTP GET request. If the request is successful, the Back-End Server handles the request, the Front-End Service recieves the JSON data as an Array. The main content component (Product.list.component.ts) accesses that data recieved by making the service a dependency and accessing it through a constructor. This allows the component to access the method which returns the array of JSON objects recieved by the service. The Array is then placed within a local array within main component. Finally, the HTML of the component which is linked to the TypeScript file accesses the components looping through the Array of JSON objects, accessing the individual key value pairs and displaying them on screen.

The <em>Database</em> holds the information of each individual product.


