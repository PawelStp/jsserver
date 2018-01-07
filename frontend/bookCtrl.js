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

    $scope.submitEditAuthor = function () {
        $http.put("http://localhost:8888/author", $scope.editedAuthor)
            .then(function (response) {
                $scope.GetAllAuthors();
                $scope.cancel();
            });
    }
    $scope.submitEditBook = function(){
        $http.put("http://localhost:8888/book", $scope.editedBook)
        .then(function (response) {
            $scope.GetAllBooks();
            $scope.cancel();
        });
    }
    $scope.addNewAuthor = function (newAuthor) {
        $http.post("http://localhost:8888/author", $scope.newAuthor)
            .then(function (response) {
                $scope.GetAllAuthors();
                $scope.cancel();
            });
    }

    $scope.addNewBook = function (newBook) {
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
        $scope.editedAuthor = 0;
        $scope.addmodeBook = false;
        $scope.newBook = null;
        $scope.editomodeBook = false;
        $scope.editedBook = 0;
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



    var findAuthorById = function (id) {
        for (var i = 0; i < $scope.authors.length; i++) {
            if ($scope.authors[i].Id === id) {
                return $scope.authors[i];
            }
        }
    }


});