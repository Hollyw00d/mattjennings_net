<?php
require_once get_template_directory() . '/inc/global-vars/global-vars.php';
require_once get_template_directory() . '/inc/global-template-utils/global-template-utils.php';
$global_template_utils = new GlobalTemplateUtils();
?>
<a class="linkedin-icon" href="https://www.linkedin.com/in/mattpjennings/" target="_blank"
 aria-label="<?php echo $site_title; ?> on LinkedIn">
 <?php $global_template_utils->convert_svg_file_to_code('assets/images/social-networks/linkedin.svg'); ?>
</a>
<a class="github-icon" href="https://github.com/Hollyw00d" target="_blank"
 aria-label="<?php echo $site_title; ?> on GitHub">
  <?php $global_template_utils->convert_svg_file_to_code('assets/images/social-networks/github.svg'); ?>
</a>