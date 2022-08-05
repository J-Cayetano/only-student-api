<body id="kt_body" class="bg-body">
    <div class="d-flex flex-column flex-root" style="background: linear-gradient(to right, #2F80ED 0%, #B2FFDA 100%);">
        <!--begin::Authentication - Sign-in -->
        <div class="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed">
            <!--begin::Content-->
            <div class="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
                <!--begin::Logo-->
                <a href="<?php echo base_url('landing/index') ?>" class="mb-17">
                    <img alt="Logo" src="<?php echo base_url('assets') ?>/media/logos/os-logo.png" class="h-55px" />
                </a>
                <!--end::Logo-->
                <!--begin::Wrapper-->
                <div class="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">


                    <!--begin::Form-->
                    <form class="form w-100" novalidate="novalidate" method="POST" id="kt_sign_in_form">

                        <div class=" text-center mb-10">
                            <h1 class="text-dark mb-3">Sign In to Only Student</h1>
                            <div class="text-gray-400 fw-bold fs-4">New Here?
                                <a href="<?php echo (base_url('access/signup')) ?>" class="link-primary fw-bolder">Create an Account</a>
                            </div>
                        </div>

                        <div class="fv-row mb-10">
                            <label class="form-label fs-6 fw-bolder text-dark">Email</label>
                            <input class="form-control form-control-lg form-control-solid" type="text" id="user_email" name="user_email" autocomplete="off" />
                        </div>

                        <div class="fv-row mb-10">
                            <div class="d-flex flex-stack mb-2">
                                <label class="form-label fw-bolder text-dark fs-6 mb-0">Password</label>
                            </div>
                            <input class="form-control form-control-lg form-control-solid" type="password" id="user_password" name="user_password" autocomplete="off" />
                        </div>

                        <div class="text-center">
                            <button type="submit" id="kt_sign_in_submit" name="kt_sign_in_submit" class="btn btn-lg btn-primary w-100 mb-5">
                                <span class="indicator-label">Continue</span>
                                <span class="indicator-progress">Please wait...
                                    <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                            </button>
                            <div class="text-center text-muted text-uppercase fw-bolder mb-5">or</div>
                            <a href="http://localhost:3600/auth" class="btn btn-flex flex-center btn-light btn-lg w-100 mb-5">
                                <img alt="Logo" src="<?php echo base_url('assets') ?>/media/svg/brand-logos/google-icon.svg" class="h-20px me-3" />Continue with Google</a>
                        </div>


                    </form>
                    <!--end::Form-->



                </div>
                <!--end::Wrapper-->
            </div>
            <!--end::Content-->
        </div>
        <!--end::Authentication - Sign-in-->
    </div>