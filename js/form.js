// Function to handle adding a new question
document.getElementById('addQuestionButton').addEventListener('click', function() {
    let questionContainer = document.getElementById('questionContainer');
    let newQuestion = document.createElement('div');
    newQuestion.classList.add('form-group');

    newQuestion.innerHTML = `
        <label for="question">Question Text</label>
        <input type="text" name="question" placeholder="Enter your question" required>
        
        <label for="type">Question Type</label>
        <select name="type">
            <option value="text">Short Answer</option>
            <option value="paragraph">Paragraph</option>
            <option value="multiple-choice">Multiple Choice</option>
            <option value="checkbox">Checkbox</option>
            <option value="dropdown">Dropdown</option>
            <option value="date">Date</option>
        </select>
        
        <div class="options-container" style="display:none;">
            <label for="options">Options (comma separated)</label>
            <input type="text" name="options" placeholder="Enter options (e.g. Option 1, Option 2)" />
        </div>
    `;
    
    questionContainer.appendChild(newQuestion);
    
    // Listen for changes in question type
    const questionTypeSelect = newQuestion.querySelector('select[name="type"]');
    const optionsContainer = newQuestion.querySelector('.options-container');
    
    questionTypeSelect.addEventListener('change', function() {
        if (['multiple-choice', 'checkbox', 'dropdown'].includes(questionTypeSelect.value)) {
            optionsContainer.style.display = 'block';
        } else {
            optionsContainer.style.display = 'none';
        }
    });
});

// Function to handle form creation and rendering a preview of the form
document.getElementById('createFormButton').addEventListener('click', function() {
    let formTitle = document.getElementById('formTitle').value; // Get the form title input
    let formQuestions = Array.from(document.querySelectorAll('.form-group')).map(group => {
        let questionText = group.querySelector('input[name="question"]').value;
        let questionType = group.querySelector('select[name="type"]').value;
        let options = group.querySelector('input[name="options"]') ? group.querySelector('input[name="options"]').value.split(',').map(option => option.trim()) : [];

        return { text: questionText, type: questionType, options: options };
    });

    // Render the form preview
    renderFormPreview(formTitle, formQuestions);
});

// Function to render the preview of the form
function renderFormPreview(title, questions) {
    let formPreviewContainer = document.getElementById('formPreview');
    formPreviewContainer.innerHTML = ''; // Clear any previous preview
    
    // Add form title to preview
    let titleElement = document.createElement('h3');
    titleElement.textContent = title; // Set the form title
    formPreviewContainer.appendChild(titleElement);

    // Render the questions in the preview
    questions.forEach(question => {
        let questionElement = document.createElement('div');
        questionElement.classList.add('preview-question');

        let questionLabel = document.createElement('label');
        questionLabel.textContent = question.text;
        questionElement.appendChild(questionLabel);

        switch (question.type) {
            case 'text':
                let inputText = document.createElement('input');
                inputText.type = 'text';
                inputText.name = question.text; // Give the question its name for submission
                questionElement.appendChild(inputText);
                break;

            case 'paragraph':
                let inputParagraph = document.createElement('textarea');
                inputParagraph.name = question.text;
                questionElement.appendChild(inputParagraph);
                break;

            case 'multiple-choice':
                question.options.forEach(option => {
                    let radioLabel = document.createElement('label');
                    let radioInput = document.createElement('input');
                    radioInput.type = 'radio';
                    radioInput.name = question.text;
                    radioInput.value = option;

                    radioLabel.appendChild(radioInput);
                    radioLabel.appendChild(document.createTextNode(option));
                    questionElement.appendChild(radioLabel);
                });
                break;

            case 'checkbox':
                question.options.forEach(option => {
                    let checkboxLabel = document.createElement('label');
                    let checkboxInput = document.createElement('input');
                    checkboxInput.type = 'checkbox';
                    checkboxInput.name = question.text;
                    checkboxInput.value = option;

                    checkboxLabel.appendChild(checkboxInput);
                    checkboxLabel.appendChild(document.createTextNode(option));
                    questionElement.appendChild(checkboxLabel);
                });
                break;

            case 'dropdown':
                let selectDropdown = document.createElement('select');
                selectDropdown.name = question.text;
                question.options.forEach(option => {
                    let optionElement = document.createElement('option');
                    optionElement.value = option;
                    optionElement.textContent = option;
                    selectDropdown.appendChild(optionElement);
                });
                questionElement.appendChild(selectDropdown);
                break;

            case 'date':
                let inputDate = document.createElement('input');
                inputDate.type = 'date';
                inputDate.name = question.text;
                questionElement.appendChild(inputDate);
                break;

            default:
                break;
        }

        formPreviewContainer.appendChild(questionElement);
    });

    // Show the form preview container
    formPreviewContainer.style.display = 'block';

    // Show the Share Form button
    document.getElementById('shareFormButton').style.display = 'inline-block';
}

// Function to handle the "Share Form" button click
document.getElementById('shareFormButton').addEventListener('click', function() {
    // Create a link for the form
    let formLink = `http://example.com/forms/${encodeURIComponent(document.getElementById('formTitle').value)}`;
    
    // Display the form link
    let formLinkInput = document.getElementById('formLink');
    formLinkInput.value = formLink;

    // Show the "Copy the link" section
    document.getElementById('shareLink').style.display = 'block';
});

// Initialize the form builder
function initializeFormBuilder() {
    // Any additional initialization if required
}
