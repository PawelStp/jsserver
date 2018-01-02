var app = angular.module('myBook', []);
app.controller('myBookCtrl', function($scope, $http) {

    $scope.ClickAuthors = function() {
        $scope.Books = false;
        $scope.Authors = true;
        $scope.GetAllAuthors()
    };
    $scope.ClickBooks = function() {
        $scope.Books = true;
        $scope.Authors = false;
        $scope.GetAllBooks();
    };

    $scope.GetAllBooks = function() {
        $http.get("http://localhost:8888/books")
            .then(function(response) {
                $scope.books = response.data;
            });
    }
    $scope.GetAllAuthors = function() {
        $http.get("http://localhost:8888/authors")
            .then(function(response) {
                $scope.authors = response.data;
            });
    }
    $scope.GetAllBooks();

    $scope.getBooksByAuthorId = function(id) {
        $http.get("http://localhost:8888/books/" + id)
            .then(function(response) {
                $scope.books = response.data;
                $scope.Books = true;
                $scope.Authors = false;
            });
    }
});