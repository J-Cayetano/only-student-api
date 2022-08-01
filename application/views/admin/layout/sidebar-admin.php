<!-- ========== Left Sidebar Start ========== -->
<div class="vertical-menu">

    <div data-simplebar class="h-100">

        <!--- Sidemenu -->
        <div id="sidebar-menu">
            <!-- Left Menu Start -->
            <ul class="metismenu list-unstyled">
                <li class="menu-title" key="t-menu">Menu</li>

                <li>
                    <a href="<?php echo base_url('admin') ?>" class="waves-effect">
                        <i class="bx bx-home-circle"></i><span class="badge rounded-pill bg-info float-end"></span>
                        <span key="t-dashboards">Dashboard</span>
                    </a>
                </li>

                <li>
                    <a>
                        <i class="bx bx-list-check"></i><span class="badge rounded-pill bg-info float-end"></span>
                        <span key="t-dashboards">Monitor</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="true">
                        <li><a href="#" key="">Calendar</a></li>
                    </ul>
                </li>

                <li>
                    <a>
                        <i class="bx bxs-wrench"></i>
                        <span key="t-layouts">System Setup</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="true">
                        <li><a href="<?php echo base_url('admin/s_level') ?>" key="">Education Level</a></li>
                        <li><a href="<?php echo base_url('admin/s_category') ?>" key="">Subject Category</a></li>
                        <li><a href="<?php echo base_url('admin/s_subject') ?>" key="">Subject</a></li>
                        <li><a href="<?php echo base_url('admin/s_type') ?>" key="">Professional Type</a></li>
                    </ul>
                </li>

                <li>
                    <a>
                        <i class="bx bx-user-circle"></i>
                        <span key="t-layouts">Account Management</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="true">
                        <li><a href="#" key="">Admin & Staff</a></li>
                        <li><a href="#" key="">Evaluator</a></li>
                        <li><a href="#" key="">Tutor</a></li>
                        <li><a href="#" key="">Student</a></li>
                    </ul>
                </li>



            </ul>
        </div>
        <!-- Sidebar -->
    </div>
</div>
<!-- Left Sidebar End -->