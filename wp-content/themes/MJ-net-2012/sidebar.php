<div id="sidebar" role="complementary">

    <h2 id="search-label"><label for="s">Search</label></h2>

    <?php
    if (function_exists('dynamic_sidebar') && dynamic_sidebar('Sidebar Widgets')):
    endif;
    ?>

    <div id="categories-dropdown-2" class="widget">        
    <form action="<?php bloginfo('url'); ?>/" method="get">
        <h3 id="category-search-label"><label for="cat">Category Search</label></h3>
        <?php
        $select = wp_dropdown_categories('show_option_none=Select Category&show_count=1&orderby=name&echo=0&selected=6&exclude=37');

        $select = preg_replace("#<select([^>]*)>#", "<select$1 onchange='return this.form.submit()'>", $select);
        echo $select;
        ?>
        <noscript><input type="submit" value="View" /></noscript>
    </form>   
    </div>  

</div>