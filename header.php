<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package GS_Theme
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <script src="https://kit.fontawesome.com/31a13a0020.js" crossorigin="anonymous"></script>
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">


    <header class="c-navbar">
        <div class="container">
            <div class="row">
                <!--
                // BRAND NAV
                -->
                <div class="col-3">
                    <a href="<?php bloginfo( 'url' ); ?>">
                        <h1>
                            <img src="#!" alt="<?php bloginfo( 'name' ); ?>">
                        </h1>
                    </a>
                </div>

                <!--
				// MAIN NAV
				-->
                <div class="col-9">
                    <nav class="c-navbar__nav">

						<?php
						wp_nav_menu( array(
								'theme_location' => 'menu-1',
								'menu_id'        => 'primary-menu',
							)
						);
						?>

                    </nav>
                </div>

            </div>
        </div>


    </header><!-- .c-navbar -->
