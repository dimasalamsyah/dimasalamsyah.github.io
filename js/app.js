var firebaseUrl = "https://studystupid-49162.firebaseio.com/";

var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

var footer_set = "&copy Dimas Alamsyah";

var date = new Date();
var day = date.getDate();
var monthIndex = date.getMonth();
var year = date.getFullYear();
var hour = date.getHours();
var minute = date.getMinutes();

var getDete = day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + hour +':'+ minute;

var app = angular.module("MyApp", ["ngRoute", "firebase"]);

function w3_open() {
    document.getElementById("mySidenav").style.display = "block";
}
function w3_close() {
    document.getElementById("mySidenav").style.display = "none";
}

app.config(function($routeProvider) {
    $routeProvider
    .when("/aa", {
        templateUrl : "templates/home.html",
        controller : "homeCtrl"
    })
    .when("/login", {
        templateUrl : "templates/login.html",
        controller : "loginCtrl"
    })
    .when("/home", {
        templateUrl : "templates/home.html",
        controller : "homeCtrl"
    })
    .when("/accounting", {
        templateUrl : "templates/accounting.html",
        controller : "accountingCtrl"
    })
    .when("/accounting-detail", {
        templateUrl : "templates/accounting_detail.html",
        controller : "accountingDetailCtrl"
    })
    .when("/accounting-detail-edit", {
        templateUrl : "templates/accounting_detail_edit.html",
        controller : "accountingDetailEditCtrl"
    })
    .when("/about", {
        templateUrl : "templates/about.html",
        controller : "aboutCtrl"
    })
    //$routeProvider.otherwise({redirectTo: '/login'})

    ;
});
