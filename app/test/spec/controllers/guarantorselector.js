'use strict';

describe('Controller: GuarantorselectorCtrl', function () {

  // load the controller's module
  beforeEach(module('enterpriseFundsApply'));

  var GuarantorselectorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GuarantorselectorCtrl = $controller('GuarantorselectorCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GuarantorselectorCtrl.awesomeThings.length).toBe(3);
  });
});
