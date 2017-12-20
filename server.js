

var express = require('express');
var bodyParser = require('body-parser');
var port = +process.argv[2];
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GETY
app.listen(port, function () {
    console.log("Serwer uruchomiony");
});

app.get('/authors', function (req, res) {
    res.send(authors);
});

app.get('/authors/:bookId', function (req, res) {
    res.send(getAuthorsByBook(req.params.bookId));
});


app.get('/books', function (req, res) {
    res.send(books);
});

app.get('/books/:authorId', function (req, res) {

    res.send(getBooksByAuthor(req.params.authorId));
});
//POSTY

app.post('/book', function (req, res) {
    var bookDtO = req.body;
    var bookk = new book(bookDtO.Id, bookDtO.Title, bookDtO.AuthorId, bookDtO.Year, bookDtO.Price);
    books.push(bookk);
    res.redirect("/books");
});

app.post('/author', function (req, res) {
    var author = req.body;
    author.Id = author.length;
    authors.push(author);
    res.redirect("/books");
});


var getBooksByAuthor = function (id) {
    var filteredBooks = [];
    for (var i = 0; i < books.length; i++) {
        if (books[i].Author.Id == id) {
            filteredBooks.push(books[i]);
        }
    }
    return filteredBooks;
};

var getAuthorsByBook = function (id) {
    for (var i = 0; i < books.length; i++) {
        if (books[i].Id == id) {
            return books[i].Author;
        }
    }
}

var getAuthorById = function (id) {
    for (var i = 0; i < authors.length; i++) {
        if (authors[i].Id == id) {
            return authors[i];
        }
    }
}

var author = function (id, name, surname) {
    this.Id = id;
    this.Name = name;
    this.Surname = surname;
}

var book = function (id, title, authorId, year, price) {
    this.Id = id;
    this.Title = title;
    this.Author = getAuthorById(authorId);
    this.Year = year;
    this.Price = price;
}

var authors = [];
var books = [];

authors.push(new author(1, "Pawel", "Stypulkowski"));
authors.push(new author(2, "KAcper", "Swislocki"));
authors.push(new author(3, "Kamil", "Oleksy"));

books.push(new book(1, "Krzyzaki", 1, 1990, 25));
books.push(new book(2, "Bracia", 2, 1995, 45));
books.push(new book(3, "Golec", 2, 1999, 55));
books.push(new book(4, "Pierdolec", 3, 1999, 55));


