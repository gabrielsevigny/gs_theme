<?php
function get_coreUrl( $repertoire, $nomDuFichier ) {

	$output = require get_template_directory() . '/core/' . $repertoire . '/' . $nomDuFichier . '.php';

	return $output;

}