<script src="<?php echo base_url('assets') ?>/libs/jquery/jquery.min.js"></script>
<script src="<?php echo base_url('assets') ?>/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="<?php echo base_url('assets') ?>/libs/metismenu/metisMenu.min.js"></script>
<script src="<?php echo base_url('assets') ?>/libs/simplebar/simplebar.min.js"></script>
<script src="<?php echo base_url('assets') ?>/libs/node-waves/waves.min.js"></script>

<script src="<?php echo base_url('assets') ?>/js/app.js"></script>

<!-- Required datatable js -->
<script src="<?php echo base_url('assets') ?>/libs/datatables.net/js/jquery.dataTables.min.js"></script>
<script src="<?php echo base_url('assets') ?>/libs/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
<!-- Datatable init js -->
<script src="<?php echo base_url('assets') ?>/js/pages/datatables.init.js"></script>

<script>
    $(document).ready(function() {
        $("table[name='categoryTable']").DataTable({
            serverSide: true,
            ajax: {
                url: 'http://localhost:3600/student/category/table',
                type: 'GET',
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem('TOKEN')
                },
            },
            columns: [{
                    data: 'cate_name'
                },
                {
                    data: 'cate_desription'
                }
            ]

        })
    })
</script>


</html>