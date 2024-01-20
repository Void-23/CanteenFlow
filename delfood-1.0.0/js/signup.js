// Validation function
function validateForm(values) {
    let errors = {};

    if (!values.name.trim()) {
        errors.name = "Name is required";
    }

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

    // console.log("Button clicked");

    const form = document.getElementById("signupForm");
    const name = form.elements["name"].value;
    const email = form.elements["email"].value;
    const password = form.elements["password"].value;

    const values = {
        name: name,
        email: email,
        password: password
    };

    const errors = validateForm(values);

    document.getElementById("nameError").innerText = errors.name || "";
    document.getElementById("emailError").innerText = errors.email || "";
    document.getElementById("passwordError").innerText = errors.password || "";

    if (!errors.name && !errors.email && !errors.password) {
        const options = {
            method: "POST",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify(values),
        };

        fetch("http://localhost:8081/signup", options)
            .then(response => {
                if (response.ok) {
                    document.getElementById("successMessage").innerText = "You have registered successfully!";
                    document.getElementById("errorMessage").innerText = "";
                    window.location.href="signin.html"
                } else {
                    document.getElementById("successMessage").innerText = "";
                    document.getElementById("errorMessage").innerText = "An error occurred during registration.";
                    console.log("Network error occurred");
                }
            })
            .catch(error => {
                document.getElementById("successMessage").innerText = "";
                document.getElementById("errorMessage").innerText = "An error occurred during registration.";
                console.log(error);
            });
    }
}
