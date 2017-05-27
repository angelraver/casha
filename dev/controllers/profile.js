import Highcharts from 'highcharts';
class ProfileController {
  constructor($scope) {
    'ngInject';



    var myChart = Highcharts.chart('container', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Fruit Consumption'
      },
      xAxis: {
        categories: ['Apples', 'Bananas', 'Oranges']
      },
      yAxis: {
        title: {
          text: 'Fruit eaten'
        }
      },
      series: [{
        name: 'Jane',
        data: [1, 0, 4]
        }, {
        name: 'John',
        data: [5, 7, 3]
        }]
    });


  }
}

//require('./profile.scss');

let ProfileModule = angular.module('ProfileModule', []);
ProfileModule.controller('ProfileController', ProfileController);
export default ProfileModule = ProfileModule.name