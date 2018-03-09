/* global tinymce */

/**
 * @author Jasman <jasman@ihsana.com>
 * @copyright Ihsana IT Solutiom 2016
 * @package Galau UI
 */


(function () {
    tinymce.PluginManager.add('gui_bs_quicktags', function (editor, url) {
        var galau_ui_title = 'Galau UI - Bootstrap Quicktags';
        var galau_ui_desc = 'Galau UI - Bootstrap Quicktags is a TinyMCE plugin<br/>that allow create and edit container, row, column, <br/>well, jumbotron and shortcut that use bootstrap framework.';
        var $_ = tinymce.dom.DomQuery;
        var dom = editor.dom;
        var each = tinymce.util.Tools.each;
        var Env = tinymce.Env;
        var self = this;
        var plugin_name = 'gui_bs_quicktags';
        var css_list = [url + '/assets/css/plugin.min.css'];
        var config = '';
        var classes_column = [];
        for (var z = 1; z <= 12; z++) {
            classes_column.push('.col-xs-' + z.toString());
            classes_column.push('.col-md-' + z.toString());
            classes_column.push('.col-sm-' + z.toString());
            classes_column.push('.col-lg-' + z.toString());
            classes_column.push('.col-xs-offset-' + z.toString());
            classes_column.push('.col-md-offset-' + z.toString());
            classes_column.push('.col-sm-offset-' + z.toString());
            classes_column.push('.col-lg-offset-' + z.toString());
        }
        if (window.galau_ui_debug == true) {
            console.log('quicktags => column: ', classes_column);
        }
        var alert_plugin_error = ' not installed! Do you want to install now?';
        if (typeof editor.settings[plugin_name] === 'object') {
            var config = editor.settings[plugin_name];
        }
        //var display_menu = true;
        if (typeof config === 'object') {
            if (typeof config.css !== 'undefined') {
                if (!config.css.exist) {
                    if (!config.css.external) {
                        css_list.push(url + '/assets/css/bootstrap.min.css');
                        if (window.galau_ui_debug == true) {
                            console.log('quicktags => css: internal');
                        }
                    } else {
                        css_list.push(config.css.external);
                        if (window.galau_ui_debug == true) {
                            console.log('quicktags => css: external');
                        }
                    }
                } else {
                    if (window.galau_ui_debug == true) {
                        console.log('url css => exist');
                    }
                }
            } else {
                css_list.push(url + '/assets/css/bootstrap.min.css');
                if (window.galau_ui_debug == true) {
                    console.log('quicktags => css: internal');
                }
            }
            if (config.menu) {
                display_menu = true;
            } else {
                display_menu = false;
            }
        } else {
            css_list.push(url + '/assets/css/bootstrap.min.css');
            if (window.galau_ui_debug == true) {
                console.log('quicktags => css: internal');
            }
        }
        // Include CSS 
        if (typeof editor.settings.content_css !== 'undefined') {
            if (typeof editor.settings.content_css.push === "function") {
                for (var i = 0; i < css_list.length; i++) {
                    editor.settings.content_css.push(css_list[i]);
                }
                ;
            } else if (typeof editor.settings.content_css === "string") {
                editor.settings.content_css = [editor.settings.content_css];
                for (var i = 0; i < css_list.length; i++) {
                    editor.settings.content_css.push(css_list[i]);
                }
                ;
            } else {
                editor.settings.content_css = css_list;
            }
        } else {
            editor.settings.content_css = css_list;
        }
        // Allow elements
        if (typeof editor.settings.extended_valid_elements == 'undefined') {
            editor.settings.extended_valid_elements = '*[*]';
        }
        if (typeof editor.settings.valid_elements == 'undefined') {
            editor.settings.valid_elements = '*[*]';
        }
        if (window.galau_ui_debug == true) {
            console.log('images => valid: ', editor.settings.valid_elements);
            console.log('images => extended_valid: ', editor.settings.extended_valid_elements);
        }
        // Include CSS 
        editor.on('init', function () {
            if (document.createStyleSheet) {
                for (var i = 0; i < css_list.length; i++) {
                    document.createStyleSheet(css_list[i]);
                }
            } else {
                for (var i = 0; i < css_list.length; i++) {
                    cssLink = editor.dom.create('link', {
                        rel: 'stylesheet',
                        href: css_list[i]
                    });
                    document.getElementsByTagName('head')[0].appendChild(cssLink);
                }
            }
        });
        editor.on('init', function () {
            //BOOTSTRAP FORMAT
            var alignElements = 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img';
            editor.formatter.unregister(['alignleft', 'aligncenter', 'alignright', 'alignjustify']);
            editor.formatter.register({
                alignleft: [{
                        selector: 'figure.image',
                        collapsed: false,
                        classes: 'text-left',
                        ceFalseOverride: true
                    },
                    {
                        selector: 'figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li',
                        classes: 'text-left',
                        defaultBlock: 'div'
                    },
                    {
                        selector: 'img,table',
                        collapsed: false,
                        classes: 'pull-left'
                    }],
                aligncenter: [{
                        selector: 'figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li',
                        classes: 'text-center',
                        defaultBlock: 'div'
                    },
                    {
                        selector: 'img',
                        collapsed: false,
                        classes: 'center-block'
                    },
                    {
                        selector: 'table',
                        collapsed: false,
                        classes: 'center-block'
                    }],
                alignright: [{
                        selector: 'figure.image',
                        collapsed: false,
                        classes: 'text-right',
                        ceFalseOverride: true
                    },
                    {
                        selector: 'figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li',
                        classes: 'text-right',
                        defaultBlock: 'div'
                    },
                    {
                        selector: 'blockquote',
                        classes: 'blockquote-reverse',
                    },
                    {
                        selector: 'img,table',
                        collapsed: false,
                        classes: 'pull-right'
                    }],
                alignjustify: [{
                        selector: 'figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li',
                        classes: 'text-justify',
                        defaultBlock: 'div'
                    }],
                blockquote: {
                    block: 'blockquote',
                    wrapper: 0,
                    remove: 'all'
                },
                /** FORMAT PLEAD **/
                pLead: {
                    selector: 'p',
                    classes: 'lead',
                },
                /** DIV CONTAINER **/
                divContainer: {
                    block: 'div',
                    classes: 'container',
                },
                /** DIV CONTAINER - FLUID **/
                divContainerFluid: {
                    block: 'div',
                    classes: 'container-fluid',
                },
                /** DIV CONTAINER - LUID **/
                divRow: {
                    block: 'div',
                    classes: 'row',
                },
                wellDefault: {
                    selector: 'div',
                    classes: 'well',
                },
                wellLarge: {
                    selector: 'div',
                    classes: 'well well-lg',
                },
                wellSmall: {
                    selector: 'div',
                    classes: 'well well-sm',
                },
                jumbotron: {
                    selector: 'div',
                    classes: 'jumbotron',
                },
                listUnstyled: {
                    selector: 'ul,ol',
                    classes: 'list-unstyled'
                },
                listInline: {
                    selector: 'ul,ol',
                    classes: 'list-inline',
                },
                listHorizontal: {
                    selector: 'dl',
                    classes: 'dl-horizontal',
                },
                listGroup: {
                    selector: 'ul,ol',
                    classes: 'list-group',
                },
            });
        });
        editor.settings.target_list = [{
                text: 'None',
                value: ''
            },
            {
                text: 'New window',
                value: '_blank'
            },
            {
                text: 'Top window',
                value: '_top'
            },
            {
                text: 'Self window',
                value: '_self'
            }];
        //LINK
        editor.settings.link_class_list = [{
                text: "None",
                value: " "
            },
            {
                text: "Button Default",
                value: "btn btn-default",
            },
            {
                text: "Button Primary",
                value: "btn btn-primary"
            },
            {
                text: "Button Info",
                value: "btn btn-info"
            },
            {
                text: "Button Warning",
                value: "btn btn-warning"
            },
            {
                text: "Button Danger",
                value: "btn btn-danger"
            },
            {
                text: "Button Link",
                value: "btn btn-link"
            }, ];

        function applyListFormat(format) {
            editor.undoManager.transact(function () {
                each('listUnstyled listInline listHorizontal listGroup'.split(' '), function (name) {
                    editor.formatter.remove(name);
                });
                editor.formatter.apply(format);
            });
        }

        function applyListFormatRemove() {
            editor.undoManager.transact(function () {
                each('listUnstyled listInline listHorizontal listGroup'.split(' '), function (name) {
                    editor.formatter.remove(name);
                });
            });
        }
        editor.addButton('gui_bs_container', {
            type: 'splitbutton',
            text: 'Container',
            icon: 'gui_bs_quicktags guicon guicon-grid',
            menu: [{
                    text: '+ Row',
                    onclick: newRow,
                }]
        });

        editor.addButton('gui_typo_olul', {
            type: 'splitbutton',
            text: 'List',
            icon: 'bullist',
            menu: [{
                    text: 'List Unstyled',
                    onclick: function () {
                        applyListFormat('listUnstyled');
                    },
                },
                {
                    text: 'List Inline',
                    onclick: function () {
                        applyListFormat('listInline');
                    },
                },
                {
                    text: 'List Group',
                    onclick: function () {
                        applyListFormat('listGroup');
                    },
                }, ]
        });
        editor.addButton('gui_typo_olul_remove', {
            icon: 'remove',
            tooltip: 'remove this container',
            stateSelector: 'ul,ul',
            onclick: function () {
                applyListFormatRemove()
            },
        });
        editor.addButton('gui_typo_dl_remove', {
            icon: 'remove',
            tooltip: 'remove this container',
            stateSelector: 'dl',
            onclick: function () {
                applyListFormatRemove()
            },
        });

        editor.addButton('gui_typo_dl', {
            type: 'splitbutton',
            text: 'List',
            icon: 'bullist',
            menu: [{
                    text: 'List Horizontal',
                    onclick: function () {
                        applyListFormat('listHorizontal');
                    },
                }]
        });

        editor.addButton('gui_bs_container_remove', {
            icon: 'remove',
            tooltip: 'remove this container',
            stateSelector: '.container,.container-fluid',
            onclick: function () {
                var divElm = editor.dom.getParent(editor.selection.getStart(), '.container,.container-fluid');
                if (divElm) {
                    editor.undoManager.transact(function () {
                        $_(divElm).replaceWith('');
                    });
                }
            },
        });

        editor.addButton('gui_bs_row_remove', {
            icon: 'remove',
            tooltip: 'remove this row',
            stateSelector: '.row',
            onclick: function () {
                var divElm = editor.dom.getParent(editor.selection.getStart(), '.row');
                if (divElm) {
                    editor.undoManager.transact(function () {
                        $_(divElm).replaceWith('');
                    });
                }
            },
        });
        editor.addButton('gui_bs_row', {
            type: 'splitbutton',
            text: 'Row',
            icon: 'gui_bs_quicktags guicon guicon-grid',
            menu: [{
                    text: '+ Custom Column...',
                    onclick: newColumn,
                },
                {
                    text: '-',
                },
                {
                    text: '2 Column (2 x 6 grid)',
                    onclick: function () {
                        newFixColumn('col-md-6,col-md-6');
                    },
                },
                {
                    text: '3 Column (3 x 4 grid)',
                    onclick: function () {
                        newFixColumn('col-md-4,col-md-4,col-md-4');
                    }
                },
                {
                    text: '4 Column (4 x 3 grid)',
                    onclick: function () {
                        newFixColumn('col-md-3,col-md-3,col-md-3,col-md-3');
                    }
                },
                {
                    text: '6 Column (6 x 2 grid)',
                    onclick: function () {
                        newFixColumn('col-md-2,col-md-2,col-md-2,col-md-2,col-md-2,col-md-2');
                    }
                },
                {
                    text: '2 Column (7 grid + 5 grid)',
                    onclick: function () {
                        newFixColumn('col-md-7,col-md-5');
                    }
                },
                {
                    text: '2 Column (5 grid + 7 grid)',
                    onclick: function () {
                        newFixColumn('col-md-5,col-md-7');
                    }
                },
                {
                    text: '3 Column (3 grid + 6 grid + 3 grid)',
                    onclick: function () {
                        newFixColumn('col-md-3,col-md-6,col-md-3');
                    }
                }, ]
        });

        editor.on("init", function () {
            editor.formatter.register({
                col_xs_1: {
                    block: "div",
                    classes: "col-xs-1"
                },
                col_xs_2: {
                    block: "div",
                    classes: "col-xs-2"
                },
                col_xs_3: {
                    block: "div",
                    classes: "col-xs-3"
                },
                col_xs_4: {
                    block: "div",
                    classes: "col-xs-4"
                },
                col_xs_5: {
                    block: "div",
                    classes: "col-xs-5"
                },
                col_xs_6: {
                    block: "div",
                    classes: "col-xs-6"
                },
                col_xs_7: {
                    block: "div",
                    classes: "col-xs-7"
                },
                col_xs_8: {
                    block: "div",
                    classes: "col-xs-8"
                },
                col_xs_9: {
                    block: "div",
                    classes: "col-xs-9"
                },
                col_xs_10: {
                    block: "div",
                    classes: "col-xs-10"
                },
                col_xs_11: {
                    block: "div",
                    classes: "col-xs-11"
                },
                col_xs_12: {
                    block: "div",
                    classes: "col-xs-12"
                },
                col_sm_1: {
                    block: "div",
                    classes: "col-sm-1"
                },
                col_sm_2: {
                    block: "div",
                    classes: "col-sm-2"
                },
                col_sm_3: {
                    block: "div",
                    classes: "col-sm-3"
                },
                col_sm_4: {
                    block: "div",
                    classes: "col-sm-4"
                },
                col_sm_5: {
                    block: "div",
                    classes: "col-sm-5"
                },
                col_sm_6: {
                    block: "div",
                    classes: "col-sm-6"
                },
                col_sm_7: {
                    block: "div",
                    classes: "col-sm-7"
                },
                col_sm_8: {
                    block: "div",
                    classes: "col-sm-8"
                },
                col_sm_9: {
                    block: "div",
                    classes: "col-sm-9"
                },
                col_sm_10: {
                    block: "div",
                    classes: "col-sm-10"
                },
                col_sm_11: {
                    block: "div",
                    classes: "col-sm-11"
                },
                col_sm_12: {
                    block: "div",
                    classes: "col-sm-12"
                },
                col_md_1: {
                    block: "div",
                    classes: "col-md-1"
                },
                col_md_2: {
                    block: "div",
                    classes: "col-md-2"
                },
                col_md_3: {
                    block: "div",
                    classes: "col-md-3"
                },
                col_md_4: {
                    block: "div",
                    classes: "col-md-4"
                },
                col_md_5: {
                    block: "div",
                    classes: "col-md-5"
                },
                col_md_6: {
                    block: "div",
                    classes: "col-md-6"
                },
                col_md_7: {
                    block: "div",
                    classes: "col-md-7"
                },
                col_md_8: {
                    block: "div",
                    classes: "col-md-8"
                },
                col_md_9: {
                    block: "div",
                    classes: "col-md-9"
                },
                col_md_10: {
                    block: "div",
                    classes: "col-md-10"
                },
                col_md_11: {
                    block: "div",
                    classes: "col-md-11"
                },
                col_md_12: {
                    block: "div",
                    classes: "col-md-12"
                },
                col_lg_1: {
                    block: "div",
                    classes: "col-lg-1"
                },
                col_lg_2: {
                    block: "div",
                    classes: "col-lg-2"
                },
                col_lg_3: {
                    block: "div",
                    classes: "col-lg-3"
                },
                col_lg_4: {
                    block: "div",
                    classes: "col-lg-4"
                },
                col_lg_5: {
                    block: "div",
                    classes: "col-lg-5"
                },
                col_lg_6: {
                    block: "div",
                    classes: "col-lg-6"
                },
                col_lg_7: {
                    block: "div",
                    classes: "col-lg-7"
                },
                col_lg_8: {
                    block: "div",
                    classes: "col-lg-8"
                },
                col_lg_9: {
                    block: "div",
                    classes: "col-lg-9"
                },
                col_lg_10: {
                    block: "div",
                    classes: "col-lg-10"
                },
                col_lg_11: {
                    block: "div",
                    classes: "col-lg-11"
                },
                col_lg_12: {
                    block: "div",
                    classes: "col-lg-12"
                },
            });
        });



        function applyFormatResizeXs(format) {
            editor.undoManager.transact(function () {
                each("col_xs_1 col_xs_2 col_xs_3 col_xs_4 col_xs_5 col_xs_6 col_xs_7 col_xs_8 col_xs_9 col_xs_10 col_xs_11 col_xs_12".split(" "), function (name) {
                    editor.formatter.remove(name);
                });
                editor.formatter.apply(format);
            });
        }


        function applyFormatResizeSm(format) {
            editor.undoManager.transact(function () {
                each("col_sm_1 col_sm_2 col_sm_3 col_sm_4 col_sm_5 col_sm_6 col_sm_7 col_sm_8 col_sm_9 col_sm_10 col_sm_11 col_sm_12".split(" "), function (name) {
                    editor.formatter.remove(name);
                });
                editor.formatter.apply(format);
            });
        }


        function applyFormatResizeMd(format) {
            editor.undoManager.transact(function () {
                each("col_md_1 col_md_2 col_md_3 col_md_4 col_md_5 col_md_6 col_md_7 col_md_8 col_md_9 col_md_10 col_md_11 col_md_12".split(" "), function (name) {
                    editor.formatter.remove(name);
                });
                editor.formatter.apply(format);
            });
        }


        function applyFormatResizeLg(format) {
            editor.undoManager.transact(function () {
                each("col_lg_1 col_lg_2 col_lg_3 col_lg_4 col_lg_5 col_lg_6 col_lg_7 col_lg_8 col_lg_9 col_lg_10 col_lg_11 col_lg_12".split(" "), function (name) {
                    editor.formatter.remove(name);
                });
                editor.formatter.apply(format);
            });
        }


        var resizeColumn = [
            {
                text: "New Column",
                icon: "gui_bs_quicktags guicon guicon-plus",
                onclick: newColumn,
            },
            {
                text: "Extra Small Devices",
                icon: "gui_bs_quicktags guicon guicon-xs-device",
                menu: [
                    {
                        text: "1 Grid",
                        onclick: function () {
                            applyFormatResizeXs("col_xs_1");
                        },
                    },
                    {
                        text: "2 Grid",
                        onclick: function () {
                            applyFormatResizeXs("col_xs_2");
                        },
                    },
                    {
                        text: "3 Grid",
                        onclick: function () {
                            applyFormatResizeXs("col_xs_3");
                        },
                    },
                    {
                        text: "4 Grid",
                        onclick: function () {
                            applyFormatResizeXs("col_xs_4");
                        },
                    },
                    {
                        text: "5 Grid",
                        onclick: function () {
                            applyFormatResizeXs("col_xs_5");
                        },
                    },
                    {
                        text: "6 Grid",
                        onclick: function () {
                            applyFormatResizeXs("col_xs_6");
                        },
                    },
                    {
                        text: "7 Grid",
                        onclick: function () {
                            applyFormatResizeXs("col_xs_7");
                        },
                    },
                    {
                        text: "8 Grid",
                        onclick: function () {
                            applyFormatResizeXs("col_xs_8");
                        },
                    },
                    {
                        text: "9 Grid",
                        onclick: function () {
                            applyFormatResizeXs("col_xs_9");
                        },
                    },
                    {
                        text: "10 Grid",
                        onclick: function () {
                            applyFormatResizeXs("col_xs_10");
                        },
                    },
                    {
                        text: "11 Grid",
                        onclick: function () {
                            applyFormatResizeXs("col_xs_11");
                        },
                    },
                    {
                        text: "12 Grid",
                        onclick: function () {
                            applyFormatResizeXs("col_xs_12");
                        },
                    },
                ]
            },
            {
                text: "Small Devices",
                icon: "gui_bs_quicktags guicon guicon-sm-device",
                menu: [
                    {
                        text: "1 Grid",
                        onclick: function () {
                            applyFormatResizeSm("col_sm_1");
                        },
                    },
                    {
                        text: "2 Grid",
                        onclick: function () {
                            applyFormatResizeSm("col_sm_2");
                        },
                    },
                    {
                        text: "3 Grid",
                        onclick: function () {
                            applyFormatResizeSm("col_sm_3");
                        },
                    },
                    {
                        text: "4 Grid",
                        onclick: function () {
                            applyFormatResizeSm("col_sm_4");
                        },
                    },
                    {
                        text: "5 Grid",
                        onclick: function () {
                            applyFormatResizeSm("col_sm_5");
                        },
                    },
                    {
                        text: "6 Grid",
                        onclick: function () {
                            applyFormatResizeSm("col_sm_6");
                        },
                    },
                    {
                        text: "7 Grid",
                        onclick: function () {
                            applyFormatResizeSm("col_sm_7");
                        },
                    },
                    {
                        text: "8 Grid",
                        onclick: function () {
                            applyFormatResizeSm("col_sm_8");
                        },
                    },
                    {
                        text: "9 Grid",
                        onclick: function () {
                            applyFormatResizeSm("col_sm_9");
                        },
                    },
                    {
                        text: "10 Grid",
                        onclick: function () {
                            applyFormatResizeSm("col_sm_10");
                        },
                    },
                    {
                        text: "11 Grid",
                        onclick: function () {
                            applyFormatResizeSm("col_sm_11");
                        },
                    },
                    {
                        text: "12 Grid",
                        onclick: function () {
                            applyFormatResizeSm("col_sm_12");
                        },
                    },
                ]
            },
            {
                text: "Medium Devices",
                icon: "gui_bs_quicktags guicon guicon-md-device",
                menu: [
                    {
                        text: "1 Grid",
                        onclick: function () {
                            applyFormatResizeMd("col_md_1");
                        },
                    },
                    {
                        text: "2 Grid",
                        onclick: function () {
                            applyFormatResizeMd("col_md_2");
                        },
                    },
                    {
                        text: "3 Grid",
                        onclick: function () {
                            applyFormatResizeMd("col_md_3");
                        },
                    },
                    {
                        text: "4 Grid",
                        onclick: function () {
                            applyFormatResizeMd("col_md_4");
                        },
                    },
                    {
                        text: "5 Grid",
                        onclick: function () {
                            applyFormatResizeMd("col_md_5");
                        },
                    },
                    {
                        text: "6 Grid",
                        onclick: function () {
                            applyFormatResizeMd("col_md_6");
                        },
                    },
                    {
                        text: "7 Grid",
                        onclick: function () {
                            applyFormatResizeMd("col_md_7");
                        },
                    },
                    {
                        text: "8 Grid",
                        onclick: function () {
                            applyFormatResizeMd("col_md_8");
                        },
                    },
                    {
                        text: "9 Grid",
                        onclick: function () {
                            applyFormatResizeMd("col_md_9");
                        },
                    },
                    {
                        text: "10 Grid",
                        onclick: function () {
                            applyFormatResizeMd("col_md_10");
                        },
                    },
                    {
                        text: "11 Grid",
                        onclick: function () {
                            applyFormatResizeMd("col_md_11");
                        },
                    },
                    {
                        text: "12 Grid",
                        onclick: function () {
                            applyFormatResizeMd("col_md_12");
                        },
                    },
                ]
            },
            {
                text: "Large Devices",
                icon: "gui_bs_quicktags guicon guicon-lg-device",
                menu: [
                    {
                        text: "1 Grid",
                        onclick: function () {
                            applyFormatResizeLg("col_lg_1");
                        },
                    },
                    {
                        text: "2 Grid",
                        onclick: function () {
                            applyFormatResizeLg("col_lg_2");
                        },
                    },
                    {
                        text: "3 Grid",
                        onclick: function () {
                            applyFormatResizeLg("col_lg_3");
                        },
                    },
                    {
                        text: "4 Grid",
                        onclick: function () {
                            applyFormatResizeLg("col_lg_4");
                        },
                    },
                    {
                        text: "5 Grid",
                        onclick: function () {
                            applyFormatResizeLg("col_lg_5");
                        },
                    },
                    {
                        text: "6 Grid",
                        onclick: function () {
                            applyFormatResizeLg("col_lg_6");
                        },
                    },
                    {
                        text: "7 Grid",
                        onclick: function () {
                            applyFormatResizeLg("col_lg_7");
                        },
                    },
                    {
                        text: "8 Grid",
                        onclick: function () {
                            applyFormatResizeLg("col_lg_8");
                        },
                    },
                    {
                        text: "9 Grid",
                        onclick: function () {
                            applyFormatResizeLg("col_lg_9");
                        },
                    },
                    {
                        text: "10 Grid",
                        onclick: function () {
                            applyFormatResizeLg("col_lg_10");
                        },
                    },
                    {
                        text: "11 Grid",
                        onclick: function () {
                            applyFormatResizeLg("col_lg_11");
                        },
                    },
                    {
                        text: "12 Grid",
                        onclick: function () {
                            applyFormatResizeLg("col_lg_12");
                        },
                    },
                ]
            },
        ];

        editor.addButton('gui_editable', {
            icon: 'remove',
            tooltip: 'lock the content',
            text: "Editable",
            stateSelector: "[contentEditable='false']",
            onclick: function () {
                var divElm = editor.dom.getParent(editor.selection.getStart(), 'div');
                if (divElm) {
                    editor.undoManager.transact(function () {
                        var enabled;
                        if (typeof $_(divElm).attr('contentEditable') === 'undefined') {
                            $_(divElm).attr('contentEditable', 'true');
                        }
                        enabled = $_(divElm).attr('contentEditable');

                        if (window.galau_ui_debug === true) {
                            console.log('Editable => ', divElm, enabled);
                        }

                        if (enabled === 'false') {
                            $_(divElm).attr('contentEditable', 'true');
                        } else {
                            $_(divElm).attr('contentEditable', 'false');
                        }
                    });
                }
            },
        });

        editor.addButton('gui_bs_column', {
            text: 'Column',
            icon: 'gui_bs_quicktags guicon guicon-grid',
            type: 'splitbutton',
            menu: resizeColumn,
        });

        editor.addButton('gui_bs_column_remove', {
            icon: 'remove',
            tooltip: 'remove this column',
            stateSelector: classes_column.join(','),
            onclick: function () {
                var divElm = editor.dom.getParent(editor.selection.getStart(), classes_column.join(','));
                if (divElm) {
                    editor.undoManager.transact(function () {
                        $_(divElm).replaceWith('');
                    });
                }
            },
        });
        /**
         * Create button remove
         */
        editor.addButton('gui_bs_well_remove', {
            icon: 'remove',
            tooltip: 'remove this wells',
            stateSelector: '.well',
            onclick: function () {
                var divElm = editor.dom.getParent(editor.selection.getStart(), '.well');
                if (divElm) {
                    editor.undoManager.transact(function () {
                        $_(divElm).replaceWith('');
                    });
                }
            },
        });
        editor.addButton('gui_bs_jumbotron_remove', {
            icon: 'remove',
            tooltip: 'remove this jumbotron',
            stateSelector: '.jumbotron',
            onclick: function () {
                var divElm = editor.dom.getParent(editor.selection.getStart(), '.jumbotron');
                if (divElm) {
                    editor.undoManager.transact(function () {
                        $_(divElm).replaceWith('');
                    });
                }
            },
        });
        editor.addButton('gui_bs_well', {
            icon: 'gui_bs_quicktags guicon guicon-well',
            onclick: newWells,
            text: 'Wells',
            stateSelector: '.well',
        });
        editor.addButton('gui_bs_jumbotron', {
            icon: 'gui_bs_quicktags guicon guicon-jumbotron',
            text: 'Jumbotron',
            stateSelector: '.jumbotron',
            onclick: newJumbotron,
        });
        var menuQuicktags = [{
                text: 'Grid System',
                icon: 'gui_bs_quicktags guicon guicon-grid',
                menu: [{
                        text: 'Container',
                        menu: [{
                                text: 'Container',
                                onclick: function () {
                                    var divElm = editor.dom.getParent(editor.selection.getStart(), 'div');
                                    if (window.galau_ui_debug == true) {
                                        console.log('Div => ', divElm);
                                    }
                                    if (divElm == null) {
                                        var eLms = '<div class="container">' + (Env.ie ? " " : '<br>') + '</div>';
                                        eLms += '' + (Env.ie ? " " : '<br>') + '';
                                        //editor.formatter.apply('divContainer');
                                        editor.insertContent(eLms);
                                    } else {
                                        editor.undoManager.transact(function () {
                                            editor.formatter.apply('divContainer');
                                        });
                                    }
                                }
                            },
                            {
                                text: 'Fluid',
                                onclick: function () {
                                    var divElm = editor.dom.getParent(editor.selection.getStart(), 'div');
                                    if (window.galau_ui_debug == true) {
                                        console.log('Div => ', divElm);
                                    }
                                    if (divElm == null) {
                                        var eLms = '<div class="container-fluid">' + (Env.ie ? " " : '<br>') + '</div>';
                                        eLms += '' + (Env.ie ? " " : '<br>') + '';
                                        //editor.formatter.apply('divContainer');
                                        editor.insertContent(eLms);
                                    } else {
                                        editor.undoManager.transact(function () {
                                            editor.formatter.apply('divContainer');
                                        });
                                    }
                                }
                            }]
                    },
                    {
                        text: 'Insert Column',
                        menu: [
                            {
                                text: '2 Column (2 x 6 grid)',
                                onclick: function () {
                                    newFixColumn('col-md-6,col-md-6');
                                },
                            },
                            {
                                text: '3 Column (3 x 4 grid)',
                                onclick: function () {
                                    newFixColumn('col-md-4,col-md-4,col-md-4');
                                }
                            },
                            {
                                text: '4 Column (4 x 3 grid)',
                                onclick: function () {
                                    newFixColumn('col-md-3,col-md-3,col-md-3,col-md-3');
                                }
                            },
                            {
                                text: '6 Column (6 x 2 grid)',
                                onclick: function () {
                                    newFixColumn('col-md-2,col-md-2,col-md-2,col-md-2,col-md-2,col-md-2');
                                }
                            },
                            {
                                text: '-',
                            },
                            {
                                text: '2 Column (7 grid + 5 grid)',
                                onclick: function () {
                                    newFixColumn('col-md-7,col-md-5');
                                }
                            },
                            {
                                text: '2 Column (5 grid + 7 grid)',
                                onclick: function () {
                                    newFixColumn('col-md-5,col-md-7');
                                }
                            },
                            {
                                text: '3 Column (3 grid + 6 grid + 3 grid)',
                                onclick: function () {
                                    newFixColumn('col-md-3,col-md-6,col-md-3');
                                }
                            }, 
                        ],
                    },
                    {
                        text: 'Rows',
                        onclick: newRow
                    },
                    {
                        text: "Column",
                        menu: resizeColumn,
                    }
                ]
            },
            {
                text: 'Typography',
                icon: 'gui_bs_quicktags guicon guicon-text',
                menu: [{
                        text: 'Paragraph Lead',
                        onclick: function () {
                            var pElm = editor.dom.getParent(editor.selection.getStart(), 'p');
                            if (window.galau_ui_debug == true) {
                                console.log('Paragraph => ', pElm);
                            }
                            if (pElm == null) {
                                var win = tinymce.activeEditor.windowManager.open({
                                    title: 'Galau UI - Paragraph Lead',
                                    body: [{
                                            name: 'paragraph_lead',
                                            type: 'textbox',
                                            multiline: true,
                                            width: 400,
                                            height: 120,
                                        }, ],
                                    onsubmit: function () {
                                        var pText = win.find('#paragraph_lead')[0].value();
                                        var eLms = '';
                                        eLms += '<p class="lead">' + pText + '</p>';
                                        editor.insertContent(eLms);
                                    }
                                });
                            } else {
                                editor.undoManager.transact(function () {
                                    editor.formatter.apply('pLead');
                                });
                            }
                        }
                    }]
            },
            {
                text: 'Components',
                icon: 'gui_bs_quicktags guicon guicon-tab',
                menu: [{
                        text: "Jumbotron",
                        icon: 'gui_bs_quicktags  guicon guicon-jumbotron',
                        onclick: newJumbotron,
                    },
                    {
                        text: "Wells",
                        icon: 'gui_bs_quicktags guicon guicon-well',
                        onclick: newWells,
                    },
                    {
                        text: "Badges",
                        icon: 'gui_bs_quicktags  guicon guicon-badges',
                        onclick: function () {
                            if (typeof editor.settings.showGuiBootstrapBadges === 'function') {
                                editor.settings.showGuiBootstrapBadges();
                            } else {
                                tinymce.activeEditor.windowManager.confirm('GUI - Bootstrap Navigator Plugin ' + alert_plugin_error, function (s) {
                                    if (s)
                                        window.open('http://codecanyon.net/item/gui-visual-editor-package-for-tinymce/14858024?ref=regel', '_blank');
                                });
                            }
                        }
                    },
                    {
                        text: "Navigator",
                        icon: 'gui_bs_quicktags  guicon guicon-tab',
                        onclick: function () {
                            if (typeof editor.settings.showGuiBootstrapNavigator === 'function') {
                                editor.settings.showGuiBootstrapNavigator();
                            } else {
                                tinymce.activeEditor.windowManager.confirm('GUI - Bootstrap Navigator Plugin ' + alert_plugin_error, function (s) {
                                    if (s)
                                        window.open('http://codecanyon.net/item/gui-visual-editor-package-for-tinymce/14858024?ref=regel', '_blank');
                                });
                            }
                        }
                    },
                    {
                        text: "Panel",
                        icon: 'gui_bs_quicktags  guicon guicon-panel',
                        onclick: function () {
                            if (typeof editor.settings.showGuiBootstrapPanel === 'function') {
                                editor.settings.showGuiBootstrapPanel();
                            } else {
                                tinymce.activeEditor.windowManager.confirm('GUI - Bootstrap Panels Plugin ' + alert_plugin_error, function (s) {
                                    if (s)
                                        window.open('http://codecanyon.net/item/gui-visual-editor-package-for-tinymce/14858024?ref=regel', '_blank');
                                });
                            }
                        }
                    },
                    {
                        text: "Alert",
                        icon: 'gui_bs_quicktags  guicon guicon-alert',
                        onclick: function () {
                            if (typeof editor.settings.showGuiBootstrapAlert === 'function') {
                                editor.settings.showGuiBootstrapAlert();
                            } else {
                                tinymce.activeEditor.windowManager.confirm('GUI - Bootstrap Alert Plugin ' + alert_plugin_error, function (s) {
                                    if (s)
                                        window.open('http://codecanyon.net/item/gui-visual-editor-package-for-tinymce/14858024?ref=regel', '_blank');
                                });
                            }
                        }
                    },
                    {
                        text: "Label",
                        icon: 'gui_bs_quicktags  guicon guicon-label',
                        onclick: function () {
                            if (typeof editor.settings.showGuiBootstrapLabel === 'function') {
                                editor.settings.showGuiBootstrapLabel();
                            } else {
                                tinymce.activeEditor.windowManager.confirm('GUI - Bootstrap Labels Plugin ' + alert_plugin_error, function (s) {
                                    if (s)
                                        window.open('http://codecanyon.net/item/gui-visual-editor-package-for-tinymce/14858024?ref=regel', '_blank');
                                });
                            }
                        }
                    },
                    {
                        text: "Icon",
                        icon: 'gui_bs_quicktags guicon guicon-fontawesome',
                        menu: [{
                                text: 'Font Awesome',
                                icon: 'gui_bs_quicktags guicon guicon-fontawesome',
                                onclick: function () {
                                    if (typeof editor.settings.showGuiFontAwesome === 'function') {
                                        editor.settings.showGuiFontAwesome();
                                    } else {
                                        tinymce.activeEditor.windowManager.confirm('GUI - FontAwesome Plugin ' + alert_plugin_error, function (s) {
                                            if (s)
                                                window.open('http://codecanyon.net/item/gui-visual-editor-package-for-tinymce/14858024?ref=regel', '_blank');
                                        });
                                    }
                                }
                            },
                            {
                                text: 'Dashicons',
                                icon: 'gui_bs_quicktags guicon guicon-dashicons',
                                onclick: function () {
                                    if (typeof editor.settings.showGuiDashicons === 'function') {
                                        editor.settings.showGuiDashicons();
                                    } else {
                                        tinymce.activeEditor.windowManager.confirm('GUI - Dashicons Plugin ' + alert_plugin_error, function (s) {
                                            if (s)
                                                window.open('http://codecanyon.net/item/gui-visual-editor-package-for-tinymce/14858024?ref=regel', '_blank');
                                        });
                                    }
                                }
                            },
                            {
                                text: 'Glyphicons',
                                icon: 'gui_bs_quicktags guicon guicon-glyphicons',
                                onclick: function () {
                                    if (typeof editor.settings.showGuiBootstrapGlyphicons === 'function') {
                                        editor.settings.showGuiBootstrapGlyphicons();
                                    } else {
                                        tinymce.activeEditor.windowManager.confirm('GUI - Bootstrap Glyphicons Plugin ' + alert_plugin_error, function (s) {
                                            if (s)
                                                window.open('http://codecanyon.net/item/gui-visual-editor-package-for-tinymce/14858024?ref=regel', '_blank');
                                        });
                                    }
                                }
                            }, ]
                    }, ],
            },
            {
                text: "Table",
                icon: 'gui_bs_quicktags  guicon guicon-table',
                onclick: function () {
                    if (typeof editor.settings.showGuiBootstrapTable === 'function') {
                        editor.settings.showGuiBootstrapTable();
                    } else {
                        tinymce.activeEditor.windowManager.confirm('GUI - Bootstrap Tables Plugin ' + alert_plugin_error, function (s) {
                            if (s)
                                window.open('http://codecanyon.net/item/gui-visual-editor-package-for-tinymce/14858024?ref=regel', '_blank');
                        });
                    }
                }
            },
            {
                text: "Images",
                icon: 'gui_bs_quicktags guicon guicon-image',
                onclick: function () {
                    if (typeof editor.settings.showGuiBootstrapImages === 'function') {
                        editor.settings.showGuiBootstrapImages();
                    } else {
                        tinymce.activeEditor.windowManager.confirm('GUI - Bootstrap Images Plugin ' + alert_plugin_error, function (s) {
                            if (s)
                                window.open('http://codecanyon.net/item/gui-visual-editor-package-for-tinymce/14858024?ref=regel', '_blank');
                        });
                    }
                }
            }, /** button MENU **/ {
                text: 'Buttons',
                icon: 'gui_bs_quicktags guicon guicon-button',
                onclick: function () {
                    if (typeof editor.settings.showGuiBootstrapButtons === 'function') {
                        editor.settings.showGuiBootstrapButtons();
                    } else {
                        tinymce.activeEditor.windowManager.confirm('GUI - Bootstrap Buttons Plugin ' + alert_plugin_error, function (s) {
                            if (s)
                                window.open('http://codecanyon.net/item/gui-visual-editor-package-for-tinymce/14858024?ref=regel', '_blank');
                        });
                    }
                }
            }, ];

        editor.addButton('gui_bs_quicktags', {
            type: 'splitbutton',
            tooltip: 'Bootstrap Quick Button',
            text: 'Bootstrap',
            icon: 'gui_bs_quicktags guicon guicon-bootstrap',
            menu: menuQuicktags
        });

        editor.addMenuItem('gui_bs_quicktags', {
            icon: 'gui_bs_quicktags guicon guicon-bootstrap',
            text: 'Bootstrap',
            context: 'insert',
            menu: menuQuicktags
        });

        function newJumbotron() {
            var divElm = editor.dom.getParent(editor.selection.getStart(), '.jumbotron');
            if (window.galau_ui_debug == true) {
                console.log('jumbotron => ', divElm);
            }
            if (divElm == null) {
                var win = tinymce.activeEditor.windowManager.open({
                    title: 'Galau UI - Jumbotron',
                    body: [{
                            label: 'Text',
                            name: 'jumbotron_text',
                            type: 'textbox',
                            minWidth: 300,
                            minHeight: 100,
                            multiline: true,
                        }, ],
                    onsubmit: function () {
                        editor.undoManager.transact(function () {
                            var jumbotronText = win.find('#jumbotron_text')[0].value();
                            var eLms = '<div class="jumbotron">' + jumbotronText + '</div>';
                            eLms += '' + (Env.ie ? " " : '<br>') + '';
                            editor.insertContent(eLms);
                        });
                    }
                });
            } else {
                editor.undoManager.transact(function () {
                    editor.formatter.apply('jumbotron');
                });
            }
        }

        function newWells() {
            var divElm = editor.dom.getParent(editor.selection.getStart(), '.well');
            if (window.galau_ui_debug == true) {
                console.log('Paragraph => ', divElm);
            }
            if (divElm == null) {
                var win = tinymce.activeEditor.windowManager.open({
                    title: 'Galau UI - Wells',
                    body: [{
                            label: 'Text',
                            name: 'well_text',
                            type: 'textbox',
                            minWidth: 400,
                            minHeight: 100,
                            multiline: true,
                        },
                        {
                            label: 'Size',
                            name: 'well_size',
                            type: 'listbox',
                            values: [{
                                    text: 'Default',
                                    value: ''
                                },
                                {
                                    text: 'Large',
                                    value: 'well-lg'
                                },
                                {
                                    text: 'Small',
                                    value: 'well-sm'
                                }, ]
                        }, ],
                    onsubmit: function () {
                        editor.undoManager.transact(function () {
                            var wellText = win.find('#well_text')[0].value();
                            var wellSize = win.find('#well_size')[0].value();
                            var eLms = '';
                            eLms += '<div class="well ' + wellSize + '">' + wellText + '</div>';
                            eLms += '' + (Env.ie ? " " : '<br>') + '';
                            editor.insertContent(eLms);
                        });
                    }
                });
            } else {
                editor.undoManager.transact(function () {
                    editor.formatter.apply('wellDefault');
                });
            }
        }

        function newFixColumn(data) {
            var eLms = '';
            each(data.split(','), function (name) {
                eLms += '<div class="' + name + '">';
                eLms += '' + (Env.ie ? " " : '<p>&nbsp;</p>') + '';
                eLms += '</div>';
            });
            eLms += '' + (Env.ie ? " " : '<br>') + '';
            editor.insertContent(eLms);
        }

        function newRow() {
            var eLms = '<div class="row">' + (Env.ie ? " " : '<br>') + '</div>' + (Env.ie ? " " : '<br>') + '';
            editor.insertContent(eLms);
        }

        function newColumn() {
            var xs_menu_values = [{
                    text: 'None',
                    value: ''
                }];
            for (var z = 1; z <= 12; z++) {
                xs_menu_values.push({
                    text: z.toString() + ' Grid',
                    value: 'col-xs-' + z.toString()
                });
            }
            var sm_menu_values = [{
                    text: 'None',
                    value: ''
                }];
            for (var z = 1; z <= 12; z++) {
                sm_menu_values.push({
                    text: z.toString() + ' Grid',
                    value: 'col-sm-' + z.toString()
                });
            }
            var md_menu_values = [];
            for (var z = 1; z <= 12; z++) {
                md_menu_values.push({
                    text: z.toString() + ' Grid',
                    value: 'col-md-' + z.toString()
                });
            }
            var lg_menu_values = [{
                    text: 'None',
                    value: ''
                }];
            for (var z = 1; z <= 12; z++) {
                lg_menu_values.push({
                    text: z.toString() + ' Grid',
                    value: 'col-lg-' + z.toString()
                });
            }

            function genNewColumn(dialog, data_column) {
                var column_class = '';
                each(data_column, function (classColumn) {
                    column_class += classColumn + ' ';
                });
                var eLms = '';
                eLms += '<div class="' + column_class + '">';
                eLms += '' + (Env.ie ? " " : '<p>&nbsp;</p>') + '';
                eLms += '</div>';
                eLms += '' + (Env.ie ? " " : '<br>') + '';
                win.find('#column_code')[0].value(eLms);
            }
            var data_class_column = {md: 'col-md-3', xs: '', sm: '', lg: ''};
            var win = tinymce.activeEditor.windowManager.open({
                title: 'New Column',
                data_class_column: data_class_column,
                bodyType: "tabpanel",
                body: [
                    {
                        title: "General",
                        type: "form",
                        columns: 1,
                        items: [
                            {
                                name: 'column_md_size',
                                type: 'listbox',
                                label: 'Medium devices',
                                tooltip: 'Extra small devices (phones, less than 768px)',
                                values: md_menu_values,
                                value: data_class_column.md,
                                onselect: function (s) {
                                    data_class_column.md = s.target.state.data.value;
                                    if (window.galau_ui_debug == true) {
                                        console.log('Column => onselect : ', data_class_column);
                                    }
                                    genNewColumn(win, data_class_column);
                                },
                            },
                            {
                                name: 'column_xs_size',
                                type: 'listbox',
                                label: 'Extra small',
                                values: xs_menu_values,
                                value: data_class_column.xs,
                                onselect: function (s) {
                                    data_class_column.xs = s.target.state.data.value;
                                    if (window.galau_ui_debug == true) {
                                        console.log('Column => onselect : ', data_class_column);
                                    }
                                    genNewColumn(win, data_class_column);
                                },
                            },
                            {
                                name: 'column_sm_size',
                                type: 'listbox',
                                label: 'Small devices',
                                values: sm_menu_values,
                                value: data_class_column.sm,
                                onselect: function (s) {
                                    data_class_column.sm = s.target.state.data.value;
                                    if (window.galau_ui_debug == true) {
                                        console.log('Column => onselect : ', data_class_column);
                                    }
                                    genNewColumn(win, data_class_column);
                                },
                            },
                            {
                                name: 'column_lg_size',
                                type: 'listbox',
                                label: 'Large devices',
                                values: lg_menu_values,
                                value: data_class_column.lg,
                                onselect: function (s) {
                                    data_class_column.lg = s.target.state.data.value;
                                    if (window.galau_ui_debug == true) {
                                        console.log('Column => onselect : ', data_class_column);
                                    }
                                    genNewColumn(win, data_class_column);
                                },
                            },
                        ],
                    },
                    /** Display Code **/
                    {
                        title: "Code",
                        type: "form",
                        items:
                                [
                                    {
                                        type: 'label',
                                        text: 'HTML Code',
                                    },
                                    {
                                        flex: 1,
                                        name: "column_code",
                                        type: "textbox",
                                        multiline: true,
                                    },
                                ]
                    },
                    /** Tab About **/
                    {
                        title: "About",
                        type: "form",
                        layout: "grid",
                        items: [
                            {
                                type: "panel",
                                classes: 'gui-about-us',
                                html: "<h2>" + galau_ui_title + "</h2><h4>Created by <a href='http://ihsana.com/jasman/'>Jasman</a></h4><p>" + galau_ui_desc + "</p>",
                                style: "background:#fff",
                            },
                        ]
                    }
                ],
                onsubmit: function () {
                    editor.undoManager.transact(function () {
                        genNewColumn(win, data_class_column);
                        var grid = win.find('#column_code')[0].value();
                        editor.insertContent(grid);
                    });
                }
            });
            genNewColumn(win, data_class_column);
        }
        editor.on('init', function () {
            editor.addContextToolbar('div.container,div.container-fluid', 'gui_bs_container | undo redo | gui_bs_container_remove');
            editor.addContextToolbar('div.row', 'gui_bs_row | undo redo | gui_bs_row_remove');
            editor.addContextToolbar(classes_column.join(':not(.container),'), 'gui_bs_column gui_editable | undo redo | gui_bs_column_remove');
            editor.addContextToolbar('div.well', 'gui_bs_well undo redo | gui_bs_well_remove');
            editor.addContextToolbar('div.jumbotron', 'gui_bs_jumbotron undo redo | gui_bs_jumbotron_remove');
        });
    });
})();