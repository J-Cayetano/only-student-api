</body>
<script>
    var hostUrl = "<?php echo base_url('assets') ?>/";
</script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<!--begin::Global Javascript Bundle(used by all pages)-->
<script src="<?php echo base_url('assets') ?>/plugins/global/plugins.bundle.js"></script>
<script src="<?php echo base_url('assets') ?>/js/scripts.bundle.js"></script>
<!--end::Global Javascript Bundle-->

<!--begin::Page Vendors Javascript(used by this page)-->
<script src="<?php echo base_url('assets') ?>/plugins/custom/datatables/datatables.bundle.js"></script>
<!--end::Page Vendors Javascript-->

<script src="<?php echo base_url('assets') ?>/js/common.js"></script>
<script src="<?php echo base_url('assets') ?>/libs/jquery/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="<?php echo base_url('assets') ?>/js/custom/utilities/search/horizontal.js"></script>

<script>
    $(document).ready(function() {
        // console.log("Bearer " + localStorage.getItem('TOKEN'))
        // $.ajax({
        //     url: 'http://localhost:3600/only-student/student/category',
        //     type: 'GET',
        //     contentType: 'json',
        //     headers: {
        //         'Authorization': "Bearer " + localStorage.getItem('TOKEN')
        //     },
        //     success: (res) => {
        //         console.log(res.data.length);
        //     },
        //     error: (res) => {
        //         console.log(res);
        //     }
        // })
    })


    $("#signoutBtn").click(function() {
        $.ajax({
            url: 'http://localhost:3600/logout',
            success: (res) => {
                localStorage.clear();
                Swal.fire({
                    text: res.message,
                    icon: "success",
                    buttonsStyling: !1,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }

                }).then((function(e) {
                    if (e.isConfirmed) {
                        window.location.replace("../access/signout")
                    }
                }))
            }
        })
    })
</script>


</html>