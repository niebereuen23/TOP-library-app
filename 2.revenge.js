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
    dialog.close();
})

const closeDialog = document.querySelector('#close-dialog');
closeDialog.addEventListener('click', e => dialog.close())


// TODO: toggle button to change read status on each book displayed