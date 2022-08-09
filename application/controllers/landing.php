<?php
defined('BASEPATH') or exit('No direct script access allowed');

class landing extends CI_Controller
{

	public function index()
	{

		if ($this->session->userdata('TOKEN') != null) {
			$user_access = $this->session->userdata('ACCESS');
			if ($user_access == 'admin') {
				redirect(base_url('admin/'));
			} else if ($user_access == 'student') {
				redirect(base_url('student/'));
			} else if ($user_access == 'tutor') {
				redirect(base_url('tutor/'));
			} else if ($user_access == 'evaluator') {
				redirect(base_url('evaluator/'));
			}
		} else {
			$this->session->sess_destroy();
			$this->load->view('layout/header-landing');
			$this->load->view('pages/landing');
			if (isset($_GET['error'])) {
				if ($_GET['error'] == "code1") {
				}
			}
			$this->load->view('layout/footer-landing');
		}
	}
}
