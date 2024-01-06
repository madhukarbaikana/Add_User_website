let addUserForm = document.getElementById("addUserForm");
let nameEle = document.getElementById("name");
let nameErrMsg = document.getElementById("nameErrMsg");
let emailErrMsg = document.getElementById("emailErrMsg");
let emailEle = document.getElementById("email");
let statusEle = document.getElementById("status");
let genderMaleEle = document.getElementById("genderMale");
let genderFemaleEle = document.getElementById("genderFemale");
let formData = {
    name: "",
    email: "",
    status: "Active",
    gender: "Male"
};

//change values and include validation  for name and email 
nameEle.addEventListener("change", function(event) {
    if (event.target.value === "") {
        nameErrMsg.textContent = "Required Name *";
    } else {
        nameErrMsg.textContent = "";
    }
    formData.name = event.target.value;
});

emailEle.addEventListener("change", function(event) {
    if (event.target.value === "") {
        emailErrMsg.textContent = "Required Email *";
    } else {
        emailErrMsg.textContent = "";
    }
    formData.email = event.target.value;
});
//lets change the values in formData
statusEle.addEventListener("change", function(event) {
    formData.statusEle = event.target.value;
});
genderMaleEle.addEventListener("change", function(event) {
    formData.gender = event.target.value;
});
genderFemaleEle.addEventListener("change", function(event) {
    formData.gender = event.target.value;
});
//validate form 
function validateForm(formData) {
    let {
        name,
        email
    } = formData;
    if (name === "") {
        nameErrMsg.textContent = "Required Name *";
    }
    if (email === "") {
        emailErrMsg.textContent = "Required Email *";
    }
}

function submitFormData(formData) {
    let url = "https://gorest.co.in/public-api/users";
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer 71f74e4cf06839fd4fa606ea0ab8b50f660900d1c21acc6e30ce8d7d6f27348c"
        },
        body: JSON.stringify(formData)
    };
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            console.log(formData);
            console.log(jsonData);
            if (jsonData.code === 422) {
                if (jsonData.data[0].message === "has already been taken") {
                    emailErrMsg.textContent = "Email has already been taken";
                }
            }
        })
}
//to prevent the default action 
addUserForm.addEventListener('submit', function(event) {
    event.preventDefault();
    validateForm(formData);
    submitFormData(formData);
});
