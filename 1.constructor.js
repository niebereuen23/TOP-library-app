const myLibrary = [];

addBookToLibrary('Moby Dick', 'Herman Melville', '400', 'Not read yet');
addBookToLibrary('Frankenstein', 'Mary Shelley', '350', 'Not read yet');
addBookToLibrary('El Principito', 'Antoine de Saint-Exupéry', '345', 'Read');
addBookToLibrary('Mr. Robot', 'Sam Esmail', '180', 'Read');


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.hehe =  function() {
    console.log('hi');
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    
    myLibrary.push(book);

    
    return myLibrary;
}

function displayLibrary() {
    // const tBody = document.querySelector('tbody');

    myLibrary.forEach(book => {
        // const bookRow = document.createElement('tr');
        // tBody.appendChild(bookRow);

        // for (let value of (Object.values(book))) { //
        //     const keyBook = document.createElement('td');
        //     keyBook.innerHTML = `${value}`;
        //     bookRow.appendChild(keyBook);
        // }

        // const deleteButton = document.createElement('button');
        // deleteButton.textContent = 'Delete';
        // deleteButton.addEventListener('click', e => {
        //     // book.arrIndex = 
        //     myLibrary.splice(myLibrary.indexOf(book), 1);
        //     tBody.removeChild(bookRow);
        // })

        // bookRow.appendChild(deleteButton);
        updateDisplay(book);

    })
}


function updateDisplay(book) {
    
    const tBody = document.querySelector('tbody');
    const bookRow = document.createElement('tr');

    tBody.appendChild(bookRow);

    for (let value of (Object.values(book))) {
        const keyBook = document.createElement('td');
        keyBook.innerHTML = `${value}`;
        bookRow.appendChild(keyBook);
    }

    const deleteButton = document.createElement('button');
    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-trash-can';
    icon.style = 'font-size: 24px; color:red'
    deleteButton.appendChild(icon);
    deleteButton.addEventListener('click', e => {
        
        myLibrary.splice(myLibrary.indexOf(book), 1);
        tBody.removeChild(bookRow);
    })

    bookRow.appendChild(deleteButton);
}

function deleteBook() {

}

const addBookModal = document.querySelector('#addBookButton');

const dialog = document.querySelector('dialog');
const closeDialog = document.querySelector('#close-dialog');
const form = document.querySelector('form');

addBookModal.addEventListener('click', e => {
    dialog.showModal();
    
});

// Method 1: Using FormData
form.addEventListener('submit', e => {
    e.preventDefault(); // Need to learn more in detail about this method

    const formData = new FormData(form); // Create FormData object from the form

    const book = Object.fromEntries(formData.entries()); // Convert FormData to a plain object


    // Use the information
    if (book.read === undefined) {
        book.read = 'Not read yet';
    } else {
        book.read = 'Read';
    }
    addBookToLibrary(book.title, book.author, book.pages, book.read);
    updateDisplay(book);
    

    dialog.close();
    
})

// Method2: Using value from each input field manually
// form.addEventListener('submit', e => {

    
// })

closeDialog.addEventListener('click', e => dialog.close())

displayLibrary();