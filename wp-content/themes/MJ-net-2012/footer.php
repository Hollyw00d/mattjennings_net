<?php
include 'inc/global-vars/global-vars.php';

if ( $portfolio_feed_url == 'portfolio-feed' ) {
  echo '';
}
elseif( (is_page( 'Blog' ) || is_single() || is_category() || is_search() || is_archive()) ) {
  get_sidebar();
}
elseif( is_404() ) {
  echo '';
}
?>

</div><!-- #site-content-container -->

<div id="footer" role="contentinfo">
 <p>&copy;2007 - <?php echo date("Y"); ?> Matt Jennings. All rights reserved.</p>
</div>

</div><!-- #site-content-inner-line -->
</div><!-- #site-content-mid-line -->
</div><!-- #site-content -->

</div><!-- .container-narrow -->

<!-- Displays on mobile & tablet devices only -->
<div id="mobile-site-footer-inner-line"></div>
<div id="mobile-site-footer-mid-line"></div>
<div id="mobile-site-footer"></div>
<?php wp_footer(); ?>
</body>
</html>