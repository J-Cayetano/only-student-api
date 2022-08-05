<body data-sidebar="dark">

    <!-- HEADER START -->
    <header id="page-topbar">
        <div class="navbar-header">
            <div class="d-flex">
                <!-- LOGO -->
                <div class="navbar-brand-box">
                    <a class="logo logo-dark">
                        <span class="logo-sm">
                            <img src="<?php echo base_url('assets') ?>/logos/logo.svg" alt="" height="22">
                        </span>
                        <span class="logo-lg">
                            <img src="<?php echo base_url('assets') ?>/images/logo-dark.png" alt="" height="17">
                        </span>
                    </a>

                    <a class="logo logo-light">
                        <span class="logo-sm">
                            <img src="<?php echo base_url('assets') ?>/media/logos/os.png" alt="" height="25">
                        </span>
                        <span class="logo-lg">
                            <img src="<?php echo base_url('assets') ?>/media/logos/os-logo.png" alt="" height="30">
                        </span>
                    </a>
                </div>

                <button type="button" class="btn btn-sm px-3 font-size-16 header-item waves-effect" id="vertical-menu-btn">
                    <i class="fa fa-fw fa-bars"></i>
                </button>

                <!-- App Search-->

            </div>

            <div class="d-flex">

                <div class="dropdown d-none d-lg-inline-block ms-1">
                    <button type="button" class="btn header-item noti-icon waves-effect" data-toggle="fullscreen">
                        <i class="bx bx-fullscreen"></i>
                    </button>
                </div>


                <div class="dropdown d-inline-block">
                    <button type="button" class="btn header-item waves-effect" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img class="rounded-circle header-profile-user" src="<?= $this->session->userdata('USER_DP'); ?>" alt="Header Avatar">
                        <span class="d-none d-xl-inline-block ms-1"><?php echo $this->session->userdata('FIRST_NAME'); ?></span>
                        <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-end">
                        <!-- item-->
                        <a class="dropdown-item" href="#"><i class="bx bx-user font-size-16 align-middle me-1"></i> <span key="t-profile">Profile</span></a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item text-danger" href="<?php echo base_url('access/signin') ?>"><i class="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i> <span key="t-logout">Logout</span></a>
                    </div>
                </div>

            </div>
        </div>
    </header>