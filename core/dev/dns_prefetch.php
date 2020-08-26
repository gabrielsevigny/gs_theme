<?php
function dns_prefetch() {
	echo '<meta http-equiv="x-dns-prefetch-control" content="on">
<link rel="dns-prefetch" href="http://localhost:10003/" />';
}

add_action( 'wp_head', 'dns_prefetch', 0 );
add_action( 'admin_head', 'dns_prefetch', 0 );