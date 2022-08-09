<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">

            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 class="mb-sm-0 font-size-18">Admin Requirement</h4>

                        <div class="page-title-right">
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">Admin & Staff </a></li>
                                <li class="breadcrumb-item active">Setup</li>
                                <li class="breadcrumb-item active">Admin</li>
                            </ol>
                        </div>

                    </div>
                </div>
            </div>
            <!-- end page title -->
            <!-- START OF DATATABLE -->

            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">


                            <div class="row">
                                <div class="col">
                                    <h4 class="card-title">Datatable</h4>
                                    <p class="card-title-desc" style="display:inline-block;">Description - Enter</p>
                                </div>

                                <div class="col">
                                    <button type="button" style="margin-left:auto; margin-right:30px; display:block;" class="btn btn-primary waves-effect btn-label waves-light"><i class="bx bx-plus label-icon"></i> Add New</button>
                                </div>
                            </div>


                            <div class="table-responsive">

                                <table id="datatable" class="table table-editable table-nowrap align-middle table-edits table-bordered" style="text-align: center;">
                                    <thead>
                                        <tr>
                                            <th style="width: 100px;">ID</th>
                                            <th style="width: 300px;">Requirement Name</th>
                                            <th style="width: 300px;">Requirement Professional Description</th>
                                            <th style="width: 200px;">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr data-id="1">
                                            <td data-field="leve_name">1</td>
                                            <td data-field="leve_name">David McHenry</td>
                                            <td data-field="leve_description">David McHenry</td>
                                            <td>
                                                <a class="btn btn-outline-success btn-sm edit" title="Edit">
                                                    <i class="fas fa-pencil-alt"></i>
                                                </a>
                                                <div style="display: inline-block; margin-left: 10px;"></div>
                                                <button class="btn btn-outline-danger btn-sm delete" title="Delete">
                                                    <i class="fas fa-trash-alt"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>

                        </div>
                    </div>
                </div> <!-- end col -->
            </div>


            <!-- END DATATABLE -->
        </div> <!-- container-fluid -->


    </div>
    <!-- End Page-content -->