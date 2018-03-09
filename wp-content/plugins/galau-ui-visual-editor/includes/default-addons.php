<?php

/**
 * @author JasmanXcrew <jasman@ihsana.com>
 * @copyright Ihsana IT Solutiom 2016
 * @license Commercial License
 * 
 * @package gui-visual-editor
 */

$default_addons[] = array(
    "name" => "Format Controls",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => "TinyMCE format controls",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "core",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            array("@attributes" => array(
                    "name" => "button",
                    //remove selectall, visualaid,
                    "value" => "cancel bold italic underline strikethrough subscript superscript outdent indent cut copy paste removeformat remove newdocument blockquote numlist bullist subscript superscript alignleft aligncenter alignright alignjustify alignnone undo redo styleselect formatselect fontselect fontsizeselect",
                    ), ),

            ), ),
    );


$default_addons[] = array(
    "name" => "Advanced List",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => "Create styled number and bulleted lists.",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "advlist",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            array("@attributes" => array(
                    "name" => "button",
                    "value" => "bullist numlist",
                    ), ),

            ), ),
    );

$default_addons[] = array(
    "name" => "Autolink Plugin",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => "Automatically create hyperlinks.",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "autolink",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),

            ), ),
    );
$default_addons[] = array(
    "name" => "Lists Plugin",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => "Normalizes list behavior between browsers.",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "lists",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            array("@attributes" => array(
                    "name" => "button",
                    "value" => "outdent indent",
                    ), ),
            ), ),
    );
$default_addons[] = array(
    "name" => "Link Plugin",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => "Add hyperlinks to content.",
    "active" => true,
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "link",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            array("@attributes" => array(
                    "name" => "button",
                    "value" => "link",
                    ), ),

            ), ),
    );
$default_addons[] = array(
    "name" => "Image Plugin",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => "Insert an image into TinyMCE.",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "image",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            array("@attributes" => array(
                    "name" => "button",
                    "value" => "image",
                    ), ),
            ), ),
    );
$default_addons[] = array(
    "name" => "Character Map Plugin",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => "Insert special characters into TinyMCE.",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "charmap",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            array("@attributes" => array(
                    "name" => "button",
                    "value" => "charmap",
                    ), ),

            ), ),
    );
$default_addons[] = array(
    "name" => "Print Plugin",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => "Print the content in TinyMCE.",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "print",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            array("@attributes" => array(
                    "name" => "button",
                    "value" => "print",
                    ), ),
            ), ),
    );
$default_addons[] = array(
    "name" => "Preview Plugin",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => "Shows a popup of the current content in read-only format.",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "preview",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            array("@attributes" => array(
                    "name" => "button",
                    "value" => "preview",
                    ), ),
            ), ),
    );
$default_addons[] = array(
    "name" => "Horizontal Rule Plugin",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => "Insert a horizontal line.",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "hr",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            ), ),
    );
$default_addons[] = array(
    "name" => "Anchor Plugin",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => "Insert anchors (sometimes referred to as a bookmarks).",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "anchor",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            array("@attributes" => array(
                    "name" => "button",
                    "value" => "anchor",
                    ), ),
            ), ),
    );
$default_addons[] = array(
    "name" => "Page Break Plugin",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => "Add a page break.",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "pagebreak",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            array("@attributes" => array(
                    "name" => "button",
                    "value" => "pagebreak",
                    ), ),
            ), ),
    );
$default_addons[] = array(
    "name" => "Search and Replace Plugin",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => "Find and replace content in TinyMCE.",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "searchreplace",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            ), ),
    );
$default_addons[] = array(
    "name" => "Word Count Plugin",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => "Show a word count in the TinyMCE status bar.",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "wordcount",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            ), ),
    );
$default_addons[] = array(
    "name" => "Visual Blocks Plugin",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => "Allows a user to see block level elements such as paragraphs.",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "visualblocks",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            array("@attributes" => array(
                    "name" => "button",
                    "value" => "visualblocks",
                    ), ),
            ), ),
    );
$default_addons[] = array(
    "name" => "Visual Characters Plugin",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => "See invisible characters like non-breaking spaces.",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "visualchars",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            array("@attributes" => array(
                    "name" => "button",
                    "value" => "visualchars",
                    ), ),
            ), ),
    );
$default_addons[] = array(
    "name" => "Code Plugin",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => "Edit your content's HTML source.",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "code",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            array("@attributes" => array(
                    "name" => "button",
                    "value" => "code",
                    ), ),
            ), ),
    );
$default_addons[] = array(
    "name" => "Full Screen Plugin",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => "Zoom TinyMCE up to the whole screen.",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "fullscreen",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            array("@attributes" => array(
                    "name" => "button",
                    "value" => "fullscreen",
                    ), ),
            ), ),
    );
$default_addons[] = array(
    "name" => "Insert Date/Time Plugin",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => "Insert the current date and/or time into TinyMCE.",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "insertdatetime",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            array("@attributes" => array(
                    "name" => "button",
                    "value" => "insertdatetime",
                    ), ),

            ), ),
    );
$default_addons[] = array(
    "name" => "Media Plugin",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => "Add HTML5 video and audio elements.",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "media",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            array("@attributes" => array(
                    "name" => "button",
                    "value" => "media",
                    ), ),
            ), ),
    );
$default_addons[] = array(
    "name" => "Nonbreaking Space Plugin",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => "Insert a nonbreaking space.",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "nonbreaking",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            array("@attributes" => array(
                    "name" => "button",
                    "value" => "nonbreaking",
                    ), ),
            ), ),
    );


$default_addons[] = array(
    "name" => "Table Plugin",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => "Table editing features.",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "table",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            array("@attributes" => array(
                    "name" => "button",
                    "value" => "table",
                    ), ),
            ), ),
    );
$default_addons[] = array(
    "name" => "Context Menu",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => " ",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "contextmenu",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            ), ),
    );
$default_addons[] = array(
    "name" => "Directionality Plugin",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => "Toolbar buttons for setting the left-to-right or right-to-left direction of content.",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "directionality",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            array("@attributes" => array(
                    "name" => "button",
                    "value" => "ltr rtl",
                    ), ),
            ), ),
    );
$default_addons[] = array(
    "name" => "Emoticons Plugin",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => "Bring a smiley to your content.",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "emoticons",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            array("@attributes" => array(
                    "name" => "button",
                    "value" => "emoticons",
                    ), ),

            ), ),
    );
$default_addons[] = array(
    "name" => "Template Plugin",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => "Custom templates for your content.",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "template",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            array("@attributes" => array(
                    "name" => "button",
                    "value" => "template",
                    ), ),
            ), ),
    );
$default_addons[] = array(
    "name" => "Paste Plugin",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => "Standard version of features for copying-and-pasting content from Microsoft Word.",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "paste",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            array("@attributes" => array(
                    "name" => "button",
                    "value" => "paste",
                    ), ),
            ), ),
    );
$default_addons[] = array(
    "name" => "Text Color Plugin",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => " ",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "textcolor",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            array("@attributes" => array(
                    "name" => "button",
                    "value" => "forecolor backcolor",
                    ), ),

            ), ),
    );
$default_addons[] = array(
    "name" => "Color Picker Plugin",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => "Select a color from a pallete.",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "colorpicker",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            ), ),
    );
$default_addons[] = array(
    "name" => "Text Pattern Plugin",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => "Matches special patterns in the text and applies formats or executed commands on these patterns.",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "textpattern",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            ), ),
    );
$default_addons[] = array(
    "name" => "Image Tools Plugin",
    "default" => true,
    "license" => 'free',
    "version" => GUI_TINYMCE_VERSION,
    "author" => "TinyMCE",
    "authorURL" => "https://www.tinymce.com/docs/plugins/",
    "description" => "Image editing features for TinyMCE.",
    "preferences" => array("preference" => array(
            array("@attributes" => array(
                    "name" => "id",
                    "value" => "imagetools",
                    ), ),
            array("@attributes" => array(
                    "name" => "path",
                    "value" => "default",
                    ), ),
            ), ),
    );

?>