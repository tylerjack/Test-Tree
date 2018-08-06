angular.module("myApp", []).controller("TreeController", ['$scope', function($scope) {
    
    var jsonObj = $.getJSON("https://raw.githubusercontent.com/tylerjack/Test-Tree/master/treeNodes.json");
    $scope.delete = function(data) {
        data.children = [];
    };
    $scope.add = function(data) {
        var post = data.children.length + 1;
        var newName = data.name + '-' + post;
        data.nodes.push({name: newName,children: []});
    };
    $scope.tree = jsonObj;//[{name: "Node", children: []}];

}]);