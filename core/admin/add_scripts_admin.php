<?php
add_action( 'admin_head', 'customAdminCss' );

function customAdminCss() {

	wp_enqueue_style( 'backend-style', get_template_directory_uri() . '/assets/css/admin.css', array(), _S_VERSION );

}