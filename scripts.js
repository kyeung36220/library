const body = document.querySelector("#body")
const addBookButton = document.querySelector("#addBookButton")
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

cancelButton.addEventListener("click", () => {
    newBookDialog.close()
})

submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    if (newTitle.value.length === 0) {
        newTitleLabel.style.color = "red"
        newTitle.style.border = "2px solid red"
        return
    }
    newTitleLabel.style.color = "black"
    newTitle.style.border = "2px solid black"

    if (newAuthor.value.length === 0) {
        newAuthorLabel.style.color = "red"
        newAuthor.style.border = "2px solid red"
        return
    }
    newAuthorLabel.style.color = "black"
    newAuthor.style.border = "2px solid black"

    if (newPages.value <= 0) {
        newPagesLabel.style.color = "red"
        newPages.style.border = "2px solid red"
        return
    }
    newPagesLabel.style.color = "black"
    newPages.style.border = "2px solid black"

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

function Book(title, author, pages, completed, index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.completed = completed;
    this.index = index;
    this.toggleCompleteStatus = function() {
        this.completed = this.completed === "Completed" ? "Not Completed" : "Completed"
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
    buttonColor = book.completed === `Completed` ? `green` : `red`
    card.innerHTML = `
    <div class="entry">
        <div class='title' style="font-size: 1.3vw;"><strong>${book.title}</strong></div>
        <div class='author'>${book.author}</div>
        <div class='pages'> Total Pages: ${book.pages}</div>
        <div class='completed'>
            <div style="display: flex; gap: 0.5vw; align-items: center; justify-content: center;">
                <span class='toggleButton' type="button" style="background-color:${buttonColor}"></span>
                <span class=completedText>${book.completed}</span>
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
        completedText.textContent = `${book.completed}`
    })

    let deleteButton = card.querySelector(".deleteButton")
    deleteButton.addEventListener("click", () => {
        if (confirm(`Are you sure you want to delete ${book.title}?`)) {
            delete myLibrary[book.index]
            body.removeChild(card)
        }

    })

    body.appendChild(card)
}

addBookToLibrary(`Life of Pi`, `Yann Martel`, 356, "Completed")
addBookToLibrary(`Atomic Habits`, `James Clear`, 320, "Not Completed")
addBookToLibrary(`Letters From a Stoic`, `Seneca`, 254, "Completed")
addBookToLibrary(`Discourses`, `Epictetus`, 544, "Not Completed")

