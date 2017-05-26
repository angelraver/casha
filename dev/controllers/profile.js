class ProfileController {

  constructor($scope) {
    'ngInject';

  }
}

//require('./profile.scss');

let ProfileModule = angular.module('ProfileModule', []);
ProfileModule.controller('ProfileController', ProfileController);
export default ProfileModule = ProfileModule.name