export class CreateController {
    constructor($mdDialog, Restangular, $log, $scope) {
        'ngInject';

        this.model = {};
        this.$mdDialog = $mdDialog;
        this.Restangular = Restangular;
        this.$log = $log;
        this.$scope = $scope;

        this.getSelectOptions();
        this.changeList();
    }
    change(key, cb) {
      this.$scope.$watch(() => {
        let value = this;
        _.each(key.split('.'), (key) => {
          value = value[key];
        });
        return value;
      }, (newValue, oldValue) => {
        if (newValue !== oldValue) {
          cb();
        }
      });
    }
    changeList() {
      this.changeCt2();
      this.changeTc();
    }
    // 收货单位选择之后就会变更开票单位
    changeCt2() {
      this.change('model.ct2', this.getRelateSelectOptions.bind(this, 'ct_id', 'cts', 'ct', 'tblCustomer', 'ct_id', 'ct2', 'cts2', 'tblLink_Co_SheetCo', true));
    }
    changeTc() {
      this.change('model.tc', this.getRelateSelectOptions.bind(this, 'vh_id', 'vhs', 'vh', 'tblVehicle', 'tc_id', 'tc', 'tcs', 'tblLink_TransCo_Vehicle', true));
      this.change('model.tc', this.getRelateSelectOptions.bind(this, 'dv_id', 'dvs', 'dv', 'tblDriver', 'tc_id', 'tc', 'tcs', 'tblLInk_TransCo_Driver', true));
    }
    getRelateSelectOptions(idKey, idArrayKey, selectedKey, tableName, relateIdKey, relateSelectedKey, relateArrayKey, relateTableName, isForce) {
      if (isForce || !this.model[selectedKey]) {
        this.Restangular.all(relateTableName).getList({
          [relateIdKey]: this.model[relateSelectedKey] ? this.model[relateSelectedKey][relateIdKey] : null
        }).then((relateData) => {
          this.Restangular.all(tableName).getList({
            [idKey]: _.map(relateData, idKey)
          }).then((data) => {
            this.model[idArrayKey] = data;
            if (isForce) {
              this.model[selectedKey] = data[0];
            }
          })
        });
      }
    }
    getSelectOptions(route, key) {
      if (!this.model[key]) {
        return this.Restangular.all(route).getList().then((data) => {
          this.model[key] = data;
        });
      }
    }
    cancel() {
      this.$mdDialog.cancel();
    }
    getPostDate() {
      let postData = {
        shift: this.model.shift,
        self: this.model.self,
        sp_id: this.model.sp.sp_id,
        ct_id2: this.model.ct.ct_id,
        ct_id: this.model.ct2.ct_id,
        dt_id: this.model.dt.dt_id,
        cg_id: this.model.cg.cg_id,
        cg_id2: this.model.cg2.cg_id,
        gwt: this.model.gwt,
        tare: this.model.tare,
        adt: this.model.adt,
        tc_id: this.model.tc.tc_id,
        vh_id: this.model.vh_id,
        dv_id: this.model.dv.dv_id,
        strip: this.model.strip,
        note: this.model.note,
        dl_date: this.model.dl_date,
        CTT: moment(new Date()).toISOString(),
        MDT: moment(new Date()).toISOString()
      }
      return postData;
    }
    ajaxSend(postData) {
      return this.Restangular.all('tblDisplist').customPOST(postData);
    }
    createSuccess() {
      this.$mdDialog.hide();
    }
    createFail() {
      alert('创建失败!');
    }
    create() {
      let postData = this.getPostDate();
      this.ajaxSend(postData)
      .then(this.createSuccess.bind(this), this.createFail.bind(this));
    }
}
