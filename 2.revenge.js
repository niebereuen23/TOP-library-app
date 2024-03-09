// All book objects are stored in a simple array
const myLibrary = [];


// Using Object constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    if (this.read) this.read = false;
    else this.read = true;
}


// // Using class keyword
// class Book {
//     constructor(title, author, pages, read) {
//         this.title = title;
//         this.author = author;
//         this.pages = pages;
//         this.read = read;
//     }
    
//     toggleRead() {
//         if (this.read) this.read = false;
//         else this.read = true;
//     }
// }

// Function in global area to add book into library
function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

// TOREMOVE: Books added manually
addBookToLibrary('Moby Dick', 'Herman Melville', 400, false);
addBookToLibrary('Frankenstein', 'Mary Shelley', 350, false);
addBookToLibrary('El Principito', 'Antoine de Saint-Exupéry', 345, true);+
addBookToLibrary('Mr. Robot', 'Sam Esmail', 180, true);

// Display all books
function displayAllBooksFromLibrary() {
    const tBody = document.querySelector('tbody');
    tBody.innerHTML = ''; // clear all previous children, to replace with updated library

    myLibrary.forEach((book) => {
        console.log(book);
        const bookRow = document.createElement('tr');

        tBody.appendChild(bookRow);

        for (let value of (Object.values(book))) {
            const keyBook = document.createElement('td');
            if (value === true) {
                keyBook.innerHTML = `Read`;
            } else if (value === false) {
                keyBook.innerHTML = `Not read`;
            } else {
                keyBook.innerHTML = `${value}`;
            }
            bookRow.appendChild(keyBook);
        }

        // Delete button
        const deleteButton = document.createElement('button');
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-trash-can';
        icon.style = 'font-size: 24px; color:red'
        deleteButton.appendChild(icon);
        deleteButton.addEventListener('click', () => {
            myLibrary.splice(myLibrary.indexOf(book), 1);
            tBody.removeChild(bookRow);
        })
        bookRow.appendChild(deleteButton);

        // Read Toggle button
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Toggle';
        toggleButton.addEventListener('click', () => {
            book.toggleRead();
            displayAllBooksFromLibrary();
        })
        bookRow.appendChild(toggleButton);
    })
}



// Manually calling to display all books
displayAllBooksFromLibrary();


// Modal
const addBookModal = document.querySelector('#addBookButton');
const dialog = document.querySelector('dialog');
addBookModal.addEventListener('click', e => {
    dialog.showModal();
    
});

const form = document.querySelector('form');
form.addEventListener('submit', e => {
    // Form Validation
    if (!form.checkValidity()) {
        e.preventDefault();
        showError();
        
        return;
    }
    
    e.preventDefault(); // Need to learn more in detail about this method

    const formData = new FormData(form); // Create FormData object from the form

    const book = Object.fromEntries(formData.entries()); // Convert FormData to a plain object

    // Use the information
    if (book.read === undefined) {
        book.read = false;
    } else {
        book.read = true;
    }
    addBookToLibrary(book.title, book.author, book.pages, book.read);
    displayAllBooksFromLibrary();
    form.reset();
    resetError();
    dialog.close();
})

const closeDialog = document.querySelector('#close-dialog');
closeDialog.addEventListener('click', e => {
    form.reset();
    resetError();
    dialog.close();
})

// Form Validation
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');

const span = document.querySelectorAll('span');
// title.addEventListener('input', )

    // Show errors for all inputs
function showError() {
    console.log('showError called');
    if (title.validity.valueMissing) {
        span[0].textContent = 'Please add a book title';
        span[0].className = 'error active';
    } else if (author.validity.valueMissing) {
        span[1].textContent = 'Please add an author';
        span[1].className = 'error active';
    } else if (pages.validity.valueMissing || pages.validity.rangeOverflow || pages.validity.rangeUnderflow) {
        span[2].textContent = 'Pages must be from 100 to 1000 only';
        span[2].className = 'error active';
    }
}

function resetError() {
    span.forEach(errorSpan => {
        errorSpan.textContent = '';
    })
}