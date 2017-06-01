"use strict";

class DailyService {
  constructor($http, $q) {
    'ngInject';

    var target = "http://ravergames.890m.com/casha/daily/";


    let hola = () => {
      console.log('pepe');
      return false;
    }

    let getAll = () => {
      var defered = $q.defer();
      var promise = defered.promise;
      $http.get(target + 'get.php?id=1')
        .success(function(data) {
          defered.resolve(data);
        })
        .error(function(err) {
          defered.reject(err)
        });

      return promise;
    }

    let add = (data) => {
      console.log(data);
      return true;
      /*
      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(target + 'add.php', data)
        .success(function() {
          console.log('exito');
        }).error(function(e) {
          console.loh(e);
        });
        */
    };

    return {
      getAll: getAll,
      add: add,
      hola: hola
    }

  }
}
let DailyModule = angular.module('DailyModule', []);
DailyModule.service('DailyService', DailyService);
export default DailyModule = DailyModule.name