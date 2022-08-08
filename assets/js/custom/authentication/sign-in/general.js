"use strict";

var KTSigninGeneral = function () {
    var t, e, i;
    return {
        init: function () {
            t = document.querySelector("#kt_sign_in_form"),
                e = document.querySelector("#kt_sign_in_submit"),
                i = FormValidation.formValidation(t, {
                    fields: {
                        user_email: {
                            validators: {
                                notEmpty: {
                                    message: "Email address is required"
                                },
                                emailAddress: {
                                    message: "The value is not a valid email address"
                                }
                            }
                        },
                        user_password: {
                            validators: {
                                notEmpty: { message: "The password is required" }
                            }
                        }
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger,
                        bootstrap: new FormValidation.plugins.Bootstrap5({ rowSelector: ".fv-row" })
                    }
                }),
                e.addEventListener("click", (function async(n) {
                    n.preventDefault(),
                        i.validate().then((function (i) {

                            var email = $("#user_email").val();
                            var password = $("#user_password").val();

                            $.ajax({
                                url: 'http://localhost:3600/only-student/login',
                                type: 'POST',
                                data: {
                                    user_email: email,
                                    user_password: password
                                },
                                dataType: "json",
                                success: (res) => {

                                    if (res.data.user_isActive !== 0) {
                                        "Valid" == i ? (
                                            e.setAttribute("data-kt-indicator", "on"),
                                            e.disabled = !0,
                                            setTimeout((function () {
                                                e.removeAttribute("data-kt-indicator"),
                                                    e.disabled = !1,

                                                    Swal.fire({
                                                        text: res.message,
                                                        icon: "success",
                                                        buttonsStyling: !1,
                                                        confirmButtonText: "Ok, got it!",
                                                        customClass: { confirmButton: "btn btn-primary" }

                                                    }).then((function (e) {
                                                        if (e.isConfirmed) {

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


                                                        }
                                                    }))
                                            }), 2e3)) : Swal.fire({ text: "Sorry, looks like there are some errors detected, please try again.", icon: "error", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn btn-primary" } })
                                    } else {
                                        Swal.fire({
                                            text: String(res.responseJSON.message),
                                            icon: "error",
                                            buttonsStyling: !1,
                                            confirmButtonText: "Ok, got it!",
                                            customClass: { confirmButton: "btn btn-primary" }
                                        })
                                    }

                                },
                                error: (res) => {
                                    Swal.fire({
                                        text: String(res.responseJSON.message),
                                        icon: "error",
                                        buttonsStyling: !1,
                                        confirmButtonText: "Ok, got it!",
                                        customClass: { confirmButton: "btn btn-primary" }
                                    })
                                },
                            })


                        }))
                }))
        }
    }
}();

KTUtil.onDOMContentLoaded((function () { KTSigninGeneral.init() }));