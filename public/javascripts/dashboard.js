/**
 * Created by Hemang on 30/06/17.
 */
var app = angular.module('Form', [])

app.controller('fc', function ($scope, $http) {
    $scope.candidate = {};
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
    $scope.submitForm = function () {
        console.log($scope.candidate);
        $http.post('/dashboard/userinfo', JSON.stringify($scope.candidate))
            .then(function (data) {
                console.log(data);
            })
    }


});

app.controller('vc', function ($scope, $http) {
    $http.get('/dashboard/vacancies')
        .then(function (data) {
            console.log(data)
            $scope.vacancies = data.data;
            console.log($scope.vacancies)
        })
})
