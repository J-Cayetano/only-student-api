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
                        <h4 class="mb-sm-0 font-size-18">Subject Category</h4>

                        <div class="page-title-right">
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">Subject Category</a></li>
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
                                    <button type="button" style="margin-left:auto; margin-right:30px; display:block;" class="btn btn-primary waves-effect btn-label waves-light" data-bs-toggle="modal" data-bs-target="#create_level"><i class="bx bx-plus label-icon"></i> Add New</button>
                                </div>
                            </div>

                            <div class="table-responsive">



                                <table id="datatable" name="categoryTable" class="table table-bordered align-middle display" style="text-align: center;">
                                    <thead>
                                        <tr>
                                            <th style="text-align: center;">Name</th>
                                            <th style="text-align: center;">Description</th>
                                            <th style="width: 200px; text-align: center;">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>


                                        <tr data-id="1">
                                            <td data-field="cate_name">1</td>
                                            <td data-field="cate_description">David McHenry</td>
                                            <td>
                                                <a class="btn btn-outline-success btn-sm edit" data-bs-toggle="modal" data-bs-target="#edit_level" title="Edit">
                                                    <i class="fas fa-pencil-alt"></i>
                                                </a>
                                                <div style="display: inline-block; margin-left: 10px;"></div>
                                                <button class="btn btn-outline-danger btn-sm delete" data-bs-toggle="modal" data-bs-target="#delete_level" title="Delete">
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

            <!-- MODALS -->

            <div class="modal fade" id="create_level" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <form id="s_level" name="s_level">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Create Subject Category</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="row mb-4">
                                    <label for="horizontal-firstname-input" class="col-sm-3 col-form-label">Category Name</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control" id="horizontal-firstname-input">
                                    </div>
                                </div>
                                <div class="row mb-4">
                                    <label for="horizontal-email-input" class="col-sm-3 col-form-label">Description</label>
                                    <div class="col-sm-9">
                                        <textarea class="form-control" id="productdesc" rows="6"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                                <button type="submit" id="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="edit_level" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <form id="s_level" name="s_level">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Edit Subject Category</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="row mb-4">
                                    <label for="horizontal-firstname-input" class="col-sm-3 col-form-label">Category Name</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control" id="horizontal-firstname-input">
                                    </div>
                                </div>
                                <div class="row mb-4">
                                    <label for="horizontal-email-input" class="col-sm-3 col-form-label">Description</label>
                                    <div class="col-sm-9">
                                        <textarea class="form-control" id="productdesc" rows="6"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                                <button type="submit" id="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="delete_level" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Delete Subject Category</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body align-content-center align-content-md-center text-sm-center">
                            <p>Are you sure you want to delete the selected data? <i class="far fa-trash-alt"></i></p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                            <button type="button" id="delete" name="delete" class="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
            </div>


            <!-- END MODALS -->
        </div> <!-- container-fluid -->



    </div>
    <!-- End Page-content -->