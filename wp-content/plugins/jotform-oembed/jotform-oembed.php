<?php
/*
    Plugin Name: JotForm oEmbed
    Plugin URI: http://www.jotform.com/labs/wordpress
    Description:
    Version: 1.2.1
    Author: JotForm.com
    Author URI: http://www.jotform.com
    License: GNU General Public License v3
*/

class JotFormOEmbed {

    public function __construct() {
        wp_oembed_add_provider('#https?://(secure\.|www\.|form\.)?(my)?jotform(pro|eu|z)?\.(com|net|us|ca|me|co)(/form)?/[0-9]*#i', 'https://www.jotform.com/oembed/', true);
    }

}

$jotformOEmbed = new JotFormOEmbed();

?>
