export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'app/main/main.html',
    controller: 'MainController',
    controllerAs: 'main'
  })
  .state('materialList', {
    url: '/material',
    templateUrl: 'app/material/list.html',
    controller: 'MaterialListController',
    controllerAs: 'listController',
    data: {
      bodyClasses: 'material-list'
    }
  });

  $urlRouterProvider.otherwise('/material');
}
