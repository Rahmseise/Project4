/********f************
    
	Project 3 Javascript
	Name: Jan Misa
	Date: 2025-04-16
	Description: form validation

*********************/

function hideErrors() {
	// Get an array of error elements
	let error = document.getElementsByClassName("error");

	// Loop through each element in the error array
	for (let i = 0; i < error.length; i++) {
		// Hide the error element by setting it's display style to "none"
		error[i].style.display = "none";
	}
}






function validate(e) {
	// Hides all error elements on the page
	hideErrors();

	// Determine if the form has errors
	if (formHasErrors()) {
		// Prevents the form from submitting
		e.preventDefault();

		// When using onSubmit="validate()" in markup, returning false would prevent
		// the form from submitting
		return false;
	}

	// When using onSubmit="validate()" in markup, returning true would allow
	// the form to submit
	return true;
}






function resetForm(e) {
	// Confirm that the user wants to reset the form.
	if (confirm('Clear order?')) {
		// Ensure all error fields are hidden
		hideErrors();

		// Set focus to the first text field on the page
		document.getElementById("qty1").focus();

		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();

	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;
}

function formHasErrors(){
	let errorFlag = false;

	let required = ["name","phonenumber","email"];
	for(let i = 0; i < required.length; i++){
		let text = document.getElementById(required[i]);
		if(!formFieldHasInput(text)){
			document.getElementById(required[i] + "_error").style.display = "block";
			if(!errorFlag){
				text.focus();
				text.select();
			}
			errorFlag = true;
		}
	}

	let regexPhone = new RegExp(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/);//retricts to any valid phone number format
	let phoneNumber = document.getElementById("phonenumber").value;

	if(!regexPhone.test(phoneNumber) && document.getElementById("phonenumber_error").style.display != "block"){
		document.getElementById("phonenumber_format_error").style.display = "block";

		if(!errorFlag){
			document.getElementById("phonenumber").focus();
			document.getElementById("phonenumber").select();
		}
		errorFlag = true;
	}

	let regexEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);//restricts to valid email
	let email = document.getElementById("email").value;

	if(!regexEmail.test(email) && document.getElementById("email_error").style.display != "block"){
		document.getElementById("email_format_error").style.display = "block";

		if(!errorFlag){
			document.getElementById("email").focus();
			document.getElementById("email").select();
		}
		errorFlag = true;
	}





	return errorFlag;
}





function formFieldHasInput(fieldElement) {
	// Check if the text field has a value
	if (fieldElement.value == null || fieldElement.value.trim() == "") {
		// Invalid entry
		return false;
	}

	// Valid entry
	return true;
}







function load(){
    hideErrors();



	// Add event listener for the form submit
	document.getElementById("contact_form").addEventListener("submit", validate);
	// adds event listener for the form reset
	document.getElementById("contact_form").addEventListener("reset",resetForm);
}

document.addEventListener("DOMContentLoaded",load);