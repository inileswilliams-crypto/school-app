// DATA OBJECT:
// Stores the menu items for each available lunch option.
const menus = {
  "Burger King": [
    "Hamburger (260 Cal)",
    "Cheeseburger (300 Cal)",
    "Double Cheeseburger (370 Cal)",
    "Bacon Cheeseburger (345 Cal)",
    "Bacon Double Cheeseburger (540 Cal)",
    "Whopper (680 Cal)",
    "Double Whopper (920 Cal)",
    "Triple Whopper (1,170 Cal)",
    "Impossible Whopper (650 Cal)",
    "Impossible King (580 Cal)",
    "Single BK Stacker (590 Cal)",
    "Double BK Stacker (650 Cal)",
    "Triple BK Stacker (810 Cal)",
    "Value Fries (230 Cal)",
    "Small Fries (300 Cal)",
    "Medium Fries (370 Cal)",
    "Large Fries (440 Cal)",
    "Value Onion Rings (200 Cal)",
    "Small Onion Rings (280 Cal)",
    "Medium Onion Rings (360 Cal)",
    "Large Onion Rings (520 Cal)",
    "Have-sies (220 Cal)",
    "Strawberry Shake (610 Cal)",
    "Chocolate Shake (590 Cal)",
    "Chocolate Oreo Cookie Shake (675 Cal)",
    "Chocolate Chip Cookies (320 Cal)"
  ],
  "Sun Pizza": [
    "Chicken and Fries",
    "Onion Rings",
    "Cheese Steaks",
    "Pepperoni Pizza",
    "Cheese Pizza",
    "Sausage Pizza",
    "Chicken and Ranch Pizza"
  ],
  "School Lunch": [
    "Peanut Butter and Jelly",
    "Burgers",
    "Mac and Cheese",
    "Chicken and Rice",
    "Tacos",
    "Quesadilla"
  ]
};

// FUNCTION:
// Opens the menu for whichever vendor button the staff member clicked.
function openMenu(vendorName) {
  // Hides the vendor buttons and shows the menu section
  document.getElementById("vendorSection").style.display = "none";
  document.getElementById("menuSection").style.display = "block";

  // Updates the menu heading to the chosen vendor
  document.getElementById("menuTitle").textContent = vendorName + " Menu";

  // Clears any previous menu items before adding new ones
  const menuContainer = document.getElementById("menuItems");
  menuContainer.innerHTML = "";

  // Loops through the chosen vendor's items and creates a checkbox for each
  const selectedItems = menus[vendorName];
  for (let i = 0; i < selectedItems.length; i++) {
    const label = document.createElement("label");
    label.className = "menu-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "foodItem";
    checkbox.value = selectedItems[i];

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(" " + selectedItems[i]));
    menuContainer.appendChild(label);
  }
}

// FUNCTION:
// Returns the user to the vendor selection screen.
function goBack() {
  document.getElementById("menuSection").style.display = "none";
  document.getElementById("vendorSection").style.display = "block";
}// VARIABLE:
// Keeps track of which vendor menu is currently open.
let currentVendor = "";// FUNCTION:
// Collects the selected food items and staff details when Place Order is clicked.
function submitOrder() {
  // Reads the staff member's name and room number
  const staffName = document.getElementById("staffName").value.trim();
  const roomNumber = document.getElementById("roomNumber").value.trim();

  // Finds all checked food checkboxes
  const checkedBoxes = document.querySelectorAll('input[name="foodItem"]:checked');
  const chosenFoods = [];

  for (let i = 0; i < checkedBoxes.length; i++) {
    chosenFoods.push(checkedBoxes[i].value);
  }

  // Temporarily logs the order details to confirm reading inputs works
  console.log("Order submitted:", currentVendor, chosenFoods, staffName, roomNumber);
}// FUNCTION:
// Validates the order and displays an on-screen confirmation summary.
function submitOrder() {
  // Reads the staff member's name and room number
  const staffName = document.getElementById("staffName").value.trim();
  const roomNumber = document.getElementById("roomNumber").value.trim();

  // Collects all checked food checkboxes
  const checkedBoxes = document.querySelectorAll('input[name="foodItem"]:checked');
  const chosenFoods = [];

  for (let i = 0; i < checkedBoxes.length; i++) {
    chosenFoods.push(checkedBoxes[i].value);
  }

  // Targets the confirmation box on the page
  const confirmationBox = document.getElementById("orderConfirmation");
  confirmationBox.style.display = "block";

  // Checks that at least one food item, a name, and a room number were entered
  if (chosenFoods.length === 0 || staffName === "" || roomNumber === "") {
    confirmationBox.textContent = "Please select at least one food item and enter your name and room number.";
    return;
  }

  // Displays the full order confirmation summary
  confirmationBox.textContent =
    "Order Placed! " +
    staffName +
    " (Room " +
    roomNumber +
    ") ordered from " +
    currentVendor +
    ": " +
    chosenFoods.join(", ") +
    ".";
}// FUNCTION:
// Saves a new order summary into browser localStorage and refreshes the list.
function saveOrderToHistory(orderText) {
  // Reads existing orders from localStorage, or starts an empty array if none exist
  const savedOrders = JSON.parse(localStorage.getItem("wChewsOrders")) || [];

  // Adds the newest order to the array
  savedOrders.push(orderText);

  // Saves the updated array back into localStorage as text
  localStorage.setItem("wChewsOrders", JSON.stringify(savedOrders));

  // Updates the visible list on the page
  displayOrderHistory();
}

// FUNCTION:
// Reads saved orders from localStorage and displays them inside #orderHistoryList.
function displayOrderHistory() {
  const historyList = document.getElementById("orderHistoryList");
  const savedOrders = JSON.parse(localStorage.getItem("wChewsOrders")) || [];

  historyList.innerHTML = "";

  // Shows a helpful message if no orders have been saved yet
  if (savedOrders.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "No orders placed yet.";
    historyList.appendChild(emptyItem);
    return;
  }

  // Loops through saved orders and adds each one to the bulleted list
  for (let i = 0; i < savedOrders.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = savedOrders[i];
    historyList.appendChild(listItem);
  }
}

// FUNCTION:
// Deletes only the W Chews order history from localStorage.
function clearHistory() {
  localStorage.removeItem("wChewsOrders");
  displayOrderHistory();
}

// Runs automatically when the page loads so saved orders appear right away
displayOrderHistory();// Saves the confirmed order string into localStorage
  saveOrderToHistory(confirmationBox.textContent);