document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registrationForm");
  const userTable = document.getElementById("userTable").getElementsByTagName('tbody')[0];

  // Load previously stored data from localStorage
  const storedData = JSON.parse(localStorage.getItem("userData")) || [];
  storedData.forEach(data => appendDataToTable(data));

  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptTerms = document.getElementById("acceptTerms").checked;

    // Validate DOB: Age 18-55
    const today = new Date();
    const dobDate = new Date(dob);
    const age = today.getFullYear() - dobDate.getFullYear();
    if (age < 18 || age > 55) {
      alert("Date of Birth must be between ages 18 and 55.");
      return;
    }

    const userData = { name, email, password, dob, acceptTerms };
    appendDataToTable(userData);

    // Store data in localStorage
    const storedData = JSON.parse(localStorage.getItem("userData")) || [];
    storedData.push(userData);
    localStorage.setItem("userData", JSON.stringify(storedData));

    registrationForm.reset();
  });

  function appendDataToTable(userData) {
    const newRow = userTable.insertRow();
    newRow.innerHTML = `<td>${userData.name}</td><td>${userData.email}</td><td>${userData.password}</td><td>${userData.dob}</td><td>${userData.acceptTerms ? "Yes" : "No"}</td>`;
  }
});
