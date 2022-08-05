<?php

defined('BASEPATH') or exit('No direct script access allowed');

class evaluator extends CI_Controller
{
    // function __construct()
    // {
    //     parent::__construct();
    //     ($this->session->userdata('TOKEN')) ? null : redirect('/');
    // }

    public function index()
    {
        $this->load->view('layout/head-css');
        $this->load->view('admin/layout/header-admin');
        $this->load->view('admin/layout/sidebar-admin');
        $this->load->view('admin/dashboard-admin');
        $this->load->view('admin/layout/footer-admin');
        $this->load->view('layout/foot-js');
    }


}
?>