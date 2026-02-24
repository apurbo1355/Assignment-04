### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

* getElementById("id")

Selects one element by its unique id.
Returns a single element.
Very fast and specific.

document.getElementById("title");


* getElementsByClassName("class")

Selects elements by class name.
Returns an HTMLCollection (live collection).
Can contain multiple elements.

document.getElementsByClassName("card");


* querySelector("selector")

Selects the first matching element.
Uses CSS selectors.

document.querySelector(".card");


* querySelectorAll("selector")

Selects all matching elements.
Returns a NodeList (static).

document.querySelectorAll(".card");



### 2. How do you create and insert a new element into the DOM?

Step 1: Create element
const newDiv = document.createElement("div");

Step 2: Add content
newDiv.innerText = "Hello World!";

Step 3: Insert into DOM
document.body.appendChild(newDiv);

* Example:
const p = document.createElement("p");
p.textContent = "New Paragraph Added!";
document.body.appendChild(p);


### 3. What is Event Bubbling? And how does it work?


Event Bubbling is a process where an event starts from the target element and then bubbles up to its parent elements.

* Example:

HTML:
<div id="parent">
  <button id="child">Click Me</button>
</div>

JavaScript:
document.getElementById("child").addEventListener("click", function() {
  console.log("Button Clicked");
});

document.getElementById("parent").addEventListener("click", function() {
  console.log("Div Clicked");
});



### 4. What is Event Delegation in JavaScript? Why is it useful?

Event Delegation is a technique where you add a single event listener to a parent element to manage events for its child elements.

* Example:
document.getElementById("parent").addEventListener("click", function(event) {
  if (event.target.tagName === "BUTTON") {
    console.log("Button clicked:", event.target.innerText);
  }
});


* It is useful because:
1. Improves performance
2. Reduces memory usage
3. Works for dynamically added elements
4. Cleaner and more efficient code



### 5.What is the difference between preventDefault() and stopPropagation()?

* preventDefault()

Stops the default browser action.

Example: Prevent form submission or link navigation.
event.preventDefault();

Example:
document.querySelector("a").addEventListener("click", function(event) {
  event.preventDefault();
});

* stopPropagation()

Stops the event from bubbling up to parent elements.
event.stopPropagation();

Example:
button.addEventListener("click", function(event) {
  event.stopPropagation();
});