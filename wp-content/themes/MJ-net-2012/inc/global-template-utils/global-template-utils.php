<?php
// Global Functions to be used in WP template files, like:
// header.php, footer.php, etc.
class GlobalTemplateUtils {
 public function convert_svg_file_to_code($relative_path) {
  $svg_full_path = get_template_directory() . '/' . $relative_path;

  if(file_exists($svg_full_path)) {
   $svg_content = file_get_contents($svg_full_path);
   echo $svg_content;
  } else {
   echo '';
  }
 }
}