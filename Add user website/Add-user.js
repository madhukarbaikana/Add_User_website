let addUserFormEl = document.getElementById("addUserForm");
let nameEl = document.getElementById("name");
let nameErrMsgEl = document.getElementById("nameErrMsg");

let emailEl = document.getElementById("email");
let emailErrMsgEl = document.getElementById("emailErrMsg");

let statusEl = document.getElementById("status");

let genderMaleEl = document.getElementById("genderMale");
let genderFemaleEl = document.getElementById("genderFemale");

let data = {
    name: "",
    email: "",
    workingStatus: "Active",
    gender: "Male"
}
let nameValidation = function() {
    if (nameEl.value === "") {
        nameErrMsgEl.textContent = "Required*";

    } else {
        nameErrMsgEl.textContent = "";
    }
    data.name = nameEl.value;
}
let emailValidation = function() {
    if (emailEl.value === "") {
        emailErrMsgEl.textContent = "Required*";
    } else {
        emailErrMsgEl.textContent = "";
    }
    data.email = emailEl.value;
}


nameEl.addEventListener("change", nameValidation);
emailEl.addEventListener("change", emailValidation);

statusEl.addEventListener("change", function(event) {
    data.workingStatus = event.target.value;
})
genderMaleEl.addEventListener("change", function(event) {
    data.gender = event.target.value;
})
genderFemaleEl.addEventListener("change", function(event) {
    data.gender = event.target.value;
})

function validateData() {
    if (data.name === "") {
        nameErrMsgEl.textContent = "Required*";
    }
    if (data.email === "") {
        emailErrMsgEl.textContent = "Required*"
    }
}

function requestData() {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer b575a06aeac037ece3a4f2000dbf8c28b5ca69b35db227905e71a32be0d2d719"
        },
        body: JSON.stringify(data)
    };
    fetch("https://gorest.co.in/public-api/users", options)
        .then(function(response) {
            return response.json();
        }).then(function(jsonData) {
            if (jsonData.code === 422) {
                if (jsonData.data[0].message === "has alredy been taken") {
                    emailErrMsgEl.textContent = "Email already been taken";
                }
            }

        })
}


addUserFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    validateData();
    requestData();
})