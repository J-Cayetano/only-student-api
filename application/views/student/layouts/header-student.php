<!DOCTYPE html>
<html>

<head>
    <title><?php echo SYSTEM_NAME ?></title>
    <link rel="shortcut icon" href="<?php echo base_url('assets') ?>/media/logos/os.ico" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" />
    <link href="<?php echo base_url('assets') ?>/plugins/global/plugins.bundle.css" rel="stylesheet" type="text/css" />
    <link href="<?php echo base_url('assets') ?>/css/style.bundle.css" rel="stylesheet" type="text/css" />
    <link href="<?php echo base_url('assets') ?>/css/icons.min.css" rel="stylesheet" type="text/css">
    <link href="<?php echo base_url('assets') ?>/plugins/global/plugins.bundle.css" rel="stylesheet" type="text/css" />
    <link href="<?php echo base_url('assets') ?>/css/style.bundle.css" rel="stylesheet" type="text/css" />
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
</head>

<body id="home" data-bs-spy="scroll" data-bs-target="#kt_landing_menu" data-bs-offset="200" class="bg-white position-relative">
    <div class="d-flex flex-column flex-root">
        <!--begin::Header Section-->
        <div class="mb-0" id="home">
            <!--begin::Wrapper-->
            <div class="bgi-no-repeat bgi-size-contain bgi-position-x-center bgi-position-y-bottom landing-dark-bg" style="background-image: url('<?php echo base_url('assets') ?>/media/svg/illustrations/landing.svg')">
                <!--begin::Header-->
                <div class="landing-header" data-kt-sticky="true" data-kt-sticky-name="landing-header" data-kt-sticky-offset="{default: '200px', lg: '300px'}">
                    <!--begin::Container-->
                    <div class="container">
                        <!--begin::Wrapper-->
                        <div class="d-flex align-items-center justify-content-between">
                            <!--begin::Logo-->
                            <div class="d-flex align-items-center flex-equal">
                                <!--end::Mobile menu toggle-->
                                <!--begin::Logo image-->
                                <a href="http://localhost/only-student#home">
                                    <img alt="Logo" src="<?php echo base_url('assets') ?>/media/logos/os-logo.png" class="logo-default h-35px h-lg-40px" />
                                    <img alt="Logo" src="<?php echo base_url('assets') ?>/media/logos/os-logo-dark.png" class="logo-sticky h-20px h-lg-45px">
                                </a>
                                <!--end::Logo image-->
                            </div>
                            <!--end::Logo-->
                            <!--begin::Menu wrapper-->
                            <div class="d-lg-block" id="kt_header_nav_wrapper">
                                <div class="d-lg-block p-5 p-lg-0" data-kt-drawer="true" data-kt-drawer-name="landing-menu" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="200px" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_landing_menu_toggle" data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#home', lg: '#kt_header_nav_wrapper'}">
                                    <!--begin::Menu-->
                                    <div class="menu menu-column flex-nowrap menu-rounded menu-lg-row menu-title-gray-500 menu-state-title-primary nav nav-flush fs-5 fw-bold" id="kt_landing_menu">
                                        <!--begin::Menu item-->
                                        <div class="menu-item">
                                            <!--begin::Menu link-->
                                            <a class="menu-link nav-link active py-3 px-4 px-xxl-6" href="#home" data-kt-scroll-toggle="true" data-kt-drawer-dismiss="true">Home</a>
                                            <!--end::Menu link-->
                                        </div>
                                        <!--end::Menu item-->
                                        <!--begin::Menu item-->
                                        <div class="menu-item">
                                            <!--begin::Menu link-->
                                            <a class="menu-link nav-link py-3 px-4 px-xxl-6" href="#how-it-works" data-kt-scroll-toggle="true" data-kt-drawer-dismiss="true">How it Works</a>
                                            <!--end::Menu link-->
                                        </div>
                                        <!--end::Menu item-->

                                        <!--begin::Menu item-->
                                        <div class="menu-item">
                                            <!--begin::Menu link-->
                                            <a class="menu-link nav-link py-3 px-4 px-xxl-6" href="#team" data-kt-scroll-toggle="true" data-kt-drawer-dismiss="true">Class</a>
                                            <!--end::Menu link-->
                                        </div>
                                        <!--end::Menu item-->
                                    </div>
                                    <!--end::Menu-->
                                </div>
                            </div>
                            <!--end::Menu wrapper-->
                            <!--begin::Toolbar-->
                            <div class="flex-equal text-end ms-1">

                                <!--begin::USER MENU-->
                                <div class="align-items-center ms-1 ms-lg-3" id="kt_header_user_menu_toggle">
                                    <!--begin::Menu wrapper-->
                                    <div class="cursor-pointer symbol symbol-30px symbol-md-40px pb-3" data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
                                        <img src="<?= $this->session->userdata('USER_DP'); ?>" alt="user" />
                                    </div>
                                    <!--begin::User account menu-->
                                    <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-350px" data-kt-menu="true">
                                        <!--begin::Menu item-->
                                        <div class="menu-item px-3">
                                            <div class="menu-content d-flex align-items-center px-3">
                                                <!--begin::Avatar-->
                                                <div class="symbol symbol-50px me-5">
                                                    <img alt="Logo" src="<?= $this->session->userdata('USER_DP'); ?>" />
                                                </div>
                                                <!--end::Avatar-->
                                                <!--begin::Username-->
                                                <div class="d-flex flex-column">
                                                    <div class="fw-bolder d-flex align-items-center fs-5"><?= $this->session->userdata('FULL_NAME'); ?>
                                                    </div>
                                                    <a class="fw-bold text-muted d-flex align-items-center text-hover-primary fs-7"><?= $this->session->userdata('EMAIL'); ?></a>
                                                </div>
                                                <!--end::Username-->
                                            </div>
                                        </div>
                                        <!--end::Menu item-->
                                        <!--begin::Menu separator-->
                                        <div class="separator my-2"></div>
                                        <!--end::Menu separator-->
                                        <!--begin::Menu item-->
                                        <div class="menu-item px-5">
                                            <a href="../../demo1/dist/account/overview.html" class="menu-link px-5">My Profile</a>
                                        </div>
                                        <!--end::Menu item-->

                                        <div class="menu-item px-5">
                                            <a href="../../demo1/dist/account/statements.html" class="menu-link px-5">My Classes</a>
                                        </div>
                                        <!--end::Menu item-->
                                        <!--begin::Menu separator-->
                                        <div class="separator my-2"></div>
                                        <!--end::Menu separator-->


                                        <!--begin::Menu item-->
                                        <div class="menu-item px-5">
                                            <button type="button" id="signoutBtn" class=" px-5 btn btn-danger">Sign Out</button>
                                        </div>
                                        <!--end::Menu item-->
                                        <!--begin::Menu separator-->
                                        <div class="separator my-2"></div>
                                        <!--end::Menu separator-->

                                    </div>
                                    <!--end::User account menu-->
                                    <!--end::Menu wrapper-->
                                </div>
                                <!--end::User menu-->

                            </div>
                            <!--end::Toolbar-->
                        </div>
                        <!--end::Wrapper-->
                    </div>
                    <!--end::Container-->
                </div>
                <!--end::Header-->


                <!--begin::Landing -->
                <div class="d-flex flex-column flex-center w-100 min-h-350px min-h-lg-500px px-9">


                    <h1 style="color: white;">INSERT SEARCH BAR HERE</h1>
                </div>
                <!--end::Landing -->



            </div>
            <!--end::Wrapper-->
            <!--begin::Curve bottom-->
            <div class="landing-curve landing-dark-color mb-10 mb-lg-20">
                <svg viewBox="15 12 1470 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 11C3.93573 11.3356 7.85984 11.6689 11.7725 12H1488.16C1492.1 11.6689 1496.04 11.3356 1500 11V12H1488.16C913.668 60.3476 586.282 60.6117 11.7725 12H0V11Z" fill="currentColor"></path>
                </svg>
            </div>
            <!--end::Curve bottom-->

        </div>
        <!--end::Header Section-->