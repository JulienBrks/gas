export function runBlock ($log, Restangular) {
  'ngInject';
  $log.debug('runBlock end');
  Restangular.setBaseUrl('http://localhost:8080');
}