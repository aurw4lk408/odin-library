// array with current books
let myLibrary = [];

// constructor function and prototype
function Book(author, title, pages) {
    this.author = author,
    this.title = title,
    this.pages = pages
    // this.completion = completion
}

Book.prototype.addBookToLibrary = function() {
    myLibrary.push(this);
    document.querySelector(`.title-${current_books}`).textContent = `Title: ${this.title}`;
    document.querySelector(`.author-${current_books}`).textContent = `Author: ${this.author}`;
    document.querySelector(`.pages-${current_books}`).textContent = `Pages: ${this.pages}`;

    current_books++;
}


// initialize current book count (starts at 0);
let current_books = 0;

// button interactions 
const book_submit = document.querySelector('.book_submit');
const addBook = document.querySelector('.add_book');
addBook.addEventListener('click', () => {
    
// reveal hidden info box
});

// gets info for new book
book_submit.addEventListener('click', () => {   
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');
    const warning = document.querySelector('.info_error');

    if (title.value === "" || author.value === "" || pages.value === "") {
        warning.textContent = "Please fill out all fields before submitting."
    }
    else if ((isNaN(pages.value))) {
        warning.textContent = "Please fill out the pages field with the appropriate number"
    }
    else {
        // creates new book, updates myLibrary array with book
        let book = new Book(author.value, title.value, pages.value);
        book.addBookToLibrary();
    
        // links myLibrary array and displays it
    
        
        // for (current_books; current_books < myLibrary.length; current_books++) {
        //     const card_title = document.querySelector(`title-${current_books}`);
        //     const card_author = document.querySelector(`author-${current_books}`);
        //     const card_pages = document.querySelector(`pages-${current_books}`);

        //     card_title.textContent = `Title: ${book.title}`;
        //     card_author.textContent = `Author: ${book.author}`;
        //     card_pages.textContent = `Pages: ${book.pages}`;
        // }


        // resets input fields, increment current book
        title.value = "";
        author.value = "";
        pages.value = "";
        warning.textContent = "";
    }

})