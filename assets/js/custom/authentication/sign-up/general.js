"use strict";

var KTSignupGeneral = function () {
    var e, t, a, s,
        r = function () { return 100 === s.getScore() };

    return {
        init: function () {
            e = document.querySelector("#kt_sign_up_form"),
                t = document.querySelector("#kt_sign_up_submit"),
                s = KTPasswordMeter.getInstance(e.querySelector('[data-kt-password-meter="true"]')),

                a = FormValidation.formValidation(e, {
                    fields: {
                        "first-name": {
                            validators: {
                                notEmpty: { message: "First Name is required" }
                            }
                        },
                        "last-name": {
                            validators: {
                                notEmpty: { message: "Last Name is required" }
                            }
                        },
                        email: {
                            validators: {
                                notEmpty: { message: "Email address is required" },
                                emailAddress: { message: "The value is not a valid email address" }
                            }
                        },
                        password: {
                            validators: {
                                notEmpty: { message: "The password is required" },
                                callback: {
                                    message: "Please enter valid password",
                                    callback: function (e) { if (e.value.length > 0) return r() }
                                }
                            }
                        },
                        "confirm-password": {
                            validators: {
                                notEmpty: {
                                    message: "The password confirmation is required"
                                },
                                identical: {
                                    compare: function () {
                                        return e.querySelector('[name="password"]').value
                                    },
                                    message: "The password and its confirm are not the same"
                                }
                            }
                        },
                        toc: {
                            validators: {
                                notEmpty: { message: "You must accept the terms and conditions" }
                            }
                        }
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger({
                            event: {
                                password: !1
                            }
                        }),
                        bootstrap: new FormValidation.plugins.Bootstrap5({ rowSelector: ".fv-row", eleInvalidClass: "", eleValidClass: "" })
                    }
                }),
                t.addEventListener("click", (function (r) {
                    r.preventDefault(), a.revalidateField("password"),
                        a.validate().then((function (a) {
                            "Valid" == a ? (t.setAttribute("data-kt-indicator", "on"),
                                t.disabled = !0, setTimeout((function () {

                                    var fName = $("input[name='first-name']").val()
                                    var lName = $("input[name='last-name']").val()
                                    var email = $("input[name='email']").val()
                                    var password = $("input[name='password']").val()
                                    var access = "student"

                                    $.ajax({
                                        url: 'http://localhost:3600/only-student/signup',
                                        type: 'POST',
                                        data: {
                                            user_access: access,
                                            user_email: email,
                                            user_password: password,
                                            user_firstName: fName,
                                            user_lastName: lName
                                        },
                                        dataType: "json",
                                        success: (res) => {
                                            t.removeAttribute("data-kt-indicator"),
                                                t.disabled = !1,
                                                Swal.fire({
                                                    text: res.message,
                                                    icon: "success", buttonsStyling: !1,
                                                    confirmButtonText: "Ok, got it!",
                                                    customClass: { confirmButton: "btn btn-primary" }
                                                }).then((function (t) {
                                                    t.isConfirmed && (e.reset(), s.reset())

                                                    localStorage.setItem("USER_ID", res.data.user_id);
                                                    localStorage.setItem("TOKEN", res.token);
                                                    let session_data = "";
                                                    session_data += 'token=' + res.token;
                                                    session_data += '&user_access=' + res.data.user_access;
                                                    session_data += '&user_firstName=' + res.data.user_firstName;
                                                    session_data += '&user_middleName=' + res.data.user_middleName;
                                                    session_data += '&user_lastName=' + res.data.user_lastName;
                                                    session_data += '&user_fullName=' + res.data.user_fullName;
                                                    session_data += '&user_email=' + res.data.user_email;
                                                    session_data += '&user_bio=' + res.data.user_bio;
                                                    if (res.data.user_profilePhoto != null) {
                                                        session_data += '&user_picture=' + res.data.user_profilePhoto;
                                                    } else {
                                                        session_data += '&user_picture=' + "../assets/media/avatars/blank.png";
                                                    }



                                                    switch (res.data.user_access) {
                                                        case "admin":
                                                            break;
                                                        case "evaluator":
                                                            session_data += '&user_type_id=' + res.data.user_type_id;
                                                            break;
                                                        case "tutor":
                                                            session_data += '&user_type_id=' + res.data.user_type_id;
                                                            session_data += '&user_isGraduated=' + res.data.user_isGraduated;
                                                            break;
                                                        case "student":
                                                            session_data += '&user_leve_id=' + res.data.user_leve_id;
                                                            break;
                                                    }

                                                    window.location.replace("./access/auth?" + session_data);
                                                }))
                                        },
                                        error: (res) => {
                                            t.removeAttribute("data-kt-indicator"),
                                                t.disabled = !1,
                                                Swal.fire({
                                                    text: String(res.responseJSON.message),
                                                    icon: "error",
                                                    buttonsStyling: !1,
                                                    confirmButtonText: "Ok, got it!",
                                                    customClass: { confirmButton: "btn btn-primary" }
                                                }).then((function (t) {
                                                    t.isConfirmed && (e.reset(), s.reset());
                                                }))
                                        }
                                    })

                                }), 1500)) : Swal.fire({
                                    text: "Sorry, looks like there are some errors detected, please try again.",
                                    icon: "error",
                                    buttonsStyling: !1,
                                    confirmButtonText: "Ok, got it!",
                                    customClass: { confirmButton: "btn btn-primary" }
                                })
                        }))
                })), e.querySelector('input[name="password"]').addEventListener("input", (function () { this.value.length > 0 && a.updateFieldStatus("password", "NotValidated") }))
        }
    }
}(); KTUtil.onDOMContentLoaded((function () { KTSignupGeneral.init() }));