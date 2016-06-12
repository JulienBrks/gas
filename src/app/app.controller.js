export class AppController {
  constructor($scope) {
    'ngInject';

    $scope.$on('$stateChangeSuccess', (event, toState) => {
      if (angular.isDefined(toState.data.bodyClasses)) {
          this.bodyClasses = toState.data.bodyClasses;
          return;
      }

        this.bodyClasses = 'default';
    });
  }
}
