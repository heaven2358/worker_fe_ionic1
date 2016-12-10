'use strict';

describe('Controller: TargetselectorCtrl', function () {

  // load the controller's module
  beforeEach(module('enterpriseFundsApply'));

  var TargetselectorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TargetselectorCtrl = $controller('TargetselectorCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TargetselectorCtrl.awesomeThings.length).toBe(3);
  });
});
