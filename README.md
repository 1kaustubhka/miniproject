# FETMiniProject - QUIZ WEB APPLICATION

### GENRAL INFO:
*** 
This is a web based application to take quiz on different Computer languages. The application allows users to register for free and take different test set by the admin. 
Users can view the result of the quiz immediately after giving the quiz to review where they went wrong. Users can view their past performance in a specific category.
Admin has his separate login which allows them to perform CRUD operation on quiz of the category. They can add, delete, edit questions. 

#### SCREENSHOTS:
//screenshots come here.

### TECHNOLOGIES:
***
* [HTML](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5): Version 5
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS): Version 3
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript): Version ES8

### LIABRARIES:
***
* [jQuery](https://api.jquery.com/): Version 3.5.1
* [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/): Version 5.0
* [Bootstrap](https://getbootstrap.com/docs/4.5/getting-started/introduction/): Version 4.5

### INSTALLATION:
***
.JSON file is used database. So, it is required to watched inorder to host data on localhost.

1. Install dependancies
> npm install

2. Run JSON server
> npx json-server --watch src/db/db.json

### CODE SNIPPET:
***
Different html files in user_dashboard are loaded using jQuery load() function and thier javascript is written in user_dashboard.js .load() callback function.

>user_dashboard.js
```js
 $("header").load("header.html");
 $("footer").load("footer.html");
 $("nav").load("user_navbar.html",()=>{
     //All the js/jquery of navbar is written in this call back function.
 })
