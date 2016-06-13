import { CreateController as MaterialCreateController } from './create.controller';

export class ListController {
    constructor($mdDialog, $document, Restangular) {
        'ngInject';

        this.$mdDialog = $mdDialog;
        this.MaterialCreateController = MaterialCreateController;
        this.$document = $document;
        this.Restangular = Restangular;
        this.filter = {
            date: null,
            dispatchPlace: null
        }
        this.getList();
        // angular.element('.items>table').colResizable();
    }
    showCreateDialog(ev) {
        this.$mdDialog.show({
            controller: this.MaterialCreateController,
            templateUrl: 'app/material/create.html',
            parent: angular.element(this.$document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true,
            controllerAs: 'createController'
        });
    }
    getList() {
      this.Restangular.all('tblDisplist').getList({
        _expand: ['tblDriver', 'tblShipper', 'tblCustomer', 'tblCargo'] // TODO 还有一些字段需要确定
      }).then((list) => {
        this.list = list;
      });
    }
}
