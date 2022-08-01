<?php
defined('BASEPATH') or exit('No direct script access allowed');

class landing extends CI_Controller
{

	public function index()
	{
		$this->load->view('layout/header-landing');
		$this->load->view('pages/landing');
		$this->load->view('layout/footer-landing');
	}
}
