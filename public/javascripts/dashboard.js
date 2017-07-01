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
            "key" : "Contact Details",
            "val" : 1
        },
        {
            "key" : "Additional Details",
            "val" : 2
        },
        {
            "key" : "Academic Details",
            "val" : 3
        },
        {
            "key" : "Experience",
            "val" : 4
        },
        {
            "key" : "PhD Details",
            "val" : 5
        },
        {
            "key" : "References",
            "val" : 6
        },
        {
            "key" : "Other Information",
            "val" : 7
        },
        {
            "key" : "Uploads",
            "val" : 8
        }
    ]
    $scope.isSelected = function (value) {
        return value.val == $scope.selected;
    }
    $scope.setSelected = function (value) {
        $scope.selected = value;
    }

});

