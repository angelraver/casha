import Highcharts from 'highcharts';
import moment from 'moment';
class ProfileController {
  constructor($scope, $http, $q) {
    'ngInject';

    $scope.mov = {};

    $scope.save = () => {

      var fecha;
      if ($scope.mov.fecha) {
        fecha = moment($scope.mov.fecha);
      } else {
        var d = new Date();
        fecha = moment(d);
      }

      $scope.mov.iduser = 1;
      $scope.mov.day = fecha.format('D');
      $scope.mov.month = fecha.format('M');
      $scope.mov.year = fecha.format('YYYY');

      if (!$scope.mov.idtype || !$scope.mov.mount || !$scope.mov.iditem) {
        return false;
      }

      addDaily($scope.mov).then(function(data) {
          $scope.$parent.montoActual = $scope.$parent.montoActual + $scope.mov.mount;
        })
        .catch(function(err) {});

    }

    function addDaily(mov) {
      console.log('hola');
      var target = "http://ravergames.890m.com/casha/daily/";
      var defered = $q.defer();
      var promise = defered.promise;
      $http.post(target + 'add.php', mov)
        .success(function() {
          defered.resolve('exito');
        }).error(function(e) {
          defered.reject(err);
        });
      return promise;
    }


    function getDaily() {
      var target = "http://ravergames.890m.com/casha/daily/";
      var defered = $q.defer();
      var promise = defered.promise;
      $http.get(target + 'get.php?id=1')
        .success(function(data) {
          defered.resolve(data);
        }).error(function(e) {
          defered.reject(err);
        });
      return promise;
    }

    function monthMoney(monthData) {
      Highcharts.chart('container', {
        chart: {
          type: 'spline'
        },
        title: {
          text: 'Tu dinero en el mes'
        },
        subtitle: {
          text: ''
        },
        xAxis: {
          categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        },
        yAxis: {
          title: {
            text: 'Efectivo'
          },
          labels: {
            formatter: function() {
              return this.value + '$';
            }
          }
        },
        tooltip: {
          crosshairs: true,
          shared: true
        },
        plotOptions: {
          spline: {
            marker: {
              radius: 4,
              lineColor: '#666666',
              lineWidth: 1
            }
          }
        },
        series: [
          {
            name: 'Dinero',
            marker: {
              symbol: 'diamond'
            },
            data: monthData
          }]
      });
    }


    getDaily().then(function(data) {
        let processedData = data.map(function(dayData) {
          return {
            y: Number(dayData.mount),
            marker: {
              symbol: 'url(dev/assets/emojis/sun.png)'
            }
          }
        });

        let bb = [
          {
            y: 10000,
            marker: {
              symbol: 'url(dev/assets/emojis/sun.png)'
            }
                },

          {
            y: 1500,
            marker: {
              symbol: 'url(dev/assets/emojis/sun.png)'
            }
                }];

        console.log(bb);
        console.log(processedData);
        monthMoney(processedData);
      })
      .catch(function(err) {});
  }

}

//require('./profile.scss');

let ProfileModule = angular.module('ProfileModule', []);
ProfileModule.controller('ProfileController', ProfileController);
export default ProfileModule = ProfileModule.name