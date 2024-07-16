<?php include 'inc/global-vars/global-vars.php'; ?>
<!DOCTYPE html>
<html lang="en">

<head>
 <meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
 <meta name="viewport" content="width=device-width, initial-scale = 1.0, user-scalable=yes" />

 <?php if (is_search()) { ?>
 <meta name="robots" content="noindex, nofollow" />
 <?php } ?>
 <title><?php wp_title(''); ?></title>

 <link rel="shortcut icon" href="<?php bloginfo('template_directory'); ?>/images/favicon.ico" type="image/x-icon" />

 <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />

 <?php if ( is_singular() ) wp_enqueue_script( 'comment-reply' ); ?>

 <?php wp_head(); ?>

</head>

<body <?php body_class(); ?>>

 <!-- Displays on mobile & tablet devices only -->
 <div id="mobile-site-header"></div>
 <div id="mobile-site-header-mid-line"></div>
 <div id="mobile-site-header-inner-line"></div>

 <div class="container-narrow">
  <div id="site-header">
   <div id="site-header-mid-line">
    <div id="site-header-inner-line" role="banner">

     <div id="logo-wrapper">
      <a id="logo" href="<?php bloginfo('url'); ?>"><?php bloginfo( 'name' ); ?> home</a>
     </div>

     <div id="social-networks-wrapper">
      <div id="social-networks-inner">
         <?php include 'template-parts/social-networks/social-networks.php'; ?>
      </div>
     </div>

    </div><!-- #site-header-inner-line -->
   </div><!-- #site-header-mid-line -->
  </div><!-- #site-header -->
 </div><!-- .container-narrow -->

 <div id="nav-bar">
  <div class="container-narrow">

   <?php // Main navigation START ?>
   <div role="navigation">
    <?php wp_nav_menu( array( 
	'sort_column' => 'menu_order', 
	'container_class' => 'menu-header', 
	'menu_class' => 'nav', 
	'container' => false,
	'walker' => new MyExtendedMenuWalker(),
    'ex_separator' => '<li aria-hidden="true">/</li>'));
?>
   </div>
   <?php // Main navigation END ?>

  </div><!-- .container-narrow -->
 </div><!-- #nav-bar -->

 <?php
// If on Blob page, single post, category page, search page, archive page
// create a variable that will be assigned to a ".blog-site-content-container" class AND
// this class will be manipulated by JS to control the height
$blog_site_content_container = '';

if( is_page( 'Blog' ) || is_single() || is_category() || is_search() || is_archive() ):
  $blog_site_content_container = ' class="blog-site-content-container"';
endif;
?>

 <div class="container-narrow">
  <div id="site-content">
   <div id="site-content-mid-line">
    <div id="site-content-inner-line" class="clearfix">
     <div id="site-content-container" <?php echo $blog_site_content_container; ?> role="main">

      <?php
if( (is_page( 'Blog' ) || is_single() || is_category() || is_search() || is_archive()) ) {
?>
      <?php //Make space for blog in design ?>
      <div id="blog-spacer"></div>
      <?php
}
elseif( is_404() ) {
  echo '';
}

?>

      <?php
if(is_page('Portfolio')) {
  echo '';
}
elseif( $portfolio_feed_url == 'portfolio-feed' ) {
?>
      <h1>Portfolio</h1>
      <h2><?php the_title(); ?></h2>
      <?php
}
elseif(is_page( 'Blog' ) || is_single() || is_category() || is_search() || is_archive() && !in_category('37')) {
?>
      <h1>Blog</h1>
      <?php
}
elseif( is_404() ) {
  echo '';
}
else {
?>
      <h1><?php the_title(); ?></h1>
      <?php
}
?>