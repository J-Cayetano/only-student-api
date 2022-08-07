<?php
defined('BASEPATH') or exit('No direct script access allowed');

class tutor extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
        ($this->session->userdata('TOKEN')) ? null : redirect('/');
    }

    public function index()
    {
        print("Tutor");
    }
}
