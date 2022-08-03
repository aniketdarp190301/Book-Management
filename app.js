// Book Constructor

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list');

  // Create tr element
  const row = document.createElement('tr');

  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class = "delete">X</a></td>
  `;

  list.appendChild(row);
};

//Show Alert
UI.prototype.showAlert = function (message, className) {
  // Create Div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get Parent

  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  container.insertBefore(div, form);

  //Timeout after 3 seconds
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
};

// Delete Book
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
};

// Clear Form Fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};
// Event Listener for add book

document.getElementById('book-form').addEventListener('submit', function (e) {
  //Get form values

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  //Instantiate new book
  const book = new Book(title, author, isbn);

  //Instantiate UI
  const ui = new UI();

  if (title === '' || author === '' || isbn === '') {
    // Show Error
    ui.showAlert('Please fill out all the fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Show Success Alert
    ui.showAlert('Book Added!', 'success');

    // Clear Fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener for delete book
document.getElementById('book-list').addEventListener('click', function (e) {
  // Instantiate UI
  const ui = new UI();

  // Delete Book
  ui.deleteBook(e.target);

  // Show Success Alert
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});
