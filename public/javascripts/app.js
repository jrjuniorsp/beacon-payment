"use strict";

var app = angular.module("PaymentNodeApp",["ngRoute"]);

app.config(function($routeProvider, $locationProvider) {
    	$routeProvider.
      	when('/', {
     		templateUrl: '/pages/home.html',
       		controller: 'HomeCtrl'
     	}).
      when('/payment', {
        templateUrl: '/pages/payment.html',
        controller: 'PaymentCtrl'
      }).
      when('/products', {
        templateUrl: '/pages/products.html',
        controller: 'ProductsCtrl'
      }).      
      when('/products_new', {
        templateUrl: '/pages/products_new.html',
        controller: 'ProductsNewCtrl'
      }).            
    	otherwise({
        	redirectTo: '/'
      });
		  // use the HTML5 History API
      $locationProvider.html5Mode({
    	enabled: true,
    	requireBase: false
		});      	
});

app.controller("HomeCtrl",function($rootScope) {
  $rootScope.title = "Home";
  
});

app.controller("PaymentCtrl", function($scope, $rootScope, $http) {
  $rootScope.title = "Payment";
  $scope.products = [];

  $scope.click = function(event) {
    $http.get('/products/find')
    .success(function(data, status, headers, config) {
      if (data && data.length > 0) {
        $scope.products = data;  
      } else {
        alert('Nenhum produto encontrado');
      }
      
    })
    .error(function(data, status, headers, config) {
      alert('Erro');
    });
  }

});

app.controller('ProductsCtrl', function($scope, $rootScope, $http, $location) {
  $rootScope.title = "Products";
  $scope.products = [];
  $scope.$on('$viewContentLoaded', function() {
    $http.get('/products/find')
    .success(function(data, status, headers, config) {
      if (data && data.length > 0) {
        $scope.products = data;
      } else {
        alert('Nenhum produto Encontrado');
      }
    });
  }); 
  $scope.delete = function(id, name) {
    var result = confirm('Do you want to delete the product: ' + name);
    if (result == true) {
      $http.delete('/products/delete/' + id)
      .success(function(data, status, headers, config) {
        $http.get('/products/find')
        .success(function(data, status, headers, config) {
          if (data && data.length > 0) {
            $scope.products = data;
          } else {
            alert('Nenhum produto Encontrado');
          }
        });
      })
      .error(function(data, status, headers, config) {
        alert('Erro');
      });
    }
  }
});

app.controller('ProductsNewCtrl', function($scope, $rootScope, $http, $location) {
  $rootScope.title = "New Product";
  $scope.product = {};

  $scope.salvar = function(event) {
    //TODO: validate
    $http.post('/products/add', $scope.product)
    .success(function(data, status, headers, config) {
      $location.path('/products');
    })
    .error(function(data, status, headers, config) {
      alert('Erro');
    });
  }

});