<?php

if (!class_exists('WP_List_Table'))
    require_once (ABSPATH . 'wp-admin/includes/class-wp-list-table.php');


class GUI_AddOns_List_Table extends WP_List_Table
{

    var $textdomain = GUI_TEXTDOMAIN;
    var $total_items;
    var $per_page = 10;
    var $all_items;
    var $current_status;

    /**
     * GUI_Templates_List_Table::__construct()
     * 
     * @return void
     */
    public function __construct($list_addons, $current_status)
    {

        parent::__construct(array(
            'singular' => 'template',
            'plural' => 'templates',
            'ajax' => false,
            ));
        $this->all_items = $list_addons;
        $this->current_status = $current_status;
        $this->total_items = count($list_addons);
    }


    /**
     * GUI_Templates_List_Table::prepare_items()
     * 
     * @return void
     */
    function prepare_items()
    {
        $columns = $this->get_columns();
        $hidden = array();
        $sortable = array();
        $this->_column_headers = array(
            $columns,
            $hidden,
            $sortable);

        /** Process our bulk actions here */
        $this->process_bulk_actions();

        /** Store all */
        $this->items = $this->items_data();

        $this->set_pagination_args(array(
            'total_items' => $this->total_items,
            'per_page' => $this->per_page,
            ));

    }


    /**
     * GUI_Templates_List_Table::get_columns()
     * 
     * @return
     */
    public function get_columns()
    {

        $columns = array(
            'cb' => '<input type="checkbox" />',
            'name' => __('Name', $this->texdomain),
            'description' => __('Description', $this->texdomain),
            'license' => __('License', $this->texdomain),
            );

        return $columns;

    }
    /**
     * GUI_Templates_List_Table::templates_data()
     * 
     * @return
     */
    protected function items_data()
    {
        $page = $this->get_pagenum();
        $items = array_values($this->all_items);
        $start = ($page - 1) * $this->per_page;

        $new_items = array_slice($items, $start, $this->per_page);

        return $new_items;
    }


    public function display_rows()
    {
        foreach ($this->items as $item_id => $item_data)
            $this->single_row(array($item_id, $item_data));
    }
    /**
     * @return array
     */
    protected function get_table_classes()
    {
        return array('plugins widefat', $this->_args['plural']);
    }

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


    public function single_row($item)
    {
        list($item_id, $item_data) = $item;
        $is_active = $item_data['active'];
        $class = $is_active ? 'active' : 'inactive';

        $addons_id = $this->__get_addons_preferences($item_data);

        $checkbox_id = "checkbox_" . $addons_id['id'];
        $addons_prefix = $addons_id['id'];
        $addons_name = $item_data['name'];
        $addons_framework = '&nbsp;';
        if (!isset($addons_id['framework']))
        {
            $addons_id['framework'] = 'default';
        }

        $class_framework = str_replace(array(
            '-',
            '.',
            ' '), '_', $addons_id['framework']);

        $checkbox = "<label class='screen-reader-text' for='" . $checkbox_id . "' >" . sprintf(__('Select %s'), $item_data['name']) . "</label>" . "<input type='checkbox' name='checked[]' value='" . esc_attr($addons_prefix) . "' id='" . $checkbox_id . "' />";

        if ($is_active == "active")
        {
            $active_url = "admin.php?page=gui_settings&sub=addons&" . $this->current_status . "&action=deactivate&addons=" . $addons_prefix;
            $active_text = __('Deactive', $this->textdomain);
        } else
        {
            $active_url = "admin.php?page=gui_settings&sub=addons&" . $this->current_status . "&action=activate&addons=" . $addons_prefix;
            $active_text = __('Active', $this->textdomain);
        }
        $plugin_files = GUI_DIR . '/add-ons/' . $addons_prefix . '/plugin.min.js';
        $edit_url = 'plugin-editor.php?file=' . $plugin_files . '&plugin=' . $plugin_files;

        $actions = array('active' => sprintf('<a href="%1$s" title="%2$s %3$s">%4$s</a>', $active_url, $active_text, $item_data['name'], $active_text), 'edit' => sprintf('<a href="%1$s" title="%2$s %3$s">%4$s</a>', $edit_url, __('Edit', $this->textdomain), $item_data['name'], __('Edit', $this->textdomain)));

        $item_author = '<a href="' . $item_data['authorURL'] . '">' . $item_data['author'] . '</a>';
        $item_preview = '<a href="admin-ajax.php?action=tinymce_preview&addons=' . $addons_prefix . '&TB_iframe=true" class="thickbox">' . __('Preview', $this->textdomain) . '</a>';

        $plugin_actions[] = sprintf(__('Version %s'), $item_data['version']);
        $plugin_actions[] = sprintf(__('By %s'), $item_author);
        $plugin_actions[] = sprintf(__('%s'), $item_preview);


        printf("<tr id='%s' class='%s' data-slug='%s'>", $addons_prefix, $class . ' row-' . $class_framework, $addons_prefix);

        list($columns, $hidden, $sortable, $primary) = $this->get_column_info();
        foreach ($columns as $column_name => $column_display_name)
        {
            switch ($column_name)
            {
                case 'cb':
                    echo "<th scope='row' class='check-column'>" . $checkbox . "</th>";
                    break;
                case 'name':
                    echo "<td class='plugin-title column-primary'>";
                    echo "<strong>" . $item_data['name'] . "<strong>";
                    echo $this->row_actions($actions);
                    echo "</td>";
                    break;
                case 'description':

                    echo "
                    <td class='column-description desc'>
						<div class='plugin-description'>" . $item_data['description'] . "</div>
						<div class='" . $class . " second plugin-version-author-uri'>" . implode(' | ', $plugin_actions) . '</div>
                    </td>';

                    break;
                case 'license':
                    echo "<td>";
                    echo ucwords($item_data['license']);
                    echo "</td>";
                    break;
            }
        }
        echo "</tr>";

    }

    protected function get_primary_column_name()
    {
        return 'name';
    }


    /**
     * GUI_Templates_List_Table::get_bulk_actions()
     * 
     * @return
     */
    public function get_bulk_actions()
    {
        $actions = array(
            'gui-addons-bulk-active' => __('Active', $this->texdomain),
            'gui-addons-bulk-deactive' => __('Deactive', $this->texdomain),
            );

        return $actions;
    }
    /**
     * GUI_Templates_List_Table::process_bulk_actions()
     * 
     * @return void
     */
    public function process_bulk_actions()
    {
    }
}

?>