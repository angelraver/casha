import 'angular';
import 'angular-material/angular-material.css';
import 'font-awesome/css/font-awesome.css';
import angularAnimate from 'angular-animate';
import angularMaterial from 'angular-material';
import angularUIRouter from 'angular-ui-router';
import home from './controllers/home';
import side from './controllers/side';
import profile from './controllers/profile';

import './scss/bootstrap.scss'

export const cashaModule = angular.module('casha', [
    angularMaterial,
    angularAnimate,
    angularUIRouter,
    home,
    profile,
    side
]);

cashaModule.config(($stateProvider) => {
  var side = {
    url: "/public",
    abstract: true,
    views: {
      'side': {
        templateUrl: require("./views/side.html"),
        controller: "SideController as side"
      }
    }
  }
  var home = {
    url: "/home",
    views: {
      'content@': {
        templateUrl: require("./views/home.html"),
        controller: "HomeController as home"
      }
    }
  }

  var profile = {
    url: "/profile",
    views: {
      'content@': {
        templateUrl: require("./views/profile.html"),
        controller: "ProfileController as profile"
      }
    }
  }

  $stateProvider.state('public', side);
  $stateProvider.state('public.home', home);
  $stateProvider.state('public.profile', profile);
});


cashaModule.controller('MainController', function($mdSidenav, $scope, $state, $q, $http) {

  $scope.montoActual = 0;
  $scope.colorMonto = 'rojo';

  function getActual(parameters) {
    var target = "http://ravergames.890m.com/casha/daily/";
    var defered = $q.defer();
    var promise = defered.promise;
    $http.post(target + 'getactual.php', parameters)
      .success(function(data) {
        defered.resolve(data);
      }).error(function(e) {
        defered.reject(err);
      });
    return promise;
  }

  let actualData = {
    iduser: 1,
    month: 7,
    year: 2017
  };

  getActual(actualData).then(function(data) {
      let monto = data[0].monto;
      $scope.montoActual = monto;
      $scope.colorMonto = monto < 0 ? 'rojo' : monto < 1000 ? 'naranja' : 'verde';
    })
    .catch(function(err) {});

  let vm = this;
  vm.toggleSidenav = () => {
    $mdSidenav('left').toggle();
  };

  vm.closeSidenav = () => {
    $mdSidenav('left').close();
  };

  $scope.cc = () => {
    $state.go('public.home');
  }


});