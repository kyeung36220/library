const body = document.querySelector("#body")
const button = document.querySelector("#addBookButton")
const newBookDialog = document.querySelector(`#newBookDialog`)

button.addEventListener("click", () => {
    newBookDialog.showModal()
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
        <div class='title'>Title: ${book.title}</div>
        <div class='author'> Author: ${book.author}</div>
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

addBookToLibrary(`Vagabond, Vol. 1`, `Takehiko Inoue`, `600`, "Completed")
addBookToLibrary(`The Book of Five Rings`, `Miyamoto Musashi`, `96`, "Not Completed")

