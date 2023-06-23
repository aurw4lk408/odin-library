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
    // creates card to put in book

    const new_card = document.createElement('div');
    new_card.classList.add('card');
    new_card.classList.add('not_finished');
    
    for (let i = 0; i < 5; i++) {
        if (i === 0) {
            // creates svg icon
            const icon_div = document.createElement("div");
            icon_div.classList.add('icon_div');            

            const icon = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
            icon.classList.add('icon');
            icon.setAttribute("xmlns", "http://www.w3.org/2000/svg")
            icon.setAttribute("viewBox", "0 0 24 24")

            const svg_info = document.createElementNS("http://www.w3.org/2000/svg", 'path');
            svg_info.setAttribute("d", "M9,7H11L12,9.5L13,7H15L13,12L15,17H13L12,14.5L11,17H9L11,12L9,7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z");

            icon.appendChild(svg_info);
            icon_div.appendChild(icon);
            new_card.appendChild(icon_div);
        }
        else if (i === 1) {
            const para = document.createElement('p');
            para.classList.add('card_css');
            new_card.appendChild(para);

            const title = document.createElement('span');
            title.classList.add('card_title');
            title.appendChild(document.createTextNode(`${this.title}`));
            para.appendChild(title);
        }
        else if (i === 2) {
            const para = document.createElement('p');
            para.classList.add('card_css');
            new_card.appendChild(para);

            const author = document.createElement('span');
            author.classList.add('card_author');
            author.appendChild(document.createTextNode(`Author: ${this.author}`));
            para.appendChild(author);
        }
        else if (i === 3) {
            const para = document.createElement('p');
            para.classList.add('card_css');
            new_card.appendChild(para);

            const pages = document.createElement('span');
            pages.classList.add('card_pages');
            pages.appendChild(document.createTextNode(`Pages: ${this.pages}`));
            para.appendChild(pages);
        }
        else {
            const para = document.createElement('p');
            para.classList.add('card_css');
            new_card.appendChild(para);

            const checkbox_div = document.createElement('div');
            checkbox_div.classList.add('checkbox_container');

            const checkbox_text = document.createElement('span');
            checkbox_text.classList.add('card_checkbox')
            checkbox_text.appendChild(document.createTextNode(`Finished: `))
            checkbox_div.appendChild(checkbox_text);

            let checkbox = document.createElement('input');
            checkbox.classList.add('checkbox');
            checkbox.setAttribute('type', 'checkbox');
            checkbox_div.appendChild(checkbox);

            para.appendChild(checkbox_div);
        }
    }

    container.appendChild(new_card);

    current_books++;

    // removes books
    const child_div = new_card.firstChild;
    const remove_card = child_div.firstChild;

    remove_card.addEventListener('click', () => {
        new_card.remove();            
        current_books = current_books - 1;
        
        if (current_books < 6) {
            warning.innerHTML = "";
        }

        if (current_books === 0) {
            container.style.visibility = "hidden";
            my_books.style.visibility = "hidden";
        }
    })

    
    // checks checkbox, removes and adds borders to cards
    const parent_checkbox = new_card.lastChild;
    const container_checkbox = parent_checkbox.firstChild;
    const checkbox_btn = container_checkbox.lastChild;    

    checkbox_btn.addEventListener('change', () => {
        if (checkbox_btn.checked === true) {
            new_card.classList.add('finished');
            new_card.classList.remove('not_finished');
        }
        else {
            new_card.classList.add('not_finished');
            new_card.classList.remove('finished');
        }
    })
}



function checkboxFunc() {
    checkbox_btn.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked === true) {
                checkbox.classList.add('.finished');
                checkbox.classList.remove('.not_finished');
            }
            else {
                checkbox.classList.add('.not_finished');
                checkbox.classList.remove('.finished');
            }
            console.log(checkbox.checked);
        })
    })
}



// initialize current book count (starts at 0);
let current_books = 0;
let remove_cards;
let cards;

// button interactions 
const container = document.querySelector('.grid-container');
const my_books = document.querySelector('.my_books');
const warning = document.querySelector('.info_error');


const book_submit = document.querySelector('.book_submit');
const addBook = document.querySelector('.add_book');

addBook.addEventListener('click', () => {
    const display = document.querySelector('.book_info');
    display.style.visibility = "visible";
});


// gets info for new book
book_submit.addEventListener('click', () => {   
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');

    if (current_books >= 6) {
        if(warning.hasChildNodes() === true) {
            warning.innerHTML = "";
        }
        const warning_text = document.createElement('span');
        warning_text.classList.add('warning');
        warning_text.appendChild(document.createTextNode("* You have reached the maximum number of books. Remove a book to add a new one"));
        warning.appendChild(warning_text);
    }
    else if (title.value === "" || author.value === "" || pages.value === "") {
        if(warning.hasChildNodes() === true) {
            warning.innerHTML = "";
        }
        const warning_text = document.createElement('span');
        warning_text.classList.add('warning');
        warning_text.appendChild(document.createTextNode("* Please fill out all fields before submitting."));
        warning.appendChild(warning_text);
    }
    else if ((isNaN(pages.value))) {
        if(warning.hasChildNodes() === true) {
            warning.innerHTML = "";
        }
        const warning_text = document.createElement('span');
        warning_text.classList.add('warning');
        warning_text.appendChild(document.createTextNode("* Please fill out the pages field with the appropriate number"));
        warning.appendChild(warning_text);
    }
    else {
        // creates new book, updates myLibrary array with book
        let book = new Book(author.value, title.value, pages.value);
        book.addBookToLibrary();
        if (current_books >= 1) {
            container.style.visibility = "visible";
            my_books.style.visibility = "visible";
        }

        // resets input fields, increment current book
        title.value = "";
        author.value = "";
        pages.value = "";
        warning.innerHTML = "";
    }

})