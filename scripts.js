// Screen UI
const body = document.querySelector("#body")
const headerText = document.querySelector("#headerText")
const addBookButton = document.querySelector("#addBookButton")

// Dialog UI
const newBookDialog = document.querySelector(`#newBookDialog`)
const newTitle = document.querySelector(`#title`)
const newTitleLabel = document.querySelector(`#titleLabel`)
const newAuthor = document.querySelector(`#author`)
const newAuthorLabel = document.querySelector(`#authorLabel`)
const newPages = document.querySelector(`#pages`)
const newPagesLabel = document.querySelector(`#pagesLabel`)
const completedCheckbox = document.querySelector(`#completed`)
const submitButton = document.querySelector(`.buttons .submit`)
const cancelButton = document.querySelector(`.buttons .cancel`)

addBookButton.addEventListener("click", () => {
    newBookDialog.showModal()
})

headerText.addEventListener("click", () => {
    window.location.reload()
})

cancelButton.addEventListener("click", () => {
    newBookDialog.close()
})

submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    // checking if all fields in dialog were reasonably filled
    if (document.getElementById("title").validity.tooShort || document.getElementById("title").value === "") {
        newTitleLabel.style.color = "red"
        newTitle.style.border = "2px solid red"
        document.getElementById("titleError").textContent = document.getElementById("title").validity.tooShort === true ? "Title too short!" : "Title can't be empty!"
        return
    }
    newTitleLabel.style.color = "black"
    newTitle.style.border = "2px solid black"
    document.getElementById("titleError").textContent = ""

    if (document.getElementById("author").validity.tooShort || document.getElementById("author").value === "") {
        newAuthorLabel.style.color = "red"
        newAuthor.style.border = "2px solid red"
        document.getElementById("authorError").textContent = document.getElementById("author").validity.tooShort === true ? "Author too short!" : "Author can't be empty!"
        return
    }
    newAuthorLabel.style.color = "black"
    newAuthor.style.border = "2px solid black"
    document.getElementById("author").textContent = ""

    if (document.getElementById("pages").validity.rangeUnderflow || document.getElementById("pages").value === "") {
        newPagesLabel.style.color = "red"
        newPages.style.border = "2px solid red"
        document.getElementById("pagesError").textContent = document.getElementById("pages").validity.rangeUnderflow === true ? "Pages too little!" : "Pages can't be empty!"
        return
    }
    newPagesLabel.style.color = "black"
    newPages.style.border = "2px solid black"
    document.getElementById("pagesError").textContent = ""

    let completedStatus = completedCheckbox.checked === true ? "Completed" : "Not Completed"
    addBookToLibrary(
        newTitle.value,
        newAuthor.value,
        newPages.value,
        completedStatus
    )
    newBookDialog.close()
})

const myLibrary = [];

class Book {
    constructor(title, author, pages, completed, index) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.completed = completed;
        this.index = index;
        this.toggleCompleteStatus = function() {
            this.completed = this.completed === "Completed" ? "Not Completed" : "Completed"
        }
        
    }

    get getTitle() {
        return this.title
    }

    get getAuthor() {
        return this.author
    }

    get getPages() {
        return this.pages
    }

    get getCompletedStatus() {
        return this.completed
    }

    get getIndex() {
        return this.index
    }
}

function addBookToLibrary(title, author, pages, completed) {
  const book = new Book(title, author, pages, completed)
  myLibrary.push(book)
  updateListUI(book)
}

function updateListUI(book) {
    let card = document.createElement("div")
    card.className = "card"
    buttonColor = book.getCompletedStatus === `Completed` ? `green` : `red`
    card.innerHTML = `
    <div class="entry">
        <div class='title' style="font-size: 1.3vw;"><strong>${book.getTitle}</strong></div>
        <div class='author'>${book.getAuthor}</div>
        <div class='pages'> Total Pages: ${book.getPages}</div>
        <div class='completed'>
            <div style="display: flex; gap: 0.5vw; align-items: center; justify-content: center;">
                <span class='toggleButton' type="button" style="background-color:${buttonColor}"></span>
                <span class=completedText>${book.getCompletedStatus}</span>
            </div>
        </div>
    </div>
    <div class="deleteButtonGrid">
        <img class="deleteButton" src="icons/x.svg" alt="Delete Book">
    </div>
    `
    let toggleButton = card.querySelector(".toggleButton")
    let completedText = card.querySelector(".completedText")
    toggleButton.addEventListener("click", () => {
        book.toggleCompleteStatus()
        toggleButton.style.backgroundColor = toggleButton.style.backgroundColor === `green` ? `red` : `green`
        completedText.textContent = `${book.getCompletedStatus}`
    })

    let deleteButton = card.querySelector(".deleteButton")
    deleteButton.addEventListener("click", () => {
        if (confirm(`Are you sure you want to delete ${book.getTitle}?`)) {
            delete myLibrary[book.getIndex]
            body.removeChild(card)
        }

    })

    body.appendChild(card)
}

// Example books for demonstration purposes
addBookToLibrary(`Life of Pi`, `Yann Martel`, 356, "Completed")
addBookToLibrary(`Atomic Habits`, `James Clear`, 320, "Not Completed")
addBookToLibrary(`Letters From a Stoic`, `Seneca`, 254, "Completed")
addBookToLibrary(`Discourses`, `Epictetus`, 544, "Not Completed")

