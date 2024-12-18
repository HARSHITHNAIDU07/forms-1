// utils.js
function loadHeader(path) {
    fetch(path)
        .then(response => response.text())
        .then(html => {
            document.getElementById('header').innerHTML = html;
        });
}
function loadFormData() {
    // Simulate loading form questions from a database or file
    let formQuestions = [
        { text: "What's your name?", type: "text" },
        { text: "What's your favorite color?", type: "multiple-choice", options: ["Red", "Green", "Blue"] }
    ];

    let formContainer = document.getElementById('formQuestions');
    formQuestions.forEach(question => {
        let questionElement = document.createElement('div');
        questionElement.innerHTML = `
            <label>${question.text}</label>
            <input type="${question.type}" name="response" required>
        `;
        formContainer.appendChild(questionElement);
    });
}
