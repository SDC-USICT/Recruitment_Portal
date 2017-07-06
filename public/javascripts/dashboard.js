/**
 * Created by Hemang on 30/06/17.
 */
//utils

function mapper(r) {
    console.log(r);
    return  {
        "aadhar" : r.AadharId,
        "cse" : r.Discipline,
        "first_name" : r.FirstName,
        "last_name" : r.LastName,
        "age" : r.age,
        "correspondence_addr" : r.CAddress,
        "perm_addr" : r.PAddress,
        "mobile" : r.MNumber,
        "landline" : r.LNumber,
        "email" : r.Email,
        "dob" : r.DOB,
        "fhf_name" : r.FHFirstName,
        "fhl_name" : r.FHLastName,
        "gender" : r.gender,
        "marital_status" : r.Marital,
        "nationality" : r.Nationality,
        "religion" : r.Religion,
        "minority" : r.Minority,
        "category" : r.Category,
        "cand_employer_address" : r.EmpAddress,
        "x_board" : r.XP,
        "cand_x_pass_year" : r.XB,
        "cand_x_division" : r.XY,
        "can_x_grade" : r.XD,
        "cand_x_subject" : r.XS,
        "cand_xii_board" : r.XIIB,
        "cand_xii_pass_year" : r.XIIY,
        "cand_xii_division" : r.XIIP,
        "cand_xii_grade" : r.XIID,
        "cand_xii_subject" : r.XIIS,
        "cand_mtech_board" : r.MP,
        "cand_mtech_pass_year" : r.MB,
        "cand_mtech_division" : r.MY,
        "cand_mtech_subject" : r.MS,
        "cand_mtech_grade" : r.MD,
        "cand_phd_board" : r.PB,
        "cand_phd_pass_year" : r.PY,
        "cand_phd_thesis_submission" : r.PD,
        "cand_phd_thesis_title" : r.PT,
        "cand_specialization" : r.FOS,
        "cand_gate_roll_number" : r.GRoll,
        "cand_gate_date" : r.GYear,
        "cand_ref1_name" : r.Reference1,
        "cand_ref1_address" : r.Reference1_Address,
        "cand_ref1_name" : r.Reference2,
        "cand_ref2_address" : r.Reference2_Address,
        "cand_extras" : r.extradetail,

    }
}

var app = angular.module('Form', [])

app.controller('mc', function ($scope, $http) {
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
    $http.get('/dashboard/information')
        .then(function (data) {
            console.log('inside cand')
            $scope.candidate = mapper(data.data[0]);
            $scope.$evalAsync();
            console.log($scope.candidate.first_name)
        })

    $scope.s = window.s;
    $scope.applying = false;
    $scope.cur_candidate = {};


    $scope.setCurCandidates = function (value) {
        console.log('updating');
        $scope.cur_candidate = value;
        console.log($scope.cur_candidate)
        console.log($scope.cur_candidate.first_name);

        $scope.$evalAsync();
    }
    $http.get('/dashboard/vacancies')
        .then(function (data) {
            console.log(data)
            $scope.vacancies = data.data;
            console.log($scope.vacancies)
        })
    $scope.selectvc = function (val) {
        $(document).ready(function(){
            $('#apply').removeClass('hide');
            $('ul.tabs').tabs();
            $('#apply').click();
        })
        $scope.cur_vacancy = val;
        $scope.$evalAsync();

        if($scope.cur_vacancy) {
            console.log('inside')
            $http.post('/dashboard/app_data', JSON.stringify({vid : $scope.cur_vacancy}))
                .then(function (data) {
                    if(data.data.length == 1) {
                        $scope.cur_candidate = mapper(data.data[0]);
                        console.log('length 1')
                        console.log($scope.cur_candidate)
                        $scope.setCurCandidates(mapper(data.data[0]));

                    } else {
                        $scope.cur_candidate = $scope.candidate;
                    }
                    

                })
        }
        console.log('printing final')
        console.log($scope.cur_candidate)
    }




    $scope.submit_application = function () {
        $scope.cur_candidate['vacancy_id'] = $scope.cur_vacancy;
        $scope.cur_candidate['ApplicantId'] = $scope.s.UserId;
        $scope.cur_candidate['saveback']  = true;
        console.log($scope.cur_candidate);

        $http.post('/dashboard/apply', JSON.stringify($scope.cur_candidate))
            .then(function (data) {
                console.log(data);
            })

    }
})
