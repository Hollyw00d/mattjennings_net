<?php
// Global variables that appear at the top of
// header.php
// footer.php

// If URL has "portfolio-feed"
$portfolio_feed_url = substr($_SERVER['REQUEST_URI'],1,14);
$site_title = get_bloginfo( 'name' );