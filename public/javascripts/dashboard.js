/**
 * Created by Hemang on 30/06/17.
 */
var app = angular.module('Form', [])

app.controller('fc', function ($scope) {
    $scope.attributes = [
        {
            "key" : "Basic Information",
            "val" : 0
        },
        {
            "key" : "Academic Details",
            "val" : 1
        },
        {
            "key" : "Experience",
            "val" : 2
        },
        {
            "key" : "Research and Academic",
            "val" : 3
        },
        {
            "key" : "Curricular Activities",
            "val" : 4
        },
        {
            "key" : "Other Declaration",
            "val" : 5
        },
        {
            "key" : "Uploads",
            "val" : 6
        }
    ]
    $scope.isSelected = function (value) {
        return value.val == $scope.selected;
    }
    $scope.setSelected = function (value) {
        $scope.selected = value;
    }

});

