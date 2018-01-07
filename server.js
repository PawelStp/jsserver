var express = require('express');
var bodyParser = require('body-parser');
var port = +process.argv[2];
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
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
    var book = req.body;
    book.Id = books[books.length - 1].Id + 1;
    console.log(book);
    books.push(book);
    res.send(200);
});

app.post('/author', function (req, res) {
    var author = req.body;
    author.Id = authors[authors.length - 1].Id + 1;
    authors.push(author);
    res.send(200);
});

// Puty
app.put('/author', function (req, res) {
    var editedAuthor = req.body;
    var author = getAuthorById(editedAuthor.Id);
    author.Name = editedAuthor.Name;
    author.Surname = editedAuthor.Surname;
    author.Country = editedAuthor.Country;
    author.Year = editedAuthor.Year;
    author.Type = editedAuthor.Type;
    // authors.push(author);
    res.send(200);
});
app.put('/book', function (req, res) {
    var editedBook = req.body;
    var book = getBookrById(editedBook.Id);
    book.Author = editedBook.Author;
    book.Title = editedBook.Title;
    book.Year = editedBook.Year;
    book.Price = editedBook.Price;
    res.send(200);
});

//Delety

app.delete('/author/:authorId', function (req, res) {
    var author = getAuthorById(req.params.authorId);
    var index = authors.indexOf(author);
    removeBooksByAuthorId(author);
    authors.splice(index, 1);
    res.send(200);
});
app.delete('/book/:bookId', function (req, res) {
    var book = getBookrById(req.params.bookId);
    var index = books.indexOf(book);
    books.splice(index, 1);
    res.send(200);
});

var removeBooksByAuthorId = function (author) {
    var filteredBooks = getBooksByAuthor(author.Id);
    for (var i = 0; i < filteredBooks.length; i++) {
        var index = books.indexOf(filteredBooks[i]);
        books.splice(index, 1);
    }
}

var getBooksByAuthor = function (id) {
    var filteredBooks = [];
    for (var i = 0; i < books.length; i++) {
        if (books[i].Author.Id == id) {
            filteredBooks.push(books[i]);
        }
    }
    return filteredBooks;
};

var getIndexAuthor = function (author) {
    for (var i = 0; i < authors.length; i++) {
        if (authors[i].Id === author.Id) {
            return i;
        }
    }
}
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

var getBookrById = function (id) {
    for (var i = 0; i < books.length; i++) {
        if (books[i].Id == id) {
            return books[i];
        }
    }
}


var author = function (id, name, surname, year, country, type) {
    this.Id = id;
    this.Name = name;
    this.Surname = surname;
    this.Country = country;
    this.Year = year;
    this.Type = type;
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

authors.push(new author(1, "Pawel", "Stypulkowski", 1996, "Pl", "Historyczne"));
authors.push(new author(2, "KAcper", "Swislocki", 199, "Pl", "SF"));
authors.push(new author(3, "Kamil", "Oleksy", 1998, "Pl", "Sportowe"));

books.push(new book(1, "Krzyzaki", 1, 1990, 25));
books.push(new book(2, "Harry potter", 2, 1995, 45));
books.push(new book(3, "Gwiezde wojny", 2, 1999, 55));
books.push(new book(4, "Lewandowski", 3, 1999, 55));