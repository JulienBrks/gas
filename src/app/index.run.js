export function runBlock ($log, Restangular) {
  'ngInject';
  $log.debug('runBlock end');
  Restangular.setBaseUrl('http://120.26.125.197:8081');
}
