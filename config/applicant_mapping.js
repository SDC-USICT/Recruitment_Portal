

module.exports = function(req){
    console.log('imherebiteches')
  var userinfo = {
      "AadharId" : req.body.aadhar,
      "Discipline" : req.body.cse,
      "FirstName" : req.body.first_name,
      "LastName" : req.body.last_name,
      "Age" : req.body.age,
      "CAddress" : req.body.correspondence_addr,
      "PAddress" : req.body.perm_addr,
      "MNumber" : req.body.mobile,
      "LLNumber" : req.body.landline,
      "Email" : req.body.email,
      "DOB" : req.body.dob,
      "FHFirstName" : req.body.fhf_name,
      "FHLastName" : req.body.fhl_name,
      "Gender" : req.body.gender,
      "Marital" : req.body.marital_status,
      "Nationality" : req.body.nationality,
      "Religion" : req.body.religion,
      "Minority" : req.body.minority,
      "Category" : req.body.category,
      "EmpAddress" : req.body.cand_employer_address,
      "XP" : req.body.x_board,
      "XB" : req.body.cand_x_pass_year,
      "XY" : req.body.cand_x_division,
      "XD" : req.body.cand_x_grade,
      "XS" : req.body.cand_x_subject,
      "XIIB" : req.body.cand_xii_board,
      "XIIY" : req.body.cand_xii_pass_year,
      "XIIP" : req.body.cand_xii_division,
      "XIID" : req.body.cand_xii_grade,
      "XIIS" : req.body.cand_xii_subject,
      "MP" : req.body.cand_mtech_board,
      "MB" : req.body.cand_mtech_pass_year,
      "MY" : req.body.cand_mtech_division,
      "MS" : req.body.cand_mtech_subject,
      "MD" : req.body.cand_mtech_grade,
      "PB" : req.body.cand_phd_board,
      "PY" : req.body.cand_phd_pass_year,
      "PD" : req.body.cand_phd_thesis_submission,
      "PT" : req.body.cand_phd_thesis_title,
      "FOS" : req.body.cand_specialization,
      "GRoll" : req.body.cand_gate_roll_number,
      "GYear" : req.body.cand_gate_date,
      "Reference1" : req.body.cand_ref1_name,
      "Reference2" : req.body.cand_ref1_address,
      "Reference1_Address" : req.body.cand_ref2_name,
      "Reference2_Address" : req.body.cand_ref2_address,
      "extradetail" : req.body.cand_extras
  }

  console.log(userinfo)
return userinfo;
}
