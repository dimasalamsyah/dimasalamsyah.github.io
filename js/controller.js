

app.controller("homeCtrl", function($scope, MyService, $location) {
  $scope.header = "Login";
  $scope.footer = footer_set;
  $scope.setTheme = MyService.setTheme;
  $scope.sideNav = MyService.sideNav;
  //$scope.items = sideMenu;


  //$scope.getSideMenu = $scope.sideMenu[0];


});


app.controller("loginCtrl", function($scope, MyService, $location) {
  $scope.header = "Login";
  $scope.footer = footer_set;
  $scope.setTheme = MyService.setTheme;

  $scope.login = function(user){
    if(user.username=="dimas" && user.password=="dimas12"){
      $location.path("/home");
      console.log("login succses");
    }else{
      console.log("login failed");
    }
    //console.log(user.username);
  }

});

app.controller("headerCtrl", function($scope, MyService) {

});

app.controller("accountingCtrl", function($scope, MyService, account) {

  $scope.header = "Accounting";
  $scope.footer = footer_set;
  $scope.setTheme = MyService.setTheme;

  $scope.calEnding = function(begin, in_, out_){
    $scope.outValEnding = MyService.setValEnding(begin, in_, out_);

    $scope.accounting.ending = MyService.setValEnding(begin, in_, out_);

  }

  $scope.accounting = {
      begin: 0,
      in_: 0,
      out: 0,
      ending: 0,
      startAt: getDete,
      updateAt: getDete
   };

  $scope.outValEnding = 0;
  $scope.today = new Date();

    $scope.submit = function(accounting){
      account.create(accounting);

      //console.log($scope.accounting.ending);
      console.log(accounting);

      //console.log(day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + hour +':'+ minute);
    }

});

app.controller("indexCtrl", function($scope, MyService, account) {
  $scope.setTheme = MyService.setTheme;

  $scope.sideMenu = [
      {menu: 'Login', link: 'login'},
      {menu: 'Accounting', link: 'accounting'},
      {menu: 'Accounting Detail', link: 'accounting-detail'},
      {menu: 'About', link: 'about'},
      {menu: 'Logout', link: 'logout'}
  ];


});


app.controller("accountingDetailCtrl", function($scope, MyService, account, $firebase, $routeParams, $location) {

  $scope.header = "Accounting Detail";
  $scope.footer = footer_set;
  $scope.setTheme = MyService.setTheme;
  $scope.sideNav = MyService.sideNav;
  $scope.pageSize = 10;
  $scope.get_account= account.all;

  $scope.deleteItem = function(id, key){
    $scope.get_account.$remove(id);
    console.log(id);
  }

  $scope.editItem = function(value) {
    $location.path("/accounting-detail-edit");
    console.log(account.edit(value));
    MyService.accounting = value;

  }

});

app.controller("accountingDetailEditCtrl", function($scope, MyService, account, $location) {
  $scope.setTheme = MyService.setTheme;
  $scope.accounting = MyService.accounting;
  var id =MyService.accounting.$id;
  var url = 'https://studystupid-49162.firebaseio.com/accounting/' +id;
  editRef = new Firebase(url);

  $scope.submit = function(accounting){
    editRef.update({
      begin: MyService.accounting.begin,
      in_: MyService.accounting.in_,
      out: MyService.accounting.out,
      ending: MyService.accounting.ending,
      note: MyService.accounting.note
    });
    //console.log(url);
    $location.path("/accounting-detail");
  }


});

app.controller('aboutCtrl', function($scope, MyService, $routeParams, $firebase, $location) {

  var userUrl = 'https://studystupid-49162.firebaseio.com/accounting/' + $routeParams.id;
  var users = MyService;

  $scope.user = new Firebase(userUrl);

  $scope.updateUser = function () {

    // var names = [];
    // var keys = users.$getIndex();
    // keys.forEach(function(key) {
    //   names.push(users[key].name);
    // });

  console.log(userUrl);
  //$scope.message = 'User already exists';


  };

});



app.factory('account', ['$firebase',
  function($firebase) {
    var ref = new Firebase(firebaseUrl);
    var accounting = $firebase(ref.child('accounting')).$asArray();

    var account = {
      all: accounting,
      create: function (message) {
        return accounting.$add(message);
      },
      get: function (messageId) {
        return $firebase(ref.child('accounting').child(messageId)).$asObject();

      },
      delete: function (message) {
        return accounting.$remove(account);
      },
      edit: function(value){
        return value;
      }
    };

    return account;


  }
  ]);
