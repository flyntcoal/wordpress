<?php

/**
 * Plugin Name: GUI - Visual Editor 
 * Plugin URI: http://visual-editor.com
 * Description: GUI-VisualEditor gives you the ability to edit without needing to learn HTML markup, and many front-end framework like as Bootstrap, Foundation, FontAwesome, Animate.CSS and other. GUI-VisualEditor has given the easy of visual editing because it has been equipped with various plugins.
 * Version: 2.0.3
 * Author: JasmanXcrew 
 * Author URI: http://visual-editor.com
 * Text Domain: galau-ui-visual-editor
 * Domain Path: /languages/
 * 
 * */
# Exit if accessed directly
if (!defined("ABSPATH"))
{
    exit;
}

# Constant

/**
 * Exec Mode
 * */
define("GUI_EXEC", true);

/**
 * Plugin Base File
 * */
define("GUI_PATH", dirname(__file__));

/**
 * Plugin Base Directory
 * */
define("GUI_DIR", basename(GUI_PATH));

/**
 * Plugin Base URL
 * */
define("GUI_URL", plugins_url("/", __file__));

/**
 * Plugin Version
 * */
define("GUI_VERSION", "2.0.3");

/**
 * Plugin TinyMCE Version
 * */
define("GUI_TINYMCE_VERSION", "4.3.2");

/**
 * Debug Mode
 * */
define("GUI_DEBUG", false); //change false for distribution
define('GUI_TEXTDOMAIN', 'galau-ui-visual-editor');
/**
 * Base Class Plugin
 * @author Regel
 *
 * @access public
 * @package GUI - Visual Editor
 *
 * */
class GuiVisualEditor
{

    private $textdomain = GUI_TEXTDOMAIN;
    private $demo_mode = true;
    private $force_bootstrap = false;
    private $force_foundation = false;
    private $force_animatecss = false;
    private $force_fontawesome = false;
    private $force_foundation_icons = false;
    private $live_edit = false;
    private $default_addons = array();
    private $google_fonts = array();
    private $list_addons = array();
    private $options;
    private $message = array();
    private $framework_list = array();
    private $default_active_addons = array(
        'core',
        'save',
        'image',
        'contextmenu',
        'link',
        'table',
        'imagetools',
        'template',
        'code'
        );

    /**
     * Instance of a class
     * @access public
     * @return void
     * */
    function __construct()
    {
        $this->options = get_option("gui_option"); // get current option

        add_action('init', array($this, 'gui_init'));
        add_action("plugins_loaded", array($this, "gui_textdomain")); //load language/textdomain


        add_action("admin_bar_menu", array($this, "gui_admin_bar"), 55); //create admin toolbar
        add_filter("the_content", array($this, "gui_the_content")); // modif page for team

        add_action("wp_enqueue_scripts", array($this, "gui_register_scripts")); //add js
        add_action("wp_enqueue_scripts", array($this, "gui_register_styles")); //add css
        add_action("wp_head", array($this, "gui_custom_css"), 55); //load dinamic js
        add_filter('tiny_mce_before_init', array($this, "gui_extended_valid_elements"));


        if (is_admin())
        {

            add_action("init", array($this, "gui_post_type_templates_init")); // register a templates post type.
            add_action("add_meta_boxes", array($this, "gui_metabox_gui_templates")); //add metabox Templates
            add_action("save_post", array($this, "gui_metabox_gui_templates_save")); //save metabox Templates data

            add_action("admin_enqueue_scripts", array($this, "gui_admin_enqueue_scripts")); //add js for admin
            add_action("admin_enqueue_scripts", array($this, "gui_admin_enqueue_styles")); //add css for admin

            add_action("admin_menu", array($this, "gui_admin_menu_option_page")); // add option page
            add_action("admin_init", array($this, "gui_admin_menu_option_init"));

            add_action("wp_ajax_addons_save", array($this, "gui_ajax_addons_save"));
            add_action("wp_ajax_addons_order", array($this, "gui_ajax_addons_order"));
            add_action("wp_ajax_save_post", array($this, "gui_ajax_save_post"));

            add_action("wp_ajax_tinymce_setup", array($this, "gui_ajax_tinymce_setup"));
            add_action("wp_ajax_tinymce_preview", array($this, "gui_ajax_tinymce_preview"));
            add_action("wp_ajax_tinymce_templates", array($this, "gui_ajax_tinymce_templates"));


            add_filter("plugin_action_links_" . plugin_basename(__file__), array($this, "gui_plugin_settings_link"), 10, 5);
        }

        /** for demo readonly */
        if ($this->demo_mode == true)
        {
            add_action("wp_ajax_nopriv_tinymce_setup", array($this, "gui_ajax_tinymce_setup"));
            add_action("wp_ajax_nopriv_tinymce_templates", array($this, "gui_ajax_tinymce_templates"));
        }
    }

    /**
     * Instance of a class
     * @access public
     * @return void
     * */
    function gui_init()
    {

        // error handle
        if (isset($_GET['edit']))
        {
            $this->live_edit = true;
        } else
        {
            $this->live_edit = false;
        }

        if (!isset($this->options['force_bootstrap']))
        {
            $this->options['force_bootstrap'] = false;
        }
        if (!isset($this->options['force_foundation']))
        {
            $this->options['force_foundation'] = false;
        }
        if (!isset($this->options['force_animatecss']))
        {
            $this->options['force_animatecss'] = false;
        }
        if (!isset($this->options['force_fontawesome']))
        {
            $this->options['force_fontawesome'] = false;
        }
        if (!isset($this->options['force_foundation_icon']))
        {
            $this->options['force_foundation_icon'] = false;
        }

        //default setting

        $this->force_bootstrap = $this->options['force_bootstrap'];
        $this->force_foundation = $this->options['force_foundation'];
        $this->force_animatecss = $this->options['force_animatecss'];
        $this->force_fontawesome = $this->options['force_fontawesome'];
        $this->force_foundation_icons = $this->options['force_foundation_icon'];


        $framework[] = array('name' => 'Dashicons', 'pattern' => 'dashicons');
        $framework[] = array('name' => 'Bootstrap', 'pattern' => 'bootstrap');
        $framework[] = array('name' => 'Animate CSS', 'pattern' => 'animate');
        $framework[] = array('name' => 'FontAwesome', 'pattern' => 'font-awesome|fontawesome');
        $framework[] = array('name' => 'Google Fonts', 'pattern' => 'fonts.googleapis.com');

        $this->framework_list = $framework;
        $default_addons = array();
        if (file_exists(GUI_PATH . '/includes/default-addons.php'))
        {
            include_once GUI_PATH . '/includes/default-addons.php';
        }

        if (file_exists(GUI_PATH . '/includes/google-fonts.php'))
        {
            include_once GUI_PATH . '/includes/google-fonts.php';
        }
        $this->google_fonts = $goggle_fonts;
        $this->default_addons = $default_addons;
        $this->__update_addons();
    }

    /**
     * Register custom post types (templates)
     *
     * @link http://codex.wordpress.org/Function_Reference/register_post_type
     * @access public
     * @return void
     **/

    public function gui_post_type_templates_init()
    {

        $labels = array(
            'name' => _x('Templates', 'post type general name', 'galau-ui-visual-editor'),
            'singular_name' => _x('Template', 'post type singular name', 'galau-ui-visual-editor'),
            'menu_name' => _x('Template', 'admin menu', 'galau-ui-visual-editor'),
            'name_admin_bar' => _x('Templates', 'add new on admin bar', 'galau-ui-visual-editor'),
            'add_new' => _x('Add New', 'book', 'galau-ui-visual-editor'),
            'add_new_item' => __('Add New Template', 'galau-ui-visual-editor'),
            'new_item' => __('new template', 'galau-ui-visual-editor'),
            'edit_item' => __('Edit Template', 'galau-ui-visual-editor'),
            'view_item' => __('View Template', 'galau-ui-visual-editor'),
            'all_items' => __('GUI - Templates', 'galau-ui-visual-editor'),
            'search_items' => __('Search Templates', 'galau-ui-visual-editor'),
            'parent_item_colon' => __('Parent Templates:', 'galau-ui-visual-editor'),
            'not_found' => __('not found', 'galau-ui-visual-editor'),
            'not_found_in_trash' => __('no found in trash', 'galau-ui-visual-editor'));

        $supports = array('title');

        $args = array(
            'labels' => $labels,
            'description' => __('-', 'galau-ui-visual-editor'),
            'public' => false,
            'public' => false,
            'capability_type' => 'page',
            'menu_icon' => 'dashicons-tickets',
            'show_ui' => true,
            'show_in_menu' => 'options-general.php',
            'query_var' => false,
            'rewrite' => false,
            'supports' => $supports,
            );


        register_post_type('gui_templates', $args);

    }

    /**
     * Add Metabox (gui_templates)
     * 
     * @link http://codex.wordpress.org/Function_Reference/add_meta_box
     * @param mixed $hooks
     * @access public
     * @return void
     **/
    public function gui_metabox_gui_templates($hook)
    {
        $allowed_hook = array("gui_templates"); //limit meta box to certain page
        if (in_array($hook, $allowed_hook))
        {
            add_meta_box("gui_metabox_gui_templates", __("Templates", "galau-ui-visual-editor"), array($this, "gui_metabox_gui_templates_callback"), $hook, "normal", "high");
        }
    }
    /**
     * Create metabox markup (gui_templates)
     * 
     * @param mixed $post
     * @access public
     * @return void
     **/
    public function gui_metabox_gui_templates_callback($post)
    {
        // Add a nonce field so we can check for it later.
        wp_nonce_field("gui_metabox_gui_templates_save", "gui_metabox_gui_templates_nonce");
        /**
         * You can make HTML tag for Metabox Templates here
         **/


        printf("<table class=\"form-table\">");

        // Use get_post_meta to retrieve an existing value from the database.
        $current_gui_postmeta_description = get_post_meta($post->ID, "_gui_postmeta_description", true);

        /** Display the form description, using the current value. **/
        printf("<tr><th scope=\"row\"><label for=\"gui_postmeta_description\">%s</label></th><td><input class=\"gui-form-control\" type=\"text\" id=\"gui_postmeta_description\" name=\"gui_postmeta_description\" value=\"%s\" placeholder=\" \" /></td></tr>", __("Description", "galau-ui-visual-editor"), esc_attr($current_gui_postmeta_description));


        // Use get_post_meta to retrieve an existing value from the database.
        $current_gui_postmeta_html = get_post_meta($post->ID, "_gui_postmeta_html", true);

        /** Display the form html, using the current value. **/
        printf("<tr>");
        printf("<th scope=\"row\"><label for=\"gui_postmeta_html\">" . __("HTML", "galau-ui-visual-editor") . "</label></th>");
        printf("<td class=\"gui gui-col-sm-10\"><textarea class=\"gui-form-control\" type=\"text\" id=\"gui_postmeta_html\" name=\"gui_postmeta_html\" placeholder=\" \">" . esc_attr($current_gui_postmeta_html) . "</textarea></td>");
        printf("</tr>");


        // Use get_post_meta to retrieve an existing value from the database.
        $current_gui_postmeta_css = get_post_meta($post->ID, "_gui_postmeta_css", true);

        /** Display the form css, using the current value. **/
        printf("<tr>");
        printf("<th scope=\"row\"><label for=\"gui_postmeta_css\">" . __("css", "galau-ui-visual-editor") . "</label></th>");
        printf("<td class=\"gui gui-col-sm-10\"><textarea class=\"gui-form-control\" type=\"text\" id=\"gui_postmeta_css\" name=\"gui_postmeta_css\" placeholder=\" \">" . esc_attr($current_gui_postmeta_css) . "</textarea></td>");
        printf("</tr>");


        // Use get_post_meta to retrieve an existing value from the database.
        $current_gui_postmeta_js = get_post_meta($post->ID, "_gui_postmeta_js", true);

        /** Display the form js, using the current value. **/
        printf("<tr>");
        printf("<th scope=\"row\"><label for=\"gui_postmeta_js\">" . __("JS", "galau-ui-visual-editor") . "</label></th>");
        printf("<td class=\"gui gui-col-sm-10\"><textarea class=\"gui-form-control\" type=\"text\" id=\"gui_postmeta_js\" name=\"gui_postmeta_js\" placeholder=\" \">" . esc_attr($current_gui_postmeta_js) . "</textarea></td>");
        printf("</tr>");
        echo "</table>";
    }


    /**
     *
     * Save the meta when the post is saved.
     * GalauUiVisualEditor::gui_metabox_gui_templates_save()
     * @param int $post_id The ID of the post being saved.
     *
     **/
    public function gui_metabox_gui_templates_save($post_id)
    {

        /*
        * We need to verify this came from the our screen and with proper authorization,
        * because save_post can be triggered at other times.
        */

        // Check if our nonce is set.
        if (!isset($_POST["gui_metabox_gui_templates_nonce"]))
            return $post_id;
        $nonce = $_POST["gui_metabox_gui_templates_nonce"];

        // Verify that the nonce is valid.
        if (!wp_verify_nonce($nonce, "gui_metabox_gui_templates_save"))
            return $post_id;

        // If this is an autosave, our form has not been submitted,
        // so we don't want to do anything.
        if (defined("DOING_AUTOSAVE") && DOING_AUTOSAVE)
            return $post_id;

        // Check the user's permissions.
        if ("page" == $_POST["post_type"])
        {
            if (!current_user_can("edit_page", $post_id))
                return $post_id;
        } else
        {
            if (!current_user_can("edit_post", $post_id))
                return $post_id;
        }

        /* OK, its safe for us to save the data now. */

        // Sanitize the user input.
        $description = sanitize_text_field($_POST["gui_postmeta_description"]);

        // Update the meta field.
        update_post_meta($post_id, "_gui_postmeta_description", $description);

        // Sanitize the user input.
        $html = sanitize_text_field($_POST["gui_postmeta_html"]);

        // Update the meta field.
        update_post_meta($post_id, "_gui_postmeta_html", $html);

        // Sanitize the user input.
        $css = sanitize_text_field($_POST["gui_postmeta_css"]);

        // Update the meta field.
        update_post_meta($post_id, "_gui_postmeta_css", $css);

        // Sanitize the user input.
        $js = sanitize_text_field($_POST["gui_postmeta_js"]);

        // Update the meta field.
        update_post_meta($post_id, "_gui_postmeta_js", $js);

    }


    /**
     * GuiVisualEditor::gui_custom_css()
     * 
     * @return void
     */
    function gui_custom_css()
    {
        $custom_css = wp_unslash(wp_unslash(get_option('gui_costom_css')));
        if (strlen($custom_css) > 5)
        {
            echo "\r\n";
            echo '<style type="text/css" id="gui-css">' . "\r\n";
            echo $custom_css;
            echo "\r\n";
            echo '</style>' . "\r\n";
        }
    }

    /**
     * GuiVisualEditor::gui_plugin_settings_link()
     * 
     * @param mixed $actions
     * @param mixed $plugin_file
     * @return
     */
    function gui_plugin_settings_link($actions, $plugin_file)
    {
        static $plugin;

        if (!isset($plugin))
        {
            $plugin = plugin_basename(__file__);
        }

        if ($plugin == $plugin_file)
        {

            $settings = array('settings' => '<a href="options-general.php?page=gui_settings">' . __('Settings', $this->textdomain) . '</a>');
            $site_link = array('support' => '<a href="http://visual-editor.com/support.php" target="_blank">' . __('Support', $this->textdomain) . '</a>');
            $actions = array_merge($site_link, $actions);
            $actions = array_merge($settings, $actions);
        }

        return $actions;
    }

    /**
     * GuiVisualEditor::gui_extended_valid_elements()
     * 
     * @param mixed $init
     * @return
     */
    function gui_extended_valid_elements($init)
    {

        $valid_elements = "@[id|class|style|title|dir<ltr?rtl|lang|xml::lang|onclick|ondblclick|";
        $valid_elements .= "onmousedown|onmouseup|onmouseover|onmousemove|onmouseout|onkeypress|";
        $valid_elements .= "onkeydown|onkeyup],a[rel|rev|charset|hreflang|tabindex|accesskey|type|";
        $valid_elements .= "name|href|target|title|class|onfocus|onblur],strong/b,em/i,strike,u,";
        $valid_elements .= "#p,-ol[type|compact],-ul[type|compact],-li,br,img[longdesc|usemap|";
        $valid_elements .= "src|border|alt=|title|hspace|vspace|width|height|align],-sub,-sup,";
        $valid_elements .= "-blockquote,-table[border=0|cellspacing|cellpadding|width|frame|rules|";
        $valid_elements .= "height|align|summary|bgcolor|background|bordercolor],-tr[rowspan|width|";
        $valid_elements .= "height|align|valign|bgcolor|background|bordercolor],tbody,thead,tfoot,";
        $valid_elements .= "#td[colspan|rowspan|width|height|align|valign|bgcolor|background|bordercolor";
        $valid_elements .= "|scope],#th[colspan|rowspan|width|height|align|valign|scope],caption,-div,";
        $valid_elements .= "-code,-pre,address,-h1,-h2,-h3,-h4,-h5,-h6,hr[size|noshade],-font[face";
        $valid_elements .= "|size|color],dd,dl,dt,cite,abbr,acronym,del[datetime|cite],ins[datetime|cite],";
        $valid_elements .= "object[classid|width|height|codebase|*],param[name|value|_value],embed[type|width";
        $valid_elements .= "|height|src|*],script[src|type],map[name],area[shape|coords|href|alt|target],bdo,";
        $valid_elements .= "button,col[align|char|charoff|span|valign|width],colgroup[align|char|charoff|span|";
        $valid_elements .= "valign|width],dfn,fieldset,form[action|accept|accept-charset|enctype|method],";
        $valid_elements .= "input[accept|alt|checked|disabled|maxlength|name|readonly|size|src|type|value],";
        $valid_elements .= "kbd,label[for],legend,noscript,optgroup[label|disabled],option[disabled|label|selected|value],";
        $valid_elements .= "q[cite],samp,select[disabled|multiple|name|size],small,";
        $valid_elements .= "textarea[cols|rows|disabled|name|readonly],tt,var,big,+span";

        $init['valid_elements'] = $valid_elements;
        return $init;
    }

    /**
     * Add option page.
     * @link http://codex.wordpress.org/Function_Reference/add_options_page
     * @access public
     * @return void
     * */
    public function gui_admin_menu_option_page()
    {
        add_options_page("GUI - " . __("Visual Editor", $this->textdomain), //page title
            "GUI - " . __("Visual Editor", $this->textdomain), //menu title
            "manage_options", //capability
            "gui_settings", //slug
            array($this, "gui_admin_option_markup"));
    }

    /**
     * GuiVisualEditor::__update_addons()
     * 
     * @return void
     */
    private function __update_addons()
    {
        $_new_addons = array();
        $option = get_option("gui_addons");
        if (!is_array($option['addons']))
        {
            $option['addons'] = array();
        }
        foreach ($option['addons'] as $addons)
        {
            $plugin_data = json_decode($addons, true);
            $plugin_tinymce = $this->__get_addons_preferences($plugin_data);


            if (!isset($plugin_data['default']))
            {
                $plugin_data['default'] = false;
            }

            if ($plugin_data['default'] == true)
            {
                $_new_addons[$plugin_tinymce['id']] = $addons;
            } else
            {
                if (isset($plugin_tinymce['id']))
                {
                    $xml_file = GUI_PATH . '/add-ons/' . $plugin_tinymce['id'] . '/plugin.xml';
                    if (file_exists($xml_file))
                    {
                        $_new_addons[$plugin_tinymce['id']] = $addons;
                    }
                }
            }
        }
        $new_addons['addons'] = $_new_addons;
        update_option("gui_addons", $new_addons);
    }

    /**
     * Get Info add ons usage
     * 
     * @return void
     */
    private function __addons_usage_list($var)
    {
        $html = null;
        $addons_active = array();
        $option = get_option("gui_addons");


        foreach ($option['addons'] as $addons)
        {
            $addons_info = $this->__get_addons_preferences(json_decode($addons, true));
            $addons_active[] = $addons_info['id'];
        }


        $buttons_list = json_decode(get_option("gui_button_list"), true);
        if (!is_array($buttons_list))
        {
            $buttons_list = array();
        }


        $buttons_order = json_decode(get_option("gui_button_order"), true);
        if (!is_array($buttons_order))
        {
            $buttons_order = array();
        }


        if (isset($buttons_order[$var]))
        {
            foreach (explode(',', $buttons_order[$var]) as $addons)
            {
                if (!empty($addons))
                {
                    $addons_used = trim($addons);
                    if (isset($buttons_list[$addons_used]))
                    {
                        if (in_array($buttons_list[$addons_used]['idbase'], $addons_active))
                        {
                            //$preference['multi_number'] = 1;
                            $preference = $buttons_list[$addons_used];
                            $preperence['id'] = $addons_used;
                            $preperence['addnew'] = "";

                            $html .= $this->__admin_addons_markup($preference);
                        }
                    }
                }
            }
        }

        return $html;
    }

    /**
     * Create Markup for Add ons available list
     * 
     * @return string
     */
    function __addons_available_list()
    {
        $html = null;
        $z = 0;
        $option = get_option("gui_addons");
        foreach ($option['addons'] as $addons)
        {

            $z++;
            $plugin_data = json_decode($addons, true);
            $plugin_tinymce = $this->__get_addons_preferences($plugin_data);

            if (isset($plugin_tinymce['button']))
            {
                $preperence['id'] = 'addons-' . $z . '_' . $plugin_tinymce['id'] . '-__i__';
                $preperence['idbase'] = $plugin_tinymce['id'];
                $preperence['title'] = $plugin_data['name'];
                $preperence['description'] = $plugin_data['description'];
                $preperence['button'] = $plugin_tinymce['button'];
                $preperence['default'] = $plugin_tinymce['button'];
                $preperence['multi_number'] = time();
                $preperence['addnew'] = "multi";
                $html .= $this->__admin_addons_markup($preperence);
            }
        }
        return $html;
    }

    /**
     * GuiVisualEditor::__toolbar_button()
     * 
     * @param mixed $str
     * @return
     */
    function __toolbar_button($str)
    {
        $html = null;
        $buttons = explode(" ", $str);
        foreach ($buttons as $button)
        {
            $html .= '<a href="#!_" class="gui_toolbar_button gui_toolbar_append" data-value="' . $button . '"><span class="gui_label"><i class="gui-mce-i gui-mce-i-' . $button . '"></i>' . $button . '</span></a> ';
        }
        return $html;
    }

    /**
     * Create markup html for addson
     * 
     * @return void
     */
    function __admin_addons_markup($preperence)
    {
        if (!isset($preperence['addnew']))
        {
            $preperence['addnew'] = '';
        }
        if (!isset($preperence['multi_number']))
        {
            $preperence['multi_number'] = '';
        }
        $html = null;
        $html .= '
            <div id="' . esc_attr($preperence['id']) . '" class="addons widget">
				<div class="addons-top widget-top">
                    <div class="addons-title-action">
                    <a class="addons-action widget-action hide-if-no-js" href="#available-addonss"></a>
                    <a class="addons-control-edit hide-if-js" href="#">
                    	<span class="edit">' . __("edit", $this->textdomain) . '</span>
                    	<span class="add">' . __("add", $this->textdomain) . '</span>
                    	<span class="screen-reader-text">' . esc_attr($preperence['title']) . '</span>
                    </a>
                    </div>
                    <div class="addons-title widget-title">
                        <h4>' . esc_attr($preperence['title']) . '<span class="in-addons-title"></span></h4>
                    </div>
                </div>
                <div class="addons-inside widget-inside">
                    <form method="post">
 			        
                     <div class="addons-content widget-content">
        				<p>
        					<label>' . __("Code", $this->textdomain) . '</label>
        					<textarea class="widefat addons-button" name="addons-button" >' . esc_attr($preperence['button']) . '</textarea>
                        </p>                      
			         </div>
                     
                    <div>
                        <label>' . __("Available", $this->textdomain) . '</label>    
                        <p class="gui_toolbar">' . $this->__toolbar_button($preperence['default']) . '</p>
                        <p>
                            <a class="gui_toolbar_append" data-value="|" href="#!_">' . __("Separator", $this->textdomain) . '</a> | 
                            <a class="gui_toolbar_insert" data-value="" href="#!_">' . __("Clear", $this->textdomain) . '</a> | 
                            <a class="gui_toolbar_insert" data-value="' . esc_attr($preperence['button']) . '" href="#!_">' . __("Reset", $this->textdomain) . '</a>
                        </p>
                    </div>
                        
                    <input type="hidden" name="addons-title" class="addons-title" value="' . esc_attr($preperence['title']) . '" />
                    <input type="hidden" name="addons-id" class="addons-id" value="' . esc_attr($preperence['id']) . '" />
                    <input type="hidden" name="addons-idbase" class="addons-idbase" value="' . esc_attr($preperence['idbase']) . '" />  
                    
                    <input type="hidden" name="multi_number" class="multi_number" value="' . $preperence['multi_number'] . '" />
                    <input type="hidden" name="addons-default" class="addons-default" value="' . esc_attr($preperence['default']) . '" />
                    <input type="hidden" name="addons-description" class="addons-description" value="' . esc_attr($preperence['description']) . '" />
          
                    <input class="add_new" type="hidden" value="' . esc_attr($preperence['addnew']) . '" name="add_new">
                 	
                     <div class="addons-control-actions">
        				<div class="alignleft">
        					<a class="addons-control-remove" href="#remove">' . __("Delete", $this->textdomain) . '</a>
        					|
        					<a class="addons-control-close" href="#close">' . __("Close", $this->textdomain) . '</a>
        				</div>
        				<div class="alignright">
        					<input type="submit" name="saveaddons" id="addons-' . esc_attr($preperence['id']) . '" class="button button-primary addons-control-save right" value="' . __("Save", $this->textdomain) . '" />
        					<span class="spinner"></span>
        				</div>
        				<br class="clear" />
        			</div>
                    </form>
                </div>
               	<div class="addons-description">
		          ' . esc_attr($preperence['description']) . '
	           </div>
            </div>';
        return $html;
    }

    /**
     * Markup for Tabs
     * 
     * @return string
     */
    function _admin_tabs_markup()
    {
        $tabs[] = array(
            'label' => __("Editor", $this->textdomain),
            'link' => '?page=gui_settings&sub=editor',
            );

        $tabs[] = array(
            'label' => __("Add Ons", $this->textdomain),
            'link' => '?page=gui_settings&sub=addons',
            );

        $tabs[] = array(
            'label' => __("Toolbars", $this->textdomain),
            'link' => '?page=gui_settings&sub=toolbars',
            );

        // $tabs[] = array(
        //    'label' => __("Context Menu", $this->textdomain),
        //    'link' => '?page=gui_settings&sub=context',
        //     );


        $tabs[] = array(
            'label' => __("Google Fonts", $this->textdomain),
            'link' => '?page=gui_settings&sub=google-fonts',
            );

        $tabs[] = array(
            'label' => __("Templates", $this->textdomain),
            'link' => 'edit.php?post_type=gui_templates',
            );

        //   $tabs[] = array(
        //       'label' => __("Add Ons Directory", $this->textdomain),
        //        'link' => '?page=gui_settings&sub=addons-directory',
        //      );
        $tabs[] = array(
            'label' => __("Custom CSS", $this->textdomain),
            'link' => '?page=gui_settings&sub=custom-css',
            );
        $tabs[] = array(
            'label' => __("Support", $this->textdomain),
            'link' => '?page=gui_settings&sub=support',
            );

        $html = '<h2 class="nav-tab-wrapper">';
        foreach ($tabs as $tab)
        {
            $active = '';
            $tab_active = '?page=gui_settings&sub=';
            if (isset($_GET['sub']))
            {
                $tab_active .= $_GET['sub'];
            }
            if ($tab_active == $tab['link'])
            {
                $active = ' nav-tab-active';
            }

            $html .= '<a href="' . $tab['link'] . '" class="nav-tab' . $active . '">' . $tab['label'] . '</a>';
        }
        $html .= '</h2>';
        return $html;
    }

    /**
     * Create option page markup
     *
     * @access public
     * @return void
     * */
    public function gui_admin_option_markup()
    {
        $this->options = get_option("gui_option");

        echo '<div id="gui_option">';
        echo '<h1>GUI - ' . __("Visual Editor", $this->textdomain) . '</h1>';
        echo '<div class="description">' . __("On this page you can manage the editor toolbar, addons active, or add custom css", $this->textdomain) . '</div>';

        if (!isset($_GET['sub']))
        {
            $_GET['sub'] = 'editor';
        }

        switch ($_GET['sub'])
        {
            case 'toolbars':
                echo '<div class="wrap">';
                if (wp_is_mobile())
                    wp_enqueue_script('jquery-touch-punch');

                echo $this->_admin_tabs_markup();
                echo $this->_manage_toolbar();
                echo '</div>';
                break;
            case 'editor':
                echo '<div class="wrap">';
                echo $this->_admin_tabs_markup();
                echo '<div class="inside"><form method="post" action="options.php">';
                settings_fields("gui_option_group");
                do_settings_sections("gui-settings");
                submit_button();
                echo '</form></div>';
                echo '</div>';
                break;

            case 'addons':
                echo '<div class="wrap">';
                echo $this->_admin_tabs_markup();
                echo $this->_manage_addons();
                echo '</div>';
                break;

            case 'custom-css':
                echo '<div class="wrap">';
                echo $this->_admin_tabs_markup();
                echo $this->_admin_custom_css_markup();
                echo '</div>';

                break;
            case 'addons-directory':
                echo '<div class="wrap">';
                echo $this->_admin_tabs_markup();
                echo '</div>';
                break;

            case 'google-fonts':
                echo '<div class="wrap">';
                echo $this->_admin_tabs_markup();
                echo $this->_admin_google_fonts_markup();
                echo '</div>';
                break;
            case 'templates':
                echo '<div class="wrap">';
                echo $this->_admin_tabs_markup();
                // echo $this->__admin_google_fonts_markup();
                echo '</div>';
                break;

            case 'support':
                echo '<div class="wrap">';
                echo $this->_admin_tabs_markup();

                echo '<p>We also have a community forum for user to user interactions. Ask another user or developers! <br/>
                    Do not forget to give it a good rating so we can continue working, <br/>because a good rating will provide encouragement and motivation for us.</p>
                   <a class="button button-default" target="_blank" href="https://wordpress.org/support/view/plugin-reviews/galau-ui-visual-editor">Give a rating</a>
                   <a class="button button-primary" target="_blank" href="https://wordpress.org/support/plugin/galau-ui-visual-editor">Plugin Forums</a>
                    ';

                echo '</div>';
                break;
        }

        echo '</div>';
    }

    /**
     * option instance
     * @link https://codex.wordpress.org/Function_Reference/register_setting
     * @access public
     * @return void
     * */
    public function gui_admin_menu_option_init()
    {

        #info: https://codex.wordpress.org/Function_Reference/register_setting
        register_setting("gui_option_group", // group
            "gui_option", //name
            array($this, "gui_admin_menu_option_sanitize") //sanitize_callback
            );

        #info: https://codex.wordpress.org/Function_Reference/add_settings_section
        add_settings_section("gui_section_tinymce", //id
            __("Frontend Editor", $this->textdomain), //title
            array($this, "gui_admin_menu_option_tinymce_info"), //callback
            "gui-settings" //page
            );


        #info: https://codex.wordpress.org/Function_Reference/add_settings_field
        add_settings_field("tinymce_url", //id
            __("TinyMCE via", $this->textdomain), //title
            array($this, "gui_admin_menu_option_tinymce_url_callback"), //callback
            "gui-settings", //page
            "gui_section_tinymce" //section
            );

        #info: https://codex.wordpress.org/Function_Reference/add_settings_field
        add_settings_field("tinymce_url_custom", //id
            __("URL Custom", $this->textdomain), //title
            array($this, "gui_admin_menu_option_tinymce_url_custom_callback"), //callback
            "gui-settings", //page
            "gui_section_tinymce" //section
            );

        #info: https://codex.wordpress.org/Function_Reference/add_settings_field
        add_settings_field("inline_editor", //id
            __("Configuration", $this->textdomain), //title
            array($this, "gui_admin_menu_option_inline_editor_callback"), //callback
            "gui-settings", //page
            "gui_section_tinymce" //section
            );

        #info: https://codex.wordpress.org/Function_Reference/add_settings_field
        add_settings_field("menubar", //id
            "", //title
            array($this, "gui_admin_menu_option_menubar_callback"), //callback
            "gui-settings", //page
            "gui_section_tinymce" //section
            );

        #info: https://codex.wordpress.org/Function_Reference/add_settings_section
        add_settings_section("gui_section_framework", //id
            __("Frontend Framework", $this->textdomain), //title
            array($this, "gui_admin_menu_option_framework_info"), //callback
            "gui-settings" //page
            );

        #info: https://codex.wordpress.org/Function_Reference/add_settings_field
        add_settings_field("force_bootstrap", //id
            __("Force use", $this->textdomain), //title
            array($this, "gui_admin_menu_option_force_bootstrap_callback"), //callback
            "gui-settings", //page
            "gui_section_framework" //section
            );

        #info: https://codex.wordpress.org/Function_Reference/add_settings_field
        add_settings_field("force_foundation", //id
            "", //title
            array($this, "gui_admin_menu_option_force_foundation_callback"), //callback
            "gui-settings", //page
            "gui_section_framework" //section
            );

        #info: https://codex.wordpress.org/Function_Reference/add_settings_field
        add_settings_field("force_foundation_icon", //id
            "", //title
            array($this, "gui_admin_menu_option_force_foundation_icon_callback"), //callback
            "gui-settings", //page
            "gui_section_framework" //section
            );

        #info: https://codex.wordpress.org/Function_Reference/add_settings_field
        add_settings_field("force_animatecss", //id
            "", //title
            array($this, "gui_admin_menu_option_force_animatecss_callback"), //callback
            "gui-settings", //page
            "gui_section_framework" //section
            );

        #info: https://codex.wordpress.org/Function_Reference/add_settings_field
        add_settings_field("force_fontawesome", //id
            "", //title
            array($this, "gui_admin_menu_option_force_fontawesome_callback"), //callback
            "gui-settings", //page
            "gui_section_framework" //section
            );
    }

    /**
     * Sanitize Callback 
     * A callback function that sanitizes the option's value
     * 
     * @param mixed $input
     * @see gui_admin_menu_option_init()
     * */
    public function gui_admin_menu_option_sanitize($input)
    {
        $new_input = array();
        if (isset($input["inline_editor"]))
            $new_input["inline_editor"] = sanitize_text_field($input["inline_editor"]);

        if (isset($input["menubar"]))
            $new_input["menubar"] = sanitize_text_field($input["menubar"]);
        if (isset($input["tinymce_url"]))
            $new_input["tinymce_url"] = sanitize_text_field($input["tinymce_url"]);

        if (isset($input["tinymce_url_custom"]))
            $new_input["tinymce_url_custom"] = sanitize_text_field($input["tinymce_url_custom"]);

        if (isset($input["force_bootstrap"]))
            $new_input["force_bootstrap"] = sanitize_text_field($input["force_bootstrap"]);

        if (isset($input["force_foundation"]))
            $new_input["force_foundation"] = sanitize_text_field($input["force_foundation"]);

        if (isset($input["force_animatecss"]))
            $new_input["force_animatecss"] = sanitize_text_field($input["force_animatecss"]);

        if (isset($input["force_fontawesome"]))
            $new_input["force_fontawesome"] = sanitize_text_field($input["force_fontawesome"]);

        if (isset($input["force_foundation_icon"]))
            $new_input["force_foundation_icon"] = sanitize_text_field($input["force_foundation_icon"]);

        return $new_input;
    }

    /**
     * Option page callback (inline_editor)
     * 
     * @return void
     * @see gui_admin_menu_option_init()
     * */
    public function gui_admin_menu_option_inline_editor_callback()
    {
        if (isset($this->options["inline_editor"]))
        {
            $current_gui_option_inline_editor = esc_attr($this->options["inline_editor"]);
        } else
        {
            $current_gui_option_inline_editor = "";
        }
        $input = null;
        $input .= "<label class='gui gui-checkbox'><input class='gui' id='gui_option_inline_editor' type='checkbox' name='gui_option[inline_editor]' value='1' " . checked(1, $current_gui_option_inline_editor, false) . " /></label>";
        $input .= __("Enable inline editing", $this->textdomain);
        printf($input);
    }

    /**
     * Option page callback (menubar)
     * 
     * @return void
     * @see gui_admin_menu_option_init()
     * */
    public function gui_admin_menu_option_menubar_callback()
    {
        if (isset($this->options["menubar"]))
        {
            $current_gui_option_menubar = esc_attr($this->options["menubar"]);
        } else
        {
            $current_gui_option_menubar = "";
        }
        $input = null;
        $input .= "<label class='gui gui-checkbox'><input class='gui' id='gui_option_menubar' type='checkbox' name='gui_option[menubar]' value='1' " . checked(1, $current_gui_option_menubar, false) . " /></label>";
        $input .= __("Enable Menu Bar", $this->textdomain);
        printf($input);
    }

    /**
     * Option page callback (tinymce_url)
     * 
     * @return void
     * @see gui_admin_menu_option_init()
     * */
    public function gui_admin_menu_option_tinymce_url_callback()
    {
        if (isset($this->options["tinymce_url"]))
        {
            $current_gui_option_tinymce_url = esc_attr($this->options["tinymce_url"]);
        } else
        {
            $current_gui_option_tinymce_url = "assets";
        }
        $input = null;
        $input_options = array();
        $input_options[] = array("value" => "assets", "label" => __("Local Files", $this->textdomain));
        $input_options[] = array("value" => "cdn", "label" => __("Content Delivery Network", $this->textdomain));
        $input_options[] = array("value" => "custom", "label" => __("URL Custom", $this->textdomain));
        $input .= "<select class='regular-text' id='gui_option_tinymce_url' name='gui_option[tinymce_url]' >";
        foreach ($input_options as $input_option)
        {
            $selected = "";
            if ($input_option["value"] == $current_gui_option_tinymce_url)
            {
                $selected = "selected";
            }
            $input .= "<option value='" . $input_option["value"] . "' " . $selected . ">" . $input_option["label"] . "</option>";
        }
        $input .= "</select>";
        printf($input);
    }

    /**
     * Option page callback (tinymce_url_custom)
     * 
     * @return void
     * @see gui_admin_menu_option_init()
     * */
    public function gui_admin_menu_option_tinymce_url_custom_callback()
    {
        if (isset($this->options["tinymce_url_custom"]))
        {
            $current_gui_option_tinymce_url_custom = esc_attr($this->options["tinymce_url_custom"]);
        } else
        {
            $current_gui_option_tinymce_url_custom = "";
        }
        $description = __("", $this->textdomain);
        printf("<input class='regular-text' id='gui_option_tinymce_url_custom' type='text' name='gui_option[tinymce_url_custom]' value='%s'/><p class='description'>%s</p>", $current_gui_option_tinymce_url_custom, $description);
    }

    /**
     * Option page callback (force_bootstrap)
     * 
     * @return void
     * @see gui_admin_menu_option_init()
     * */
    public function gui_admin_menu_option_force_bootstrap_callback()
    {
        if (isset($this->options["force_bootstrap"]))
        {
            $current_gui_option_force_bootstrap = esc_attr($this->options["force_bootstrap"]);
        } else
        {
            $current_gui_option_force_bootstrap = "";
        }
        $input = null;
        $input .= "<label class='gui gui-checkbox'><input class='gui' id='gui_option_force_bootstrap' type='checkbox' name='gui_option[force_bootstrap]' value='1' " . checked(1, $current_gui_option_force_bootstrap, false) . " /></label>";
        $input .= __("Bootstrap Framework", $this->textdomain);
        printf($input);
    }

    /**
     * Option page callback (force_foundation)
     * 
     * @return void
     * @see gui_admin_menu_option_init()
     * */
    public function gui_admin_menu_option_force_foundation_callback()
    {
        if (isset($this->options["force_foundation"]))
        {
            $current_gui_option_force_foundation = esc_attr($this->options["force_foundation"]);
        } else
        {
            $current_gui_option_force_foundation = "";
        }
        $input = null;
        $input .= "<label class='gui gui-checkbox'><input class='gui' id='gui_option_force_foundation' type='checkbox' name='gui_option[force_foundation]' value='1' " . checked(1, $current_gui_option_force_foundation, false) . " /></label>";
        $input .= __("Foundation Framework", $this->textdomain);
        printf($input);
    }

    /**
     * Option page callback (force_animatecss)
     * 
     * @return void
     * @see gui_admin_menu_option_init()
     * */
    public function gui_admin_menu_option_force_animatecss_callback()
    {
        if (isset($this->options["force_animatecss"]))
        {
            $current_gui_option_force_animatecss = esc_attr($this->options["force_animatecss"]);
        } else
        {
            $current_gui_option_force_animatecss = "";
        }
        $input = null;
        $input .= "<label class='gui gui-checkbox'><input class='gui' id='gui_option_force_animatecss' type='checkbox' name='gui_option[force_animatecss]' value='1' " . checked(1, $current_gui_option_force_animatecss, false) . " /></label>";
        $input .= __("Animate CSS", $this->textdomain);
        printf($input);
    }

    /**
     * Option page callback (force_fontawesome)
     * 
     * @return void
     * @see gui_admin_menu_option_init()
     * */
    public function gui_admin_menu_option_force_fontawesome_callback()
    {
        if (isset($this->options["force_fontawesome"]))
        {
            $current_gui_option_force_fontawesome = esc_attr($this->options["force_fontawesome"]);
        } else
        {
            $current_gui_option_force_fontawesome = "";
        }
        $input = null;
        $input .= "<label class='gui gui-checkbox'><input class='gui' id='gui_option_force_fontawesome' type='checkbox' name='gui_option[force_fontawesome]' value='1' " . checked(1, $current_gui_option_force_fontawesome, false) . " /></label>";
        $input .= __("FontAwesome Icon", $this->textdomain);
        printf($input);
    }

    /**
     * Option page callback (force_foundation_icon)
     * 
     * @return void
     * @see gui_admin_menu_option_init()
     * */
    public function gui_admin_menu_option_force_foundation_icon_callback()
    {
        if (isset($this->options["force_foundation_icon"]))
        {
            $current_gui_option_force_foundation_icon = esc_attr($this->options["force_foundation_icon"]);
        } else
        {
            $current_gui_option_force_foundation_icon = "";
        }
        $input = null;
        $input .= "<label class='gui gui-checkbox'><input class='gui' id='gui_option_force_foundation_icon' type='checkbox' name='gui_option[force_foundation_icon]' value='1' " . checked(1, $current_gui_option_force_foundation_icon, false) . " /></label>";
        $input .= __("Foundation Icon", $this->textdomain);
        printf($input);
    }

    /**
     * Display page option section
     * @access public
     * @return void
     * */
    public function gui_admin_menu_option_tinymce_info()
    {
        _e("Frontend editor setting as follow:", $this->textdomain);
    }

    /**
     * Display page option section
     * @access public
     * @return void
     * */
    public function gui_admin_menu_option_framework_info()
    {
        _e("Force template using framework as follow:", $this->textdomain);
    }

    /**
     * Loads the plugin's translated strings
     * @link http://codex.wordpress.org/Function_Reference/load_plugin_textdomain
     * @access public
     * @return void
     * */
    public function gui_textdomain()
    {
        load_plugin_textdomain($this->textdomain, false, GUI_DIR . "/languages");
    }

    /**
     * Install Plugin
     * 
     * @access public
     * @return void
     * */
    public static function gui_activation()
    {
        $default_option = array(
            'inline_editor' => '1',
            'menubar' => '1',
            'tinymce_url' => 'assets',
            'tinymce_url_custom' => '//cdn.tinymce.com/4/tinymce.min.js',
            'force_bootstrap' => '0',
            'force_foundation' => '0',
            'force_animatecss' => '0',
            'force_fontawesome' => '0',
            'force_foundation_icon' => '0',
            );

        update_option("gui_option", $default_option);
    }

    /**
     * Un-install Plugin
     * 
     * @access public
     * @return void
     * */
    public static function gui_deactivation()
    {
        delete_option("gui_option");
        delete_option("gui_addons");
        delete_option("gui_button_list");
        delete_option("gui_button_order");
        delete_option("gui_framework_available");
        delete_option("gui_framework_googlefont");
    }

    /**
     * Add admin bar (toolbar)
     * 
     * @access public
     * @return void
     * */
    public function gui_admin_bar()
    {
        global $wp_admin_bar;

        if (is_singular())
        {

            $link = get_site_url() . '?p=' . get_the_ID();

            if ($this->live_edit == true)
            {
                $wp_admin_bar->add_menu(array(
                    "id" => "gui_editor_on", //id
                    "title" => '<span class="ab-icon"></span><span class="ab-label"> GUI - ' . __("VisualEditor", $this->textdomain) . ' [ON]</span>', //title
                    "href" => $link, //href
                    "class" => "active",
                    ));
            } else
            {
                $wp_admin_bar->add_menu(array(
                    "id" => "gui_editor_off", //id
                    "title" => '<span class="ab-icon"></span><span class="ab-label"> GUI - ' . __("VisualEditor", $this->textdomain) . ' [OFF]</span>', //title
                    "href" => $link . '&edit=true', //href
                    "class" => "active",
                    ));
            }
        }

        #add link (root)
        $wp_admin_bar->add_menu(array(
            "id" => "gui_root_toolbar", //id
            "title" => __("GUI - VisualEditor", $this->textdomain), //title
            "href" => admin_url() . "options-general.php?page=gui_settings", //href
            ));


        #add link (sub)
        $wp_admin_bar->add_menu(array(
            "id" => "gui_settings_toolbar", //id
            "title" => __("Settings", $this->textdomain), //title
            "href" => admin_url() . "options-general.php?page=gui_settings", //href
            "parent" => "gui_root_toolbar" //parent
                ));


        #add link (sub)
        $wp_admin_bar->add_menu(array(
            "id" => "gui_editor_toolbar", //id
            "title" => __("Editor", $this->textdomain), //title
            "href" => admin_url() . "options-general.php?page=gui_settings", //href
            "parent" => "gui_settings_toolbar" //parent
                ));
        #add link (sub)
        $wp_admin_bar->add_menu(array(
            "id" => "gui_addons_toolbar", //id
            "title" => __("Add Ons", $this->textdomain), //title
            "href" => admin_url() . "options-general.php?page=gui_settings&sub=addons", //href
            "parent" => "gui_settings_toolbar" //parent
                ));
        #add link (sub)
        $wp_admin_bar->add_menu(array(
            "id" => "gui_toolbars_toolbar", //id
            "title" => __("Toolbars", $this->textdomain), //title
            "href" => admin_url() . "options-general.php?page=gui_settings&sub=toolbars", //href
            "parent" => "gui_settings_toolbar" //parent
                ));

        #add link (sub)
        $wp_admin_bar->add_menu(array(
            "id" => "gui_google_fonts_toolbar", //id
            "title" => __("Google Fonts", $this->textdomain), //title
            "href" => admin_url() . "options-general.php?page=gui_settings&sub=google-fonts", //href
            "parent" => "gui_settings_toolbar" //parent
                ));

        #add link (sub)
        $wp_admin_bar->add_menu(array(
            "id" => "gui_custom_css_toolbar", //id
            "title" => __("Custom CSS", $this->textdomain), //title
            "href" => admin_url() . "options-general.php?page=gui_settings&sub=custom-css", //href
            "parent" => "gui_settings_toolbar" //parent
                ));

        #add link (sub)
        $wp_admin_bar->add_menu(array(
            "id" => "gui_support_toolbar", //id
            "title" => __("Support", $this->textdomain), //title
            "href" => admin_url() . "options-general.php?page=gui_settings&sub=support", //href
            "parent" => "gui_root_toolbar" //parent
                ));

    }

    /**
     * register javascripts 
     * 
     * @link http://codex.wordpress.org/Function_Reference/wp_enqueue_script
     * @param object $hooks
     * @access public
     * @return void
     * */
    function gui_register_scripts($hooks)
    {
        if ($this->force_bootstrap == true)
        {
            wp_enqueue_script("bootstrap", GUI_URL . "assets/framework/bootstrap/js/bootstrap.min.js", array('jquery'), "3.3.6", true);
        }

        if ($this->force_foundation == true)
        {
            wp_enqueue_script("foundation", GUI_URL . "assets/framework/foundation/js/foundation.min.js", array('jquery'), "3.3.6", true);
        }

        if ($this->live_edit == true)
        {
            switch ($this->options["tinymce_url"])
            {
                case 'cdn':
                    $tinymce_url = '//cdn.tinymce.com/4/tinymce.min.js';
                    break;
                case 'assets':
                    $tinymce_url = GUI_URL . "assets/js/tinymce/tinymce.min.js";
                    break;
                case 'custom':
                    $tinymce_url = esc_attr($this->options["tinymce_url_custom"]);
                    break;
            }

            wp_enqueue_media();
            wp_enqueue_script("tinymce", $tinymce_url, array(), "4.3.2", true);
            wp_enqueue_script("gui_tinymce_setup", admin_url() . '/admin-ajax.php?action=tinymce_setup&' . time(), array('tinymce'), GUI_VERSION, true);
        }
    }

    /**
     * Insert javascripts for back-end
     * 
     * @link http://codex.wordpress.org/Function_Reference/wp_enqueue_script
     * @param object $hooks
     * @access public
     * @return void
     * */
    public function gui_admin_enqueue_scripts($hooks)
    {
        if (function_exists("get_current_screen"))
        {
            $screen = get_current_screen();
        } else
        {
            $screen = $hooks;
        }

        // register css
        wp_register_style("gui_metabox", GUI_URL . "assets/css/gui_admin_metabox.css", array());

        // limit page
        if ((in_array($hooks, array("gui_templates"))) || (in_array($screen->post_type, array("gui_templates"))))
        {
            wp_enqueue_style("gui_metabox");
        }


        // limit page only settings_page_gui_settings
        if ((in_array($hooks, array("settings_page_gui_settings"))) || (in_array($screen->post_type, array("settings_page_gui_settings"))))
        {
            wp_enqueue_script("codemirror", GUI_URL . "/assets/framework/codemirror/lib/codemirror.js", array("jquery"), "0.8.2", true);

            wp_enqueue_script("codemirror-addon-foldcode", GUI_URL . "/assets/framework/codemirror/addon/fold/foldcode.js", array("codemirror"), "0.8.2", true);
            wp_enqueue_script("codemirror-addon-foldgutter", GUI_URL . "/assets/framework/codemirror/addon/fold/foldgutter.js", array("codemirror"), "0.8.2", true);
            wp_enqueue_script("codemirror-addon-foldbrace", GUI_URL . "/assets/framework/codemirror/addon/fold/brace-fold.js", array("codemirror"), "0.8.2", true);

            wp_enqueue_script("codemirror-addon-show-hint", GUI_URL . "/assets/framework/codemirror/addon/hint/show-hint.js", array("codemirror"), "0.8.2", true);
            wp_enqueue_script("codemirror-addon-css-hint", GUI_URL . "/assets/framework/codemirror/addon/hint/css-hint.js", array("codemirror"), "0.8.2", true);

            wp_enqueue_script("codemirror-css", GUI_URL . "/assets/framework/codemirror/mode/css/css.js", array("codemirror"), "0.8.2", true);

            wp_enqueue_script("gui_option", GUI_URL . "/assets/js/gui_option.js", array(
                'jquery',
                'thickbox',
                'jquery-ui-sortable',
                'jquery-ui-draggable',
                'jquery-ui-droppable'), GUI_VERSION, true);
        }
    }

    /**
     * Insert CSS for back-end
     * 
     * @link http://codex.wordpress.org/Function_Reference/wp_register_style
     * @link http://codex.wordpress.org/Function_Reference/wp_enqueue_style
     * @param object $hooks
     * @access public
     * @return void
     * */
    public function gui_admin_enqueue_styles($hooks)
    {
        if (function_exists("get_current_screen"))
        {
            $screen = get_current_screen();
        } else
        {
            $screen = $hooks;
        }
        // register css
        wp_register_style("gui_option", GUI_URL . "assets/css/gui_option.css", array(), GUI_VERSION);
        wp_register_style("gui_mce_icon", GUI_URL . "assets/css/gui_mce_icon.css", array(), GUI_VERSION);
        wp_register_style("codemirror", GUI_URL . "/assets/framework/codemirror/lib/codemirror.css", array(), "5.6");
        wp_register_style("codemirror-foldgutter", GUI_URL . "/assets/framework/codemirror/addon/fold/foldgutter.css", array(), "5.6");
        wp_register_style("codemirror-show-hint", GUI_URL . "/assets/framework/codemirror/addon/hint/show-hint.css", array(), "5.6");


        //wp_register_style("googleapis",  "//fonts.googleapis.com/css?kit=h7PWjUsacOq1Kc5PAvtbRA", array());
        // limit page
        if ((in_array($hooks, array("settings_page_gui_settings"))) || (in_array($screen->post_type, array("settings_page_gui_settings"))))
        {
            wp_enqueue_style("gui_option");
            wp_enqueue_style("gui_mce_icon");
            wp_enqueue_style("codemirror");
            wp_enqueue_style("codemirror-foldgutter");
            wp_enqueue_style("codemirror-show-hint");

            // wp_enqueue_style("googleapis");
        }
    }

    /**
     * Insert CSS for front-end
     * 
     * @link http://codex.wordpress.org/Function_Reference/wp_register_style
     * @link http://codex.wordpress.org/Function_Reference/wp_enqueue_style
     * @param object $hooks
     * @access public
     * @return void
     * */
    public function gui_register_styles($hooks)
    {

        if ($this->force_bootstrap == true)
        {
            wp_register_style("bootstrap", GUI_URL . "assets/framework/bootstrap/css/bootstrap.min.css", array(), "3.3.6");
            wp_enqueue_style('bootstrap');
        }

        if ($this->force_foundation == true)
        {
            wp_register_style("foundation", GUI_URL . "assets/framework/foundation/css/foundation.min.css", array(), "6.0.0");
            wp_enqueue_style('foundation');
        }

        if ($this->force_foundation_icons == true)
        {
            wp_register_style("foundation-icons", GUI_URL . "assets/framework/foundation-icons/css/foundation-icons.min.css", array(), "6.0.0");
            wp_enqueue_style('foundation-icons');
        }

        if ($this->force_animatecss == true)
        {
            wp_register_style("animate", GUI_URL . "assets/framework/animate.css/animate.min.css", array(), "2015");
            wp_enqueue_style('animate');
        }

        if ($this->force_fontawesome == true)
        {
            wp_register_style("fontawesome", GUI_URL . "assets/framework/fontawesome/css/font-awesome.min.css", array(), "4.5.0");
            wp_enqueue_style('fontawesome');
        }

        $font_urls = $this->__build_url_googlefont();
        foreach ($font_urls as $font_url)
        {
            wp_register_style($font_url['name'], $font_url['url'], array(), GUI_VERSION);
            wp_enqueue_style($font_url['name']);
        }


        wp_register_style("gui_main", GUI_URL . "assets/css/gui_main.css", array(), GUI_VERSION);
        wp_enqueue_style('gui_main');
    }

    /**
     * GuiVisualEditor::__set_active_addons()
     * 
     * @param mixed $id
     * @return void
     */
    private function __set_deactive_addons($id)
    {
        $option = get_option("gui_addons");
        $new_option = $option;
        if (is_array($option['addons']))
        {
            $new_option_addons = $option['addons'];
        } else
        {
            $new_option_addons = array();
        }
        if (isset($new_option_addons[$id]))
        {
            unset($new_option_addons[$id]);
        }
        $new_option['addons'] = $new_option_addons;
        $update = update_option("gui_addons", $new_option);
        return $update;
    }

    /**
     * Set active add ons
     * 
     * @param mixed $id
     * @return void
     */
    private function __set_active_addons($id)
    {
        $option = get_option("gui_addons");
        $new_option = $option;

        if (is_array($option['addons']))
        {
            $new_option_addons = $option['addons'];
        } else
        {
            $new_option_addons = array();
        }
        $plugin_data = $this->__addons_info($id);
        $new_option_addons[$id] = json_encode($plugin_data);
        $new_option['addons'] = $new_option_addons;
        $update = update_option("gui_addons", $new_option);
        return $update;
    }

    /**
     * Create markup for top level admin menu
     * 
     * @access public
     * @return void
     * */
    public function _manage_addons()
    {
 
        wp_enqueue_style("thickbox");

        $frameworks = array();
        $framework_availables = json_decode(get_option("gui_framework_available"), true);
        if (is_array($framework_availables))
        {
            foreach ($framework_availables as $framework_available)
            {
                $name = $framework_available['name'];
                if ($name == 'Google Fonts')
                {
                    $name .= " (" . $this->__get_info_googlefont($framework_available['src']) . ")";
                }
                $frameworks[] = $name;
            }
        }


        $framework_html = implode(', ', $frameworks);


        $text = __('Your WordPress using the framework as follows: ', $this->textdomain);
        $text .= " " . $framework_html . ". ";
        $text .= __('Please enable the add-ons based on that framework. 
		We provide dozens of premium addons that can be added to this plugin, 
		We are very happy if you make a donation or buy additional add-ons.<br/>
		<a  class="button" target="_blank" href="https://codecanyon.net/item/gui-visual-editor-package-for-tinymce/14858024">Premium add-ons</a>
		', $this->textdomain);


        $this->message = array(
            'show' => true,
            'level' => 'error',
            'text' => $text);
        $this->__admin_notices();


        wp_cache_delete('alloptions', 'options');
        foreach (glob(GUI_PATH . "/add-ons/*/plugin.xml") as $filename)
        {
            $addons = $this->__xml_parser($filename);
            if (count($this->__get_addons_preferences($addons)) > 2)
            {
                $external_addons[] = $addons;
            }
        }
if (!isset($external_addons))
        {
            $external_addons = array();
        }
		
        if (!is_array($external_addons))
        {
            $external_addons = array();
        }

        $this->list_addons = array_merge($external_addons, $this->default_addons);


        $notice = null;
        if (isset($_GET['action']))
        {
            if (!isset($_GET['addons']))
            {
                $_GET['addons'] = '';
            }

            $new_addons = wp_slash($this->__string_to_variable($_GET['addons']));

            $option = get_option("gui_addons");
            $new_option = $option;

            if (is_array($option['addons']))
            {
                $new_option_addons = $option['addons'];
            } else
            {
                $new_option_addons = array();
            }

            if ($_GET['action'] == 'activate')
            {
                if (!in_array($new_addons, $new_option_addons))
                {
                    $update = $this->__set_active_addons($new_addons);

                    if ($update == true)
                    {
                        $this->message = array(
                            'show' => true,
                            'level' => 'updated',
                            'text' => __('Add ons successfully activated', $this->textdomain));
                        $this->__admin_notices();
                    } else
                    {

                        $this->message = array(
                            'show' => true,
                            'level' => 'update-nag',
                            'text' => __('Add ons failed activated', $this->textdomain));
                        $this->__admin_notices();
                    }
                }
            } elseif ($_GET['action'] == 'deactivate')
            {

                $update = $this->__set_deactive_addons($new_addons);

                if ($update == true)
                {
                    $this->message = array(
                        'show' => true,
                        'level' => 'updated',
                        'text' => __('Add ons successfully deactivated, this will cause some of the toolbar does not work, please check <strong>the toolbar menu</strong>.', $this->textdomain));
                    $this->__admin_notices();
                } else
                {

                    $this->message = array(
                        'show' => true,
                        'level' => 'update-nag',
                        'text' => __('Add ons failed deactivated', $this->textdomain));
                    $this->__admin_notices();
                }
            }
        }


        //bulk aktivation
        if (isset($_POST['action']))
        {
            if (isset($_POST['checked']))
            {
                if (is_array($_POST['checked']))
                {
                    $checkeds = $_POST['checked'];

                    switch ($_POST['action'])
                    {
                        case 'deactivate-selected':
                            $t = 0;
                            foreach ($checkeds as $checked)
                            {

                                $update = $this->__set_deactive_addons($checked);
                                if ($update == true)
                                {
                                    $t++;
                                }
                            }
                            $this->message = array(
                                'show' => true,
                                'level' => 'updated',
                                'text' => $t . ' ' . __('add ons successfully deactivated.', $this->textdomain));
                            $this->__admin_notices();
                            break;
                        case 'activate-selected':
                            $t = 0;
                            foreach ($checkeds as $checked)
                            {

                                $update = $this->__set_active_addons($checked);
                                if ($update == true)
                                {
                                    $t++;
                                }
                            }
                            $this->message = array(
                                'show' => true,
                                'level' => 'updated',
                                'text' => $t . ' ' . __('add ons successfully activated.', $this->textdomain));
                            $this->__admin_notices();
                            break;
                    }
                }
            }
        }

        foreach ($this->default_active_addons as $default_addons)
        {
            $update = $this->__set_active_addons($default_addons);
        }

        $this->gui_addons("all");
        if (!isset($_GET['addons_status']))
        {
            $_GET['addons_status'] = 'all';
        }

        $active_addons = $this->gui_addons("active");
        $inactive_addons = $this->gui_addons("inactive");
        $all_addons = $this->gui_addons("all");

        $class_active = '';
        $class_inactive = '';
        $class_all = '';
        $current_page = 'addons_status=all';

        switch ($_GET['addons_status'])
        {
            case 'all':
                $list_addons = $all_addons;
                $class_all = 'current';
                $current_page = 'addons_status=all';
                break;
            case 'active':
                $list_addons = $active_addons;
                $class_active = 'current';
                $current_page = 'addons_status=active';
                break;
            case 'inactive':
                $list_addons = $inactive_addons;
                $class_inactive = 'current';
                $current_page = 'addons_status=inactive';
                break;
            default:
                $list_addons = $all_addons;
                $class_all = 'current';
                $current_page = 'addons_status=all';
                break;
        }
        $_frameworks = array();
        foreach ($list_addons as $list_addon)
        {
            $pref = $this->__get_addons_preferences($list_addon);
            if (isset($pref['framework']))
            {
                $_frameworks[$pref['framework']] = array('label' => $pref['framework'], 'value' => $pref['framework']);
            }
        }

        if (file_exists(GUI_PATH . '/includes/class-addons-list-table.php'))
        {
            include_once GUI_PATH . '/includes/class-addons-list-table.php';
        }

        $AddOnsTable = new GUI_AddOns_List_Table($list_addons, $current_page);
        $AddOnsTable->prepare_items();


        $html_framework = '<div id="gui_filter_addons">';
        $html_framework .= '<label>' . __('Framework', $this->textdomain) . ' :</label> ';
        foreach ($_frameworks as $framework)
        {
            $html_framework .= '<label><input type="checkbox" checked="checked" class="gui_filter_addons" value="' . $framework['value'] . '"/>' . ucwords($framework['label']) . '</label> ';
        }
        $html_framework .= '</div>';
        echo $html_framework;
        echo '
<div>
<ul class="subsubsub">
	<li class="all"><a href="admin.php?page=gui_settings&sub=addons&addons_status=all" class="' . $class_all . '" >' . __("All", $this->textdomain) . ' <span class="count">(' . count($all_addons) . ')</span></a> |</li>
	<li class="active"><a href="admin.php?page=gui_settings&sub=addons&addons_status=active" class="' . $class_active . '">' . __("Active", $this->textdomain) . ' <span class="count">(' . count($active_addons) . ')</span></a> |</li>
	<li class="inactive"><a href="admin.php?page=gui_settings&sub=addons&addons_status=inactive" class="' . $class_inactive . '">' . __("Inactive", $this->textdomain) . ' <span class="count">(' . count($inactive_addons) . ')</span></a></li>
</ul>
</div>
';

        echo '<form method="post" action="admin.php?page=gui_settings&sub=addons" id="bulk-action-form">';
        $AddOnsTable->display();
        echo '</form> ';


    }

    /**
     * Markup for Google font
     * 
     * @return void
     */
    function _admin_google_fonts_markup()
    {

        if (isset($_POST['save']))
        {
            $google_fonts = array();
            if (isset($_POST['gui_google_fonts']))
            {
                if (is_array($_POST['gui_google_fonts']))
                {
                    foreach ($_POST['gui_google_fonts'] as $gui_google_font)
                    {
                        $google_fonts[md5($gui_google_font)] = html_entity_decode($gui_google_font);
                    }

                    update_option("gui_google_fonts", json_encode(array_values($google_fonts)));
                    $this->message = array(
                        'show' => true,
                        'level' => 'updated',
                        'text' => __('Fonts has been successfully updated.', $this->textdomain));
                    $this->__admin_notices();
                }
            } else
            {
                update_option("gui_google_fonts", json_encode(array()));
                $this->message = array(
                    'show' => true,
                    'level' => 'updated',
                    'text' => __('Fonts has been successfully updated.', $this->textdomain));
                $this->__admin_notices();
            }
        }

        $gui_google_fonts = json_decode(get_option('gui_google_fonts'), true);
        $list_google_font = null;

        if (!is_array($gui_google_fonts))
        {
            $gui_google_fonts = array();
        }
        foreach ($gui_google_fonts as $gui_google_font)
        {
            $gui_font = json_decode(wp_unslash($gui_google_font), true);
            $list_google_font .= '<li><input type="checkbox" class="gui_google_fonts" />' . $gui_font['name'] . '<input name="gui_google_fonts[]" type="hidden" value="' . htmlentities(wp_unslash($gui_google_font)) . '" /></li>';
        }


        foreach ($this->google_fonts as $google_fonts)
        {
            $category = $google_fonts['category'];
            $font_categories[$category] = $category;
        }
        echo '<form method="post" action="admin.php?page=gui_settings&sub=google-fonts" >';
        echo '<table id="gui-font" class="widefat">';
        echo '<thead>';
        echo '<tr>';
        echo '<th><label>' . __('Category', $this->textdomain) . '</label></th>';
        echo '<th><label>' . __('Available Fonts', $this->textdomain) . '</label></th>';
        echo '<th><label>' . __('Font Selected', $this->textdomain) . '</label></th>';
        echo '<th><label>' . __('Preview', $this->textdomain) . '</label></th>';
        echo '</tr>';
        echo '</thead>';
        echo '<tr>';
        echo '<td>';
        echo '<select size="20" id="gui-font-cat-list" class="widefat" >';
        echo '<option value="category">' . __('All', $this->textdomain) . '</option>';
        foreach ($font_categories as $category)
        {
            echo '<option value="' . str_replace(' ', '-', $category) . '">' . $category . '</option>';
        }
        echo '</select>';
        echo '</td>';
        echo '<td>';
        echo '<select size="20" id="gui-font-list" class="widefat">';
        foreach ($this->google_fonts as $google_fonts)
        {

            echo '<option  class="category ' . str_replace(' ', '-', $google_fonts['category']) . '" value="' . htmlentities(json_encode($google_fonts)) . '">' . $google_fonts['name'] . '</option>';
        }
        echo '</select>';
        echo '<p><input id="gui-font-choose" type="button" class="button button-default" value="' . __("Add", $this->textdomain) . ' &rarr; " /></p>';
        echo '</td>';

        echo '<td>';
        echo '<ul id="gui-font-selected" >';
        echo $list_google_font;
        echo '</ul>';
        echo '<p><input id="gui-font-remove" type="button" class="button button-default" value="' . __("Remove", $this->textdomain) . '" /> <input id="gui-font-clear" type="button" class="button button-default" value="' . __("Clear All", $this->textdomain) . '" /></p>';
        echo '</td>';

        echo '<td>';
        echo '<div id="gui-font-css-preview"></div>';

        echo '<dl class="gui-horizontal" id="gui-font-meta">';
        echo '<dt>' . __('Name', $this->textdomain) . '</dt> <dd id="gui-font-name">-</dd>';
        echo '<dt>' . __('Designer', $this->textdomain) . '</dt> <dd id="gui-font-designer">-</dd>';
        echo '<dt>' . __('License', $this->textdomain) . '</dt> <dd id="gui-font-license">-</dd>';
        echo '</dl>';
        echo '<div id="gui-font-preview">';
        echo '<h1>Simply Dummy Text</h1>';
        echo '<p><strong>Lorem Ipsum</strong> is <em>simply</em> dummy text of the <ins>printing</ins> and <s>typesetting</s> industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>';
        echo '<h1>abcdefghijklmnopqrtuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789</h1>';
        echo '<h2>abcdefghijklmnopqrtuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789</h2>';
        echo '<h3>abcdefghijklmnopqrtuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789</h3>';
        echo '<h4>abcdefghijklmnopqrtuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789</h4>';
        echo '</div>';
        echo '</td>';

        echo '</tr>';
        echo '</table>';
        echo '<p>' . __("Font used by the templates can not be deleted", $this->textdomain) . '</p>';
        echo '<p><input type="submit" class="button button-primary" name="save" value="' . __("Save Changes", $this->textdomain) . '" /></p>';

        echo '</form>';
    }

    /**
     * Custom CSS Markup 
     * 
     * @return string
     */
    function _admin_custom_css_markup()
    {
        if (isset($_POST['save']))
        {

            update_option("gui_costom_css", wp_slash($_POST['gui-custom-css']));
            $this->message = array(
                'show' => true,
                'level' => 'updated',
                'text' => __('Custom CSS has been successfully updated.', $this->textdomain));
            $this->__admin_notices();
        }
        $options = wp_unslash(wp_unslash(get_option('gui_costom_css')));

        $html = '
                <form method="post" action="options-general.php?page=gui_settings&sub=custom-css">
                    <p>' . __("You can add custom CSS to your templates blog using the CSS Editor bellow:", $this->textdomain) . '</p>
                    <textarea name="gui-custom-css" id="gui-custom-css" class="gui-custom-css" class="widefat">' . htmlentities($options) . '</textarea>
                    <p><input type="submit" class="button button-primary" name="save" value="' . __("Save Changes", $this->textdomain) . '" /></p>
                    <p>Press <kbd>ctrl+space</kbd> to activate autocompletion</p>
                </form>
                ';
        return $html;
    }

    /**
     * Manage Toolbar
     * 
     * @return void
     */
    function _manage_toolbar()
    {
        $html = '                
            <div class="addons-liquid-left">
                <div id="addonss-left">
                
                	<div id="available-addonss" class="addonss-holder-wrap">
                    
                		<div class="sidebar-name">
                			<div class="sidebar-name-arrow"><br /></div>
                			<h3>' . __('Editor toolbar available', $this->textdomain) . '<span id="removing-addons">' . __('Deactivate', $this->textdomain) . ' <span></span></span></h3>
                		</div>
                        
                		<div class="addons-holder">
                			<div class="sidebar-description">
                				<p class="description">' . __("To activate a editor toolbar drag it to a sidebar or click on it. To deactivate a toolbar editor and delete its settings, drag it back.", $this->textdomain) . '</p>
                			</div>
                			<div id="addons-list">
                				' . $this->__addons_available_list() . '
                			</div>
                			<br class="clear" />
                		</div>
                		<br class="clear" />    
                	</div>
                 </div>
            </div>
            
            <div class="addons-liquid-right">
                <div id="addonss-right">
                    <div class="sidebars-column-1">
                        <div class="addonss-holder-wrap widgets-holder-wrap" >  
                            <div id="first_area" class="addonss-sortables ui-droppable ui-sortable">		
                                
                                <div class="sidebar-name">
                                	<div class="sidebar-name-arrow"><br></div>
                                	<h3>' . __('The first line toolbar', $this->textdomain) . ' <span class="spinner"></span></h3>
                                </div>
                                <div class="sidebar-description">
                                    <p class="description">' . __('The toolbar area', $this->textdomain) . '</p>
                                </div>
                                ' . $this->__addons_usage_list("first_area") . '
                            </div>
                        </div>
                        
                        <div class="addonss-holder-wrap widgets-holder-wrap" >  
                            <div id="second_area" class="addonss-sortables ui-droppable ui-sortable">		
                                
                                <div class="sidebar-name">
                                	<div class="sidebar-name-arrow"><br></div>
                                	<h3>' . __('The second line toolbar', $this->textdomain) . ' <span class="spinner"></span></h3>
                                </div>
                                <div class="sidebar-description">
                                    <p class="description">' . __('The toolbar area', $this->textdomain) . '</p>
                                </div>
                                ' . $this->__addons_usage_list("second_area") . '
                            </div>
                        </div>
                         
                    </div>
            
                <div class="sidebars-column-2">     
                  
                        <div class="addonss-holder-wrap widgets-holder-wrap" >  
                            <div id="third_area" class="addonss-sortables ui-droppable ui-sortable">		
                                <div class="sidebar-name">
                                	<div class="sidebar-name-arrow"><br></div>
                                	<h3>' . __('The third line toolbar', $this->textdomain) . ' <span class="spinner"></span></h3>
                                </div>
                                <div class="sidebar-description">
                                    <p class="description">' . __('The toolbar area', $this->textdomain) . '</p>
                                </div>
                                ' . $this->__addons_usage_list("third_area") . '
                            </div>
                        </div>
                        
                        <div class="addonss-holder-wrap widgets-holder-wrap" >  
                            <div id="fourth_area" class="addonss-sortables ui-droppable ui-sortable">		
                                
                                <div class="sidebar-name">
                                	<div class="sidebar-name-arrow"><br></div>
                                	<h3>' . __('The fourth line toolbar', $this->textdomain) . ' <span class="spinner"></span></h3>
                                </div>
                                <div class="sidebar-description">
                                    <p class="description">' . __('The toolbar area', $this->textdomain) . '</p>
                                </div>
                              ' . $this->__addons_usage_list("fourth_area") . '  
                            </div>
                        </div>
                        
                </div>
            </div>
        </div>

        <div class="addonss-chooser">
        	<ul class="addonss-chooser-sidebars"></ul>
        	<div class="addonss-chooser-actions">
        		<button class="button-secondary">' . __('Cancel') . '</button>
        		<button class="button-primary">' . __('Add addons') . '</button>
        	</div>
        </div>';
        return $html;
    }

    /**
     * Get reguest data from Ajax
     *
     * @access public
     * @return void
     *
     * */
    public function gui_ajax_addons_save()
    {
        $button = json_decode(get_option("gui_button_list"), true);
        if (!is_array($button))
        {
            $button = array();
        }

        $key = sanitize_text_field(wp_unslash($_POST['addons-id']));
        $addons_id = sanitize_text_field(wp_unslash($_POST['addons-idbase']));
        $addons_button = sanitize_text_field(wp_unslash($_POST['addons-button']));
        $addons_default = sanitize_text_field(wp_unslash($_POST['addons-default']));
        $addons_title = sanitize_text_field(wp_unslash($_POST['addons-title']));
        $addons_desc = sanitize_text_field(wp_unslash($_POST['addons-description']));

        $button[$key]['id'] = $key;
        $button[$key]['idbase'] = $addons_id;
        $button[$key]['button'] = $addons_button;
        $button[$key]['default'] = $addons_default;
        $button[$key]['description'] = $addons_desc;
        $button[$key]['title'] = $addons_title;

        update_option("gui_button_list", json_encode($button));

        $new_button = json_decode(get_option("gui_button_list"), true);
        $html = '
        
        <div class="addons-content widget-content">
			<p>
				<label>' . __("Code", $this->textdomain) . '</label>
				<textarea class="widefat addons-button" name="addons-button" >' . esc_attr($new_button[$key]['button']) . '</textarea>
            </p>                      
         </div>

        ';

        echo $html;
        die();
    }

    /**
     * GuiVisualEditor::gui_ajax_save_post()
     * 
     * @return
     */
    function gui_ajax_save_post()
    {

        $postID = intval($_POST["post_id"]);
        if (empty($postID))
        {
            return false;
        }
        if (!current_user_can('edit_post', $postID))
        {
            return false;
        }

        $post_update = wp_update_post(array("ID" => $postID, "post_content" => $_POST["post_content"]));
        echo '1';
        die($post_update);
    }

    /**
     * Get reguest data from Ajax
     *
     * @access public
     * @return void
     *
     * */
    public function gui_ajax_addons_order()
    {
        $postdata = array();
        foreach ($_POST['sidebars'] as $key => $val)
        {
            $postdata[sanitize_text_field(wp_unslash($key))] = sanitize_text_field(wp_unslash($val));
        }
        update_option("gui_button_order", json_encode($postdata));

        $addons_used = array();
        foreach ($postdata as $data)
        {
            foreach (explode(',', $data) as $addons)
            {
                if (!empty($addons))
                {
                    $addons_used[] = trim($addons);
                }
            }
        }
        $new_button = array();
        $cur_button = json_decode(get_option("gui_button_list"), true);
        foreach (array_keys($cur_button) as $key)
        {
            if (in_array($key, $addons_used))
            {
                $new_button[$key] = $cur_button[$key];
            }
        }
        update_option("gui_button_list", json_encode($new_button));
        die(); //required
    }

    /**
     * Create array from xml data
     * 
     * @access public
     * @return void
     * */
    private function __xml_parser($file)
    {
        $xml = array();
        if (file_exists($file))
        {
            $xml = json_decode(json_encode(simplexml_load_file($file)), true);
        } else
        {
            $xml = array();
        }
        return $xml;
    }

    /**
     * Get All framework support
     * 
     * @return void
     */
    function __refresh_framework_supported()
    {
        $css_registered = $css_supported = $font_family = array();
        global $wp_styles;
        if (isset($wp_styles->registered))
        {
            foreach ($wp_styles->registered as $css)
            {
                if (!isset($css->extra['conditional']))
                {
                    $css_registered[] = $css->src;
                }
            }
        }
        $css = null;

        $z = 0;
        foreach ($this->framework_list as $framework)
        {
            foreach ($css_registered as $css)
            {


                $pattern = "/" . $framework['pattern'] . "/i";
                if (preg_match($pattern, $css))
                {
                    $css_supported[$z]['name'] = $framework['name'];
                    $css_supported[$z]['src'] = $css;

                    if ($this->__get_info_googlefont($css) != null)
                    {
                        $font_family[] = $this->__get_info_googlefont($css);
                    }

                    $z++;
                }
            }
        }
        $z = 0;
        foreach ($css_registered as $css)
        {

            if (preg_match("/wp-content\/themes/i", $css))
            {

                $css_themes[$z]['name'] = md5($css);
                $css_themes[$z]['src'] = $css;

                $z++;
            }
        }


        $googlefont = array_unique($font_family);

        update_option("gui_framework_googlefont", json_encode($googlefont));
        update_option("gui_framework_available", json_encode($css_supported));
        update_option("gui_css_themes", json_encode($css_themes));
    }

    /**
     * Retrieved data
     *
     * @access public
     * @param mixed $content
     * @return void
     * @link https://codex.wordpress.org/Plugin_API/Filter_Reference/the_content
     * */
    public function gui_the_content($content)
    {
        global $post;

        $this->__refresh_framework_supported();

        $new_content = null;
        if ($this->live_edit == true)
        {
            remove_all_shortcodes();
            $new_content .= '
            <form>
            <input type="hidden" id="gui-content" name="gui-content" value="' . $post->ID . '" />
            <div id="gui-editable">' . $content . '</div>
            </form>
            ';
        } else
        {
            $new_content .= $content;
        }
        return $new_content;
    }

    /**
     * TinyMCE Setup Toolbar
     * 
     * @return
     */
    function __setup_tinymce_toobar($var)
    {
        $menubar = array();
        $buttons_list = json_decode(get_option("gui_button_list"), true);
        if (!is_array($buttons_list))
        {
            $buttons_list = array();
        }

        $buttons_order = json_decode(get_option("gui_button_order"), true);
        if (!is_array($buttons_order))
        {
            $buttons_order = array();
        }


        if (isset($buttons_order[$var]))
        {
            foreach (explode(',', $buttons_order[$var]) as $addons)
            {
                if (!empty($addons))
                {
                    $addons_used = trim($addons);
                    if (isset($buttons_list[$addons_used]))
                    {

                        if (isset($buttons_list[$addons_used]['button']))
                        {
                            $menubar[] = $buttons_list[$addons_used]['button'];
                        }
                    }
                }
            }
        }

        return $menubar;
    }

    /**
     * Get google font info
     * 
     * @param mixed $url
     * @return
     */
    private function __get_info_googlefont($url)
    {
        parse_str(parse_url($url, PHP_URL_QUERY), $output);
        if (count($output) != 0)
        {
            if (isset($output['family']))
            {
                $family = explode(':', $output['family']);
            }
            return $family[0];
        } else
        {
            return null;
        }
    }

    /**
     * GuiVisualEditor::__build_url_googlefont()
     * 
     * @return string
     */
    function __build_url_googlefont()
    {
        $_fontfamily = array();
        $gui_google_fonts = json_decode(get_option('gui_google_fonts'), true);
        if (is_array($gui_google_fonts))
        {
            $_fontfamily = array();
            foreach ($gui_google_fonts as $gui_google_font)
            {
                $gui_font = json_decode(wp_unslash($gui_google_font), true);
                $_fontfamily[] = array('name' => $this->__string_to_variable($gui_font['name']), 'url' => 'https://fonts.googleapis.com/css?family=' . str_replace(' ', '+', $gui_font['name']));
            }
        }
        return $_fontfamily;
    }

    /**
     * Insert Dinamic JS
     * @param object $hooks
     * @access public
     * @return void
     * */
    public function gui_ajax_tinymce_setup()
    {
        header("Content-type: text/javascript");


        $tinymce_content_css = $tinymce_fontfamily = $list_css = '';

        $tinymce_option = null;
        $ready_default = array();
        $plugin_tinymce = $tinymce_css = $ext_plugin = $tinymce_font = array();

        //include css
        $framework_availables = json_decode(get_option("gui_framework_available"), true);

        if (is_array($framework_availables))
        {
            foreach ($framework_availables as $framework_available)
            {

                $url_css = str_replace(array("http://", "https://"), "//", $framework_available['src']); // remove http/https
                $url_css = str_replace(",", "%2c", $url_css); //tinymce use coma as separator so we must avoid using coma.
                $tinymce_css[] = '"' . $url_css . '"';
                if ($framework_available['name'] != 'Google Fonts')
                {
                    $list_css .= "\r\n\t\t" . 'gui_' . $this->__string_to_variable($framework_available['name']) . '_url ' . "\t" . '= "' . $url_css . '";';
                }
            }
        }

        $gui_css_themes = json_decode(get_option("gui_css_themes"), true);
        foreach ($gui_css_themes as $gui_css_theme)
        {
            $url_css = str_replace(array("http://", "https://"), "//", $gui_css_theme['src']); // remove http/https
            $url_css = str_replace(",", "%2c", $url_css); //tinymce use coma as separator so we must avoid using coma.

            $tinymce_css[] = '"' . $url_css . '"';
        }
        $tinymce_css = array_unique($tinymce_css);


        if (is_array($tinymce_css))
        {
            $tinymce_content_css .= "\r\n\t\t\t\t" . 'gui_css: [';
            $tinymce_content_css .= "\r\n\t\t\t\t\t\t\t" . implode(",\r\n\t\t\t\t\t\t\t", $tinymce_css);
            $tinymce_content_css .= "\r\n\t\t\t\t" . '],';
        }
        //include fontfamily
        $framework_googlefonts = json_decode(get_option("gui_framework_googlefont"), true);
        if (is_array($framework_googlefonts))
        {
            foreach ($framework_googlefonts as $framework_googlefont)
            {
                $tinymce_font[] = $framework_googlefont . "='" . $framework_googlefont . "';";
            }
        }

        if (is_array($tinymce_css))
        {
            $tinymce_fontfamily .= "\r\n\t\t\t\t" . 'font_formats:';
            $tinymce_fontfamily .= "\r\n\t\t\t\t\t\t" . '"' . implode("\" + \r\n\t\t\t\t\t\t\"", $tinymce_font) . '",';
        }

        //include plugin
        $option = get_option("gui_addons");
        foreach ($option['addons'] as $addons)
        {
            $plugin_data = json_decode($addons, true);

            $plugin_tinymce = $this->__get_addons_preferences($plugin_data);

            if (isset($plugin_tinymce['id']))
            {
                if (isset($plugin_tinymce['framework']))
                {
                    $var_css_list[md5($plugin_tinymce['framework'])] = 'gui_' . $plugin_tinymce['framework'] . '_url';
                }
                if (!isset($plugin_data['default']))
                {
                    $plugin_data['default'] = false;
                }

                if ($plugin_data['default'] == false)
                {
                    if (preg_match("/http/", $plugin_tinymce['path']))
                    {
                        $ext_plugin[] = "\r\n\t\t\t\t\t\t\t" . '"' . $plugin_tinymce['id'] . '":"' . $plugin_tinymce['path'] . '"';
                    } else
                    {
                        $ext_plugin[] = "\r\n\t\t\t\t\t\t\t" . '"' . $plugin_tinymce['id'] . '":"' . GUI_URL . '/' . $plugin_tinymce['path'] . '"';
                    }
                } else
                {
                    if ($plugin_tinymce['id'] != "core")
                    {
                        $ready_default[] = $plugin_tinymce['id'];
                    }
                }
            }

            $basic_param = array(
                "menu",
                "id",
                "button",
                "path",
                "framework",
                "license");
            foreach (array_keys($plugin_tinymce) as $key)
            {
                if (!in_array($key, $basic_param))
                {
                    if ($key != 'gui_css')
                    {
                        $tinymce_option .= "\r\n\t\t\t\t\t" . $key . ':{toolbar_text:true,css:{exist:true}},';
                    }
                }
            }
        }

        //external plugin
        $external_plugins = "\r\n\t\t\t\t" . 'external_plugins: {' . implode(",", $ext_plugin) . "\r\n\t\t\t\t" . '},';


        $menubar = 'menubar:false,';
        if (isset($this->options["menubar"]))
        {
            if ($this->options["menubar"] == true)
            {
                $menubar = 'menubar:true,';
            }
        }

        $inline = 'inline:false,';
        if (isset($this->options["inline_editor"]))
        {
            if ($this->options["inline_editor"] == true)
            {
                $inline = 'inline:true,';
            }
        }

        //toolbar
        $toolbar1 = $toolbar2 = $toolbar3 = $toolbar4 = null;
        if (count($this->__setup_tinymce_toobar('first_area')) != 0)
        {
            $toolbar1 = 'toolbar1: "save ' . implode(' ', $this->__setup_tinymce_toobar('first_area')) . '",';
        } else
        {
            $toolbar1 = 'toolbar1: "save | undo redo | styleselect fontselect fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | image link table",';
        }

        if (count($this->__setup_tinymce_toobar('second_area')) != 0)
        {
            $toolbar2 = 'toolbar2: "' . implode(' ', $this->__setup_tinymce_toobar('second_area')) . '",';
        }

        if (count($this->__setup_tinymce_toobar('third_area')) != 0)
        {
            $toolbar3 = 'toolbar3: "' . implode(' ', $this->__setup_tinymce_toobar('third_area')) . '",';
        }

        if (count($this->__setup_tinymce_toobar('fourth_area')) != 0)
        {
            $toolbar4 = 'toolbar4: "' . implode(' ', $this->__setup_tinymce_toobar('fourth_area')) . '",';
        }

        if (!is_array($var_css_list))
        {
            $var_css_list = array('gui_default_url');
        }
        // Set alway active plugin
        foreach ($this->default_active_addons as $active_addons)
        {
            if ($active_addons != 'core')
            {
                $alway_active_addons[] = $active_addons;
            }
        }

        $default_active_plugins = implode(' ', $alway_active_addons);

        $save_code = 'tinymce.activeEditor.windowManager.alert("' . __('You are not allowed to edit this pages', $this->textdomain) . '");';


        if (is_admin())
        {
            $save_code = '
                    var gui_content =  editor.getContent();
                    var gui_postid =  $("#gui-content").val();
                    $.ajax({
                        type    : "POST",
                        cache   : false,
                        url     : "' . admin_url() . '/admin-ajax.php?action=save_post",
                        data    : {post_content:gui_content,post_id:gui_postid},
                        success : function(result){
                                if(result == "0"){ 
                                    tinymce.activeEditor.windowManager.alert("' . __('You are not allowed to edit this pages', $this->textdomain) . '");
                                }else{
                                    tinymce.activeEditor.windowManager.alert("' . __('This page has been successfully saved', $this->textdomain) . '");
                                }
                        }
                    });
            ';
        }
        $posts_args = array(
            "posts_per_page" => 0,
            "post_status" => "publish",
            "post_type" => "gui_templates",
            );

        $setup_templates = 'templates : [' . "\r\n";
        $_gui_templates = get_posts($posts_args);
        foreach ($_gui_templates as $_gui_templates)
        {
            $post_meta_description = get_post_meta($_gui_templates->ID, "_gui_postmeta_description", true);
            $setup_templates .= "\t\t\t\t\t" . '{"title": "' . esc_html($_gui_templates->post_title) . '", "description": "' . esc_html($post_meta_description) . '", "url": "' . admin_url() . '/admin-ajax.php?action=tinymce_templates&page_id=' . esc_html($_gui_templates->ID) . '"},' . "\r\n";
        }
        $setup_templates .= "\t\t\t\t" . '],';


        echo '(function($){
        var ' . implode(',', $var_css_list) . '="";
        
        ' . $list_css . '
        
        tinymce.init({
                selector:"#gui-editable",
                theme: "modern",
                ' . $setup_templates . '
                skin: "galau_ui",
                ' . $menubar . '
                ' . $inline . '
                plugins :"' . $default_active_plugins . ' ' . implode(',', $ready_default) . '",
                ' . $tinymce_content_css . '
                ' . $external_plugins . '
                ' . $tinymce_fontfamily . '
                add_unload_trigger: false,
                ' . $toolbar1 . '
                ' . $toolbar2 . '
          		' . $toolbar3 . '
                ' . $toolbar4 . '
                
                save_onsavecallback: function(editor){ 
                    ' . $save_code . '
                },
                save_oncancelcallback: function(){ 
                    console.log("Save canceled"); 
                },
        		pagebreak_separator: "<!-- more -->",
                file_browser_callback: function(field_name, url, type, win) {
                    if(gui_media_upload) {
                      gui_media_upload.open();
                      return;
                    }
                    
                    var gui_media_upload = wp.media({
                      id        : "gui_visualeditor_media",   
                      title     : "Select or Upload Media Of Your Chosen Persuasion",
                      button    : {text:"Use this media"},
                      multiple  : false
                    });
                    
                    gui_media_upload.on("select",function(){
                        var attachment = gui_media_upload.state().get("selection").first().toJSON();
                        var url = attachment.url ;
                        win.document.getElementById(field_name).value = url;
                    });
                    
                    gui_media_upload.open();
            		return false;
            	},  
                contextmenu: "gui_advtoolbars gui_bs_quicktags gui_fi_quicktags gui_bs_visualblocks gui_bs_glyphicons gui_dashicons gui_fontawesome | link image inserttable | cell row column deletetable",
                ' . $tinymce_option . '
                
                         
            });  
            
})(jQuery); 
            ';

        die();
    }

    /**
     * Convert string to variable
     * 
     * @param mixed $string
     * @return
     */
    private function __string_to_variable($string)
    {
        $char = 'abcdefghijklmnopqrstuvwxyz_12345678900';
        $Allow = null;
        $string = str_replace(array(
            ' ',
            '-',
            '__'), '_', strtolower($string));
        $string = str_replace(array('___', '__'), '_', strtolower($string));
        for ($i = 0; $i < strlen($string); $i++)
        {
            if (strstr($char, $string[$i]) != false)
            {
                $Allow .= $string[$i];
            }
        }
        return $Allow;
    }

    /**
     * Generate code for admin notice
     * 
     * @return
     */
    private function __admin_notices()
    {
        if ($this->message['show'] == true)
        {
            echo '<div class="' . $this->message['level'] . ' notice is-dismissible"><p>' . $this->message['text'] . '</p></div>';
        }
    }

    /**
     * Get list Adds Ons
     * 
     * @param string $type
     * @return void
     */
    private function gui_addons($type = "all")
    {
        $all_addons = $active_addons = $inactive_addons = array();
        $option = get_option("gui_addons");
        foreach ($this->list_addons as $addons)
        {
            $old_addons = $addons;
            if (isset($option['addons']))
            {
                $addons_preferences = $this->__get_addons_preferences($addons);
                $addons_id = $addons_preferences['id'];

                if (isset($option['addons'][$addons_id]))
                {
                    $old_addons['active'] = true;
                    $active_addons[] = $old_addons;
                } else
                {
                    $old_addons['active'] = false;
                    $inactive_addons[] = $old_addons;
                }
            }
            $all_addons[] = $old_addons;
        }

        //update_option("gui_addons",'');

        switch ($type)
        {
            case "all":
                return $all_addons;
                break;
            case "active":
                return $active_addons;
                break;
            case "inactive":
                return $inactive_addons;
                break;
        }
    }

    /**
     * Get addons preferences
     * 
     * @param mixed $plugin_data
     * @return void
     */
    private function __get_addons_preferences($plugin_data)
    {
        $plugin_tinymce = array();
        if (isset($plugin_data['preferences']['preference']))
        {
            foreach ($plugin_data['preferences']['preference'] as $preference)
            {
                if (isset($preference['@attributes']))
                {
                    if (isset($preference['@attributes']['name']))
                    {
                        $key = $preference['@attributes']['name'];
                    }
                    if (isset($preference['@attributes']['value']))
                    {
                        $value = $preference['@attributes']['value'];
                    }
                    $plugin_tinymce[$key] = $value;
                }
            }
        }


        return $plugin_tinymce;
    }

    /**
     * Get addons info
     * 
     * @param mixed $id
     * @return void
     */
    private function __addons_info($id)
    {
        $new_addons = array();
        foreach ($this->list_addons as $addons)
        {
            $addons_preferences = $this->__get_addons_preferences($addons);
            $current_id = $addons_preferences['id'];
            $new_addons[$current_id] = $addons;
        }
        if (isset($new_addons[$id]))
        {
            return $new_addons[$id];
        } else
        {
            return null;
        }
    }

    function gui_ajax_tinymce_templates()
    {
        $postID = (int)($_GET['page_id']);
        // get current post
        $post = get_post($postID);

        $post_title = $post->post_title;


        // get post meta
        $post_meta_description = get_post_meta($postID, "_gui_postmeta_description", true);
        $post_meta_html = get_post_meta($postID, "_gui_postmeta_html", true);
        $post_meta_css = get_post_meta($postID, "_gui_postmeta_css", true);
        $post_meta_js = get_post_meta($postID, "_gui_postmeta_js", true);

        echo $post_meta_html;


        die();
    }

    function gui_ajax_tinymce_preview()
    {

        switch ($this->options["tinymce_url"])
        {
            case 'cdn':
                $tinymce_url = '//cdn.tinymce.com/4/tinymce.min.js';
                break;
            case 'assets':
                $tinymce_url = GUI_URL . "assets/js/tinymce/tinymce.min.js";
                break;
            case 'custom':
                $tinymce_url = esc_attr($this->options["tinymce_url_custom"]);
                break;
        }

        $plugin_active = 'plugins:"contextmenu link table imagetools",';
        $selected_addons = esc_attr($_GET['addons']);

        foreach ($this->default_addons as $default_addons)
        {
            $data = $this->__get_addons_preferences($default_addons);
            $_addons[$data['id']] = $default_addons;
        }

        if (isset($_addons[$selected_addons]))
        {

            $addons = $_addons[$selected_addons];
            $plugin = $this->__get_addons_preferences($_addons[$selected_addons]);
            if (!isset($plugin['menu']))
            {
                $plugin['menu'] = '';
            }
            $plugin_active = 'plugins:"contextmenu link table imagetools ' . $selected_addons . '",toolbar1: "' . $plugin['button'] . '",context: "' . $plugin['menu'] . '"';
        } else
        {

            $filename = GUI_PATH . '/add-ons/' . $selected_addons . '/plugin.xml';
            if (file_exists($filename))
            {
                $addons = $this->__xml_parser($filename);
                if (count($this->__get_addons_preferences($addons)) > 2)
                {

                    $plugin = $this->__get_addons_preferences($addons);
                    if (!isset($plugin['menu']))
                    {
                        $plugin['menu'] = '';
                    }
                    $plugin_active = 'plugins:"image contextmenu link table imagetools",external_plugins:{"' . $plugin['id'] . '":"' . GUI_URL . $plugin['path'] . '"},toolbar1: "' . $plugin['button'] . '",context: "' . $plugin['menu'] . '"';
                }
            }
        }


        echo '<!DOCTYPE html>';
        echo '<html lang="en">';
        echo '<head>';
        echo '<title>' . $addons['name'] . '</title>';
        echo '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">';
        echo '</head>';
        echo '<body>';
        echo '<div  class="margin:15px;" id="myEditor"><h4>Lorem Ipsum is simply dummy</h4><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></div>';
        echo '<script src="' . $tinymce_url . '"></script>';
        echo '<script>tinymce.init({selector: "#myEditor", theme:"modern",skin:"galau_ui",inline:true,' . $plugin_active . '});</script>';
        echo '</body>';
        echo '</html>';

        die();
    }

}

new GuiVisualEditor();
register_activation_hook(__file__, array("GuiVisualEditor", "gui_activation"));
register_deactivation_hook(__file__, array("GuiVisualEditor", "gui_deactivation"));
