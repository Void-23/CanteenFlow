// Validation function
function validateForm(values) {
    let errors = {};

    if (!values.email.trim()) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email is invalid";
    }

    if (!values.password.trim()) {
        errors.password = "Password is required";
    }

    return errors;
}

// Handle form submission
function handleSubmit() {
    const form = document.getElementById("signinForm");
    const email = form.elements["email"].value;
    const password = form.elements["password"].value;

    const values = {
        email: email,
        password: password
    };

    const errors = validateForm(values);

    document.getElementById("emailError").innerText = errors.email || "";
    document.getElementById("passwordError").innerText = errors.password || "";

    if (!errors.email && !errors.password) {
        const options = {
            method: "POST",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify(values),
        };

        fetch("http://localhost:8081/signin", options)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Network response was not ok");
                }
            })
            .then(data => {
                const errorMessageElement = document.getElementById("errorMessage");
                if (data === "Success") {
                    errorMessageElement.innerText = "";
                    window.location.href="index.html";
                } else if (data === "IncorrectPassword") {
                    errorMessageElement.innerText = "Incorrect password, please re-enter!";
                } else {
                    errorMessageElement.innerText = "Email does not exist";
                }
            })
            .catch(error => console.log(error));
    }
}
