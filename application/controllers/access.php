<?php
defined('BASEPATH') or exit('No direct script access allowed');

class access extends CI_Controller
{

    public function signin()
    {
        $this->session->sess_destroy();
        $this->load->view('layout/header-landing');
        $this->load->view('access/signin');
        $this->load->view('layout/footer-landing');
    }
}
