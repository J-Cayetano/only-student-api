<?php

defined('BASEPATH') or exit('No direct script access allowed');

class admin extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
        ($this->session->userdata('TOKEN')) ? null : redirect('/');
    }

    public function index()
    {
        $this->load->view('admin/layout/head-css');
        $this->load->view('admin/layout/header-admin');
        $this->load->view('admin/layout/sidebar-admin');
        $this->load->view('admin/dashboard-admin');
        $this->load->view('admin/layout/footer-admin');
        $this->load->view('admin/layout/foot-js');
    }



    //----------------------------------------------------
    // 
    //          System Setups - Controller
    // 
    // ---------------------------------------------------

    public function s_level()
    {
        $this->load->view('admin/layout/head-css');
        $this->load->view('admin/layout/header-admin');
        $this->load->view('admin/layout/sidebar-admin');
        $this->load->view('pages/s_level');
        $this->load->view('admin/layout/footer-admin');
        $this->load->view('admin/layout/foot-js');
    }

    public function s_category()
    {
        $this->load->view('admin/layout/head-css');
        $this->load->view('admin/layout/header-admin');
        $this->load->view('admin/layout/sidebar-admin');
        $this->load->view('pages/s_category');
        $this->load->view('admin/layout/footer-admin');
        $this->load->view('admin/layout/foot-js');
    }

    public function s_subject()
    {
        $this->load->view('admin/layout/head-css');
        $this->load->view('admin/layout/header-admin');
        $this->load->view('admin/layout/sidebar-admin');
        $this->load->view('pages/s_subject');
        $this->load->view('admin/layout/footer-admin');
        $this->load->view('admin/layout/foot-js');
    }

    public function s_type()
    {
        $this->load->view('admin/layout/head-css');
        $this->load->view('admin/layout/header-admin');
        $this->load->view('admin/layout/sidebar-admin');
        $this->load->view('pages/s_type');
        $this->load->view('admin/layout/footer-admin');
        $this->load->view('admin/layout/foot-js');
    }

    public function s_requirement()
    {
        $this->load->view('admin/layout/head-css');
        $this->load->view('admin/layout/header-admin');
        $this->load->view('admin/layout/sidebar-admin');
        $this->load->view('pages/s_requirement');
        $this->load->view('admin/layout/footer-admin');
        $this->load->view('admin/layout/foot-js');
    }

    public function calendar()
    {
        $this->load->view('admin/layout/head-css');
        $this->load->view('admin/layout/header-admin');
        $this->load->view('admin/layout/sidebar-admin');
        $this->load->view('pages/calendar-admin');
    }
}
