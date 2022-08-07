<?php
defined('BASEPATH') or exit('No direct script access allowed');

class student extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
        ($this->session->userdata('TOKEN')) ? null : redirect('/');
    }

    public function index()
    {
        $this->load->view('student/layouts/header-student');
        $this->load->view('student/landing-student');
        $this->load->view('student/layouts/footer-student');
    }
}
