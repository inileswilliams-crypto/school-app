// FUNCTION:
// Runs when a staff member clicks one of the vendor buttons.
function openMenu(vendorName) {
  // Temporarily logs the chosen vendor to confirm the click works
  console.log("Selected vendor:", vendorName);

  // Hides the vendor selection screen so the menu can appear in Feature 3
  document.getElementById("vendorSection").style.display = "none";
}