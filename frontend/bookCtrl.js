var app = angular.module('myBook', []);
app.controller('myBookCtrl', function ($scope, $http) {

    $scope.ClickAuthors = function () {
        $scope.Books = false;
        $scope.Authors = true;
        $scope.GetAllAuthors()
        $scope.cancel();
    };
    $scope.ClickBooks = function () {
        $scope.Books = true;
        $scope.Authors = false;
        $scope.GetAllBooks();
        $scope.cancel();
    };

    $scope.GetAllBooks = function () {
        $http.get("http://localhost:8888/books")
            .then(function (response) {
                $scope.books = response.data;
            });
    }
    $scope.GetAllAuthors = function () {
        $http.get("http://localhost:8888/authors")
            .then(function (response) {
                $scope.authors = response.data;
            });
    }
    $scope.GetAllBooks();
    $scope.GetAllAuthors();

    $scope.getBooksByAuthorId = function (id) {
        $http.get("http://localhost:8888/books/" + id)
            .then(function (response) {
                $scope.books = response.data;
                $scope.Books = true;
                $scope.Authors = false;
            });
    }

    $scope.submitEditAuthor = function (editedAuthor) {
        if (editedAuthor = null || !isNullOrEmpty(editedAuthor.Name) || !isNullOrEmpty(editedAuthor.Surname) || !isNullOrEmpty(editedAuthor.Type)) {
            $scope.AuthorNotValid = true;
            return;
        }
        if (!isInt(editedAuthor.Year)) {
            $scope.AuthorNotValid = true;
            return;
        }
        $http.put("http://localhost:8888/author", $scope.editedAuthor)
            .then(function (response) {
                $scope.GetAllAuthors();
                $scope.cancel();
            });
    }
    $scope.submitEditBook = function (editedBook) {
        if (editedBook == null || editedBook.Author == null || !isNullOrEmpty(editedBook.Category)) {
            $scope.BookNotValid = true;
            return;
        }
        if (!isInt(editedBook.Year) || !isInt(editedBook.Price)) {
            $scope.BookNotValid = true;
            return;
        }
        $http.put("http://localhost:8888/book", $scope.editedBook)
            .then(function (response) {
                $scope.GetAllBooks();
                $scope.cancel();
            });
    }
    $scope.addNewAuthor = function (newAuthor) {
        if (newAuthor = null || !isNullOrEmpty(newAuthor.Name) || !isNullOrEmpty(newAuthor.Surname) || !isNullOrEmpty(newAuthor.Type)) {
            $scope.AuthorNotValid = true;
            return;
        }
        if (!isInt(newAuthor.Year)) {
            $scope.AuthorNotValid = true;
            return;
        }
        $http.post("http://localhost:8888/author", $scope.newAuthor)
            .then(function (response) {
                $scope.GetAllAuthors();
                $scope.cancel();
            });
    }

    $scope.addNewBook = function (newBook) {
        if (newBook == null || newBook.Author == null || !isNullOrEmpty(newBook.Category)) {
            $scope.BookNotValid = true;
            return;
        }
        if (!isInt(newBook.Year) || !isInt(newBook.Price)) {
            $scope.BookNotValid = true;
            return;
        }
        $http.post("http://localhost:8888/book", newBook)
            .then(function (response) {
                $scope.GetAllBooks();
                $scope.cancel();
            });
    };

    $scope.editAuthor = function (id) {
        $scope.editmodeAuthor = true;
        $scope.editedAuthor = findAuthorById(id);
    }

    $scope.editBook = function (book) {
        $scope.cancel();
        $scope.editomodeBook = true;
        $scope.editedBook = book;

    }

    $scope.removeAuthor = function (id) {
        $http.delete("http://localhost:8888/author/" + id)
            .then(function (response) {
                $scope.GetAllAuthors();
            });
    }
    $scope.removeBook = function (id) {
        $http.delete("http://localhost:8888/book/" + id)
            .then(function (response) {
                $scope.GetAllBooks();
            });
    }

    $scope.cancel = function () {
        $scope.addmodeAuthor = false;
        $scope.editmodeAuthor = false;
        $scope.editedAuthor = null;
        $scope.addmodeBook = false;
        $scope.newBook = null;
        $scope.editomodeBook = false;
        $scope.editedBook = null;
        $scope.BookNotValid = false;
        $scope.AuthorNotValid = false;
    }

    $scope.showAddFormAuthor = function () {
        $scope.cancel();
        $scope.addmodeAuthor = true;
    }

    $scope.showAddFormBook = function () {
        $scope.cancel();
        $scope.newBook = null;
        $scope.addmodeBook = true;
    }

    $scope.SortTitle = function () {
        if ($scope.orderBook != '+Title') {
            $scope.orderBook = '+Title';
        }
        else {
            $scope.orderBook = '-Title';
        }
    }

    $scope.SortYear = function () {
        if ($scope.orderBook != '+Year') {
            $scope.orderBook = '+Year';
        }
        else {
            $scope.orderBook = '-Year';
        }
    }

    $scope.SortPrice = function () {
        if ($scope.orderBook != '+Price') {
            $scope.orderBook = '+Price';
        }
        else {
            $scope.orderBook = '-Price';
        }
    }

    $scope.SortAuthorName = function () {
        if ($scope.orderBook != '+Author.Name') {
            $scope.orderBook = '+Author.Name';
        }
        else {
            $scope.orderBook = '-Author.Name';
        }
    }

    $scope.SortAuthorSurname = function () {
        if ($scope.orderBook != '+Author.Surname') {
            $scope.orderBook = '+Author.Surname';
        }
        else {
            $scope.orderBook = '-Author.Surname';
        }
    }

    $scope.SortCategory = function () {
        if ($scope.orderBook != '+Category') {
            $scope.orderBook = '+Category';
        }
        else {
            $scope.orderBook = '-Category';
        }
    }

    $scope.SortName = function () {
        if ($scope.orderAuthor != '+Name') {
            $scope.orderAuthor = '+Name';
        }
        else {
            $scope.orderAuthor = '-Name';
        }
    }

    $scope.SortSurname = function () {
        if ($scope.orderAuthor != '+Surname') {
            $scope.orderAuthor = '+Surname';
        }
        else {
            $scope.orderAuthor = '-Surname';
        }
    }

    $scope.SortBirth = function () {
        if ($scope.orderAuthor != '+Year') {
            $scope.orderAuthor = '+Year';
        }
        else {
            $scope.orderAuthor = '-Year';
        }
    }

    $scope.SortCountry = function () {
        if ($scope.orderAuthor != '+Country') {
            $scope.orderAuthor = '+Country';
        }
        else {
            $scope.orderAuthor = '-Country';
        }
    }

    $scope.SortType = function () {
        if ($scope.orderAuthor != '+Type') {
            $scope.orderAuthor = '+Type';
        }
        else {
            $scope.orderAuthor = '-Type';
        }

    }

    var findAuthorById = function (id) {
        for (var i = 0; i < $scope.authors.length; i++) {
            if ($scope.authors[i].Id === id) {
                return $scope.authors[i];
            }
        }
    }

    var isInt = function (value) {
        return !isNaN(value) &&
            parseInt(Number(value)) == value &&
            !isNaN(parseInt(value, 10));
    }

    var isNullOrEmpty = function (value) {
        if (value !== null && value !== '') {
            return true;
        }
        return false;
    }
    $scope.orderBook = null;
    $scope.orderAuthor = null;

});