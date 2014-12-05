window.allocator = angular.module('allocator', []);

window.allocator.controller('AllocatorController', ["$scope", function($scope) {
  $scope.c1Percentage = 0;
  $scope.c1Allocation = [];
  $scope.c2Allocation = [];
  $scope.totalAmount = 0;
  $scope.unit = [];
  $scope.unitCost = [];
  $scope.unitCounter = [0];

  $scope.addFields = function() {
    var counter = $scope.unitCounter[$scope.unitCounter.length - 1] + 1;

    $scope.unitCounter.push(counter);
  }

  var randomizer = function(unitCount) {
    var randomIndex = Math.floor(Math.random() * ( unitCount + 1));

    if(randomIndex != 0) {
      randomIndex -= 1;
    }

    return randomIndex;
  }

  $scope.allocate = function() {
    var c1Percentage = $scope.c1Percentage / 100
      , units = angular.copy($scope.unit)
      , unitCount = units.length
      , unitCosts = angular.copy($scope.unitCost)
      , c1NumberOfUnits = Math.ceil(unitCount * c1Percentage);

    $scope.c1Allocation = [];
    $scope.c2Allocation = [];

    for(i = 0; i < c1NumberOfUnits; i++) {
      var randomIndex = randomizer(unitCount);

      $scope.c1Allocation.push({ unit: units[randomIndex], unitCost: unitCosts[randomIndex] });

      units.splice(randomIndex, 1);
      unitCosts.splice(randomIndex, 1);

      unitCount = units.length;
    }

    $.each(units, function(i, v) {
      $scope.c2Allocation.push({ unit: v, unitCost: unitCosts[i] });
    });
  }
}]);
