<?php
defined('BASEPATH') or exit('No direct script access allowed');

class access extends CI_Controller
{
    public function signup()
    {
        $this->session->sess_destroy();
        $this->load->view('layout/header-landing');
        $this->load->view('access/signup');
        $this->load->view('layout/footer-landing');
    }

    public function signout()
    {
        echo '<script>localStorage.clear();</script>';
        $this->session->sess_destroy();
        redirect(base_url('/'));
    }

    public function auth()
    {

        $user_access = $_GET['user_access'];

        if ($_GET['token'] != null) {

            $this->session->set_userdata(
                array(
                    'TOKEN' => $_GET['token'],
                    'ACCESS' => $_GET['user_access'],
                    'FIRST_NAME' => $_GET['user_firstName'],
                    'MIDDLE_NAME' => $_GET['user_middleName'],
                    'LAST_NAME' => $_GET['user_lastName'],
                    'FULL_NAME' => $_GET['user_fullName'],
                    'EMAIL' => $_GET['user_email'],
                    'BIO' => $_GET['user_bio'],
                    'TYPE_ID' => $_GET['user_type_id'],
                    'LEVEL_ID' => $_GET['user_leve_id'],
                    'IS_GRADUATED' => $_GET['user_isGraduated'],
                    'USER_DP' => $_GET['user_picture']
                )
            );
        }

        // Redirection

        if ($user_access == 'admin') {
            redirect(base_url('admin/'));
        } else if ($user_access == 'student') {
            redirect(base_url('student/'));
        } else if ($user_access == 'tutor') {
            redirect(base_url('tutor/'));
        } else if ($user_access == 'evaluator') {
            redirect(base_url('evaluator/'));
        }
    }
}
