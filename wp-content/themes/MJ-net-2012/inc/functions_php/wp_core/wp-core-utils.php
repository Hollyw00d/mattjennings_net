<?php
// WP core code for functions.php
class WPCoreUtils {
 public static function init() {
  $self = new self();
  add_action('wp_loaded', array($self, 'enqueue_dequeue_styles_scripts'));

		// Add RSS links to <head> section
  add_theme_support( 'automatic-feed-links' );
		// Add Custom Menu
		add_theme_support( 'menus' );
 }

 // Enqueue or dequeue styles and scripts
	public function enqueue_dequeue_styles_scripts() {
		$query_string = $this->query_string_from_timestamp();
		// Dequeue WP block library CSS from WP Core
		// and NOT on admin
		if ( !is_admin() ) {
			wp_dequeue_style( 'wp-block-library' );
			wp_deregister_style( 'wp-block-library' );
		}

		// Enqueue CSS
		wp_enqueue_style( 'theme-styles', get_stylesheet_directory_uri() . '/build/css/theme.min.css', array(), $query_string );

		// Enqueue JS
		wp_enqueue_script('theme-scripts', get_stylesheet_directory_uri().'/build/js/theme.min.js', '', $query_string, true);
	} 

 // Utilities
 private function query_string_from_timestamp() {
		$timestamp_json_file_path = get_stylesheet_directory() . '/build/json/timestamp.json';
		$query_string = null;

		if (file_exists($timestamp_json_file_path)) {
			$json_data = file_get_contents($timestamp_json_file_path);
			$obj = json_decode($json_data);
			$timestamp = $obj->{'timestamp'};
			$query_string = $timestamp;
		}
		return $query_string;
	}	
}