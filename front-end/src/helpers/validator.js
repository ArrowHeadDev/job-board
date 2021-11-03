import Swal from "sweetalert2";

//All validation functions to validate data using reg ex
export const validators = {
  validateEmail,
  validateName,
  validatePhone,
  validatePostalCode,
  validateForm,
  errorValidator,
  validateUpdate,
  //validateSIRET, to implement correctly
};

//TODO TEST ALL REGEX

function validateEmail(email) {
  var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

function validateName(name) {
  var regex = /^[A-Za-z][A-Za-z ']+([A-Za-z][A-Za-z']+)*/;
  return regex.test(name);
}

function validatePhone(phone) {
  var regex = /^((\+)33|0)[1-9](\d{2}){4}$/g;
  return regex.test(phone);
}

function validatePostalCode(pcode) {
  var regex = /^\d{5}$|^\d{5}-\d{4}$/;
  return regex.test(pcode);
}

/* TODO VALIDATE USING LUHN ALGO
function validateSIRET(siret) {
  var regex = / ^ d {14} $ /;
  return regex.test(siret);
}*/

function errorValidator(message, status) {
  if (status == 409) {
    let mArray = message.split(".");
    if (mArray.includes("email'")) {
      Swal.fire({
        title: "This email is already in use",
        text: "Please try again with another email address",
        icon: "error",
      });
    } else if (mArray.includes("phone'")) {
      Swal.fire({
        title: "This phone number is already in use",
        text: "Please try again with another phone number",
        icon: "error",
      });
    } else if (mArray.includes("website'")) {
      Swal.fire({
        title: "This website is already used",
        text: "Please try again with a different website",
        icon: "error",
      });
    } else if (mArray.includes("siret'")) {
      Swal.fire({
        title: "This SIRET is already used by another company",
        text: "Please try again with a different siret",
        icon: "error",
      });
    }
  }
}

//validateForm() validates form input for the people/company register forms
function validateForm(form) {
  this.errors = [];

  if (!validateEmail(form.email)) {
    this.errors.push("This email is not valid");
    Swal.fire({
      title: "Please input a correct email",
      icon: "error",
    });
  } else if (!validateName(form.firstName)) {
    this.errors.push("This first name is not a valid first name");
    Swal.fire({
      title: "Please input a correct first name",
      icon: "error",
    });
  } else if (!validateName(form.name)) {
    this.errors.push("This name is not a valid name");
    Swal.fire({
      title: "Please input a correct name.",
      icon: "error",
    });
  } else if (!validatePhone(form.phone)) {
    this.errors.push("This  is not a valid phone number");
    Swal.fire({
      title: "Please input a correct phone number.",
      icon: "error",
    });
  } else if (!validatePostalCode(form.postalCode)) {
    this.errors.push("This is not a valid postal code");
    Swal.fire({
      title: "Please input a correct postal code.",
      icon: "error",
    });
  }

  /* else if (form.siret && !validateSIRET(form.siret)) {
          this.errors.push("This siret is not valid.");
          swal.fire({
            title: "Please input a correct SIRET.",
            icon: "error",
          });
          
        }*/

  if (!this.errors.length) {
    return true;
  }
}

function validateUpdate(form) {
  this.errors = [];
  console.log(form);

  if (!Object.keys(form).length) {
    Swal.fire({
      title: "Please input at least one value before submitting",
      icon: "error",
    });

    return;
  }

  if (form.email && !validateEmail(form.email)) {
    this.errors.push("This email is not valid");
    Swal.fire({
      title: "Please input a correct email",
      icon: "error",
    });
  }

  if (form.firstName && !validateName(form.firstName)) {
    this.errors.push("This first name is not a valid first name");
    Swal.fire({
      title: "Please input a correct first name",
      icon: "error",
    });
  }else{
    console.log(form.firstName)
  }

  if (form.name && !validateName(form.name)) {
    this.errors.push("This name is not a valid name");
    Swal.fire({
      title: "Please input a correct name.",
      icon: "error",
    });
  }
  if (form.phone && !validatePhone(form.phone)) {
    this.errors.push("This  is not a valid phone number");
    Swal.fire({
      title: "Please input a correct phone number.",
      icon: "error",
    });
  }
  if (form.postalCode && !validatePostalCode(form.postalCode)) {
    this.errors.push("This is not a valid postal code");
    Swal.fire({
      title: "Please input a correct postal code.",
      icon: "error",
    });
  }

  if(form.contactName && !validateName(form.contactName)){
    this.errors.push("This name is not a valid name");
    Swal.fire({
      title: "Please input a correct contact name.",
      icon: "error",
    });
  }

  /* else if (form.siret && !validateSIRET(form.siret)) {
          this.errors.push("This siret is not valid.");
          swal.fire({
            title: "Please input a correct SIRET.",
            icon: "error",
          });
          
        }*/

  if (!this.errors.length) {
    return true;
  }
}
