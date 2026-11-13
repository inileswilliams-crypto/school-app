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
}