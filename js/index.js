// index.js

// Redirect to form creation page when the "Create a New Form" button is clicked
document.getElementById('createFormButton').addEventListener('click', function() {
    window.location.href = 'pages/form.html';  // Ensure correct path to form creation page
});

// Placeholder for "Manage Your Forms" button (add logic as needed)
document.getElementById('manageFormsButton').addEventListener('click', function() {
    alert('Manage Your Forms functionality is coming soon!');
});
