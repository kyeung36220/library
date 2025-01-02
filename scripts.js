const body = document.querySelector(".body")

const myLibrary = [];

function Book() {
  // the constructor...
}

function addBookToLibrary() {
  // do stuff here
}

const theHobbit = {
    title: `The Hobbit`,
    author: `J.R.R. Tolkien`,
    pages: 295,
    read: `not read yet`,
    info() {
        return`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    }
}

console.log(theHobbit.info());
