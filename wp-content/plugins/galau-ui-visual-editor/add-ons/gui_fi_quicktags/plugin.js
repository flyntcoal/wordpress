/**
 * @author Jasman <jasman@ihsana.com>
 * @copyright Ihsana IT Solutiom 2015
 * @package Galau UI
 */
(function() {
	tinymce.PluginManager.add('gui_fi_quicktags', function(editor, url) {
		var $_ = tinymce.dom.DomQuery;
		var dom = editor.dom;
		var each = tinymce.util.Tools.each;
		var Env = tinymce.Env;
		var self = this;
		var plugin_name = 'gui_fi_quicktags';
		var css_list = [url + '/assets/css/plugin.min.css'];
		var config = '';
		var classes_column = [];
		
		for (var z = 1; z <= 12; z++) {
			classes_column.push('.medium-' + z.toString());
			classes_column.push('.small-' + z.toString());
			classes_column.push('.large-' + z.toString());
			
			classes_column.push('.medium-offset-' + z.toString());
			classes_column.push('.small-offset-' + z.toString());
			classes_column.push('.large-offset-' + z.toString());
		}
		
		if (window.galau_ui_debug == true) {
			console.log('quicktags => column: ', classes_column);
		}
		var alert_plugin_error = ' not installed!';
        
		if (typeof editor.settings[plugin_name] === 'object') {
			var config = editor.settings[plugin_name];
		}
		var display_menu = true;
		if (typeof config === 'object') {
			if (typeof config.css !== 'undefined') {
				if (!config.css.exist) {
					if (!config.css.external) {
						css_list.push(url + '/assets/css/foundation.min.css');
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
				css_list.push(url + '/assets/css/foundation.min.css');
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
			css_list.push(url + '/assets/css/foundation.min.css');
			if (window.galau_ui_debug == true) {
				console.log('quicktags => css: internal');
			}
		}
		// Include CSS 
		if (typeof editor.settings.content_css !== 'undefined') {
			if (typeof editor.settings.content_css.push === "function") {
				for (var i = 0; i < css_list.length; i++) {
					editor.settings.content_css.push(css_list[i]);
				};
			} else if (typeof editor.settings.content_css === "string") {
				editor.settings.content_css = [editor.settings.content_css];
				for (var i = 0; i < css_list.length; i++) {
					editor.settings.content_css.push(css_list[i]);
				};
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
		editor.on('init', function() {
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
		
		editor.on('init', function() {
			//Foundation Format
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
				}
                ],
				aligncenter: [
                {
					selector: 'figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li',
					classes: 'text-center',
					defaultBlock: 'div'
				}
                ],
				alignright: [
                {
					selector: 'figure.image',
					collapsed: false,
					classes: 'text-right',
					ceFalseOverride: true
				},
				{
					selector: 'figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li',
					classes: 'text-right',
					defaultBlock: 'div'
				}
                ],
                
				alignjustify: [
                {
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
				
				/** DIV CONTAINER - ROW **/
				divRow: {
					block: 'div',
					classes: 'row',
				},
				listUnstyled: {
					selector: 'ul,ol',
					classes: 'no-bullet'
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
			text: "Button Primary",
			value: "button primary"
		},
		{
			text: "Button Secondary",
			value: "button secondary",
		},
		{
			text: "Button Warning",
			value: "button warning"
		},
		{
			text: "Button Alert",
			value: "button alert"
		},
		{
			text: "Button Disabled",
			value: "hollow button disabled"
		},
		{
			text: "Button Primary + Hollow",
			value: "hollow button primary"
		},
		{
			text: "Button Secondary + Hollow",
			value: "hollow button secondary",
		},
		{
			text: "Button Warning + Hollow",
			value: "hollow button warning"
		},
		{
			text: "Button Alert + Hollow",
			value: "hollow button alert"
		},
		{
			text: "Button Disabled + Hollow",
			value: "hollow button disabled"
		},        
        ];

		function applyListFormat(format) {
			editor.undoManager.transact(function() {
				each('listUnstyled'.split(' '), function(name) {
					editor.formatter.remove(name);
				});
				editor.formatter.apply(format);
			});
		}

		function applyListFormatRemove() {
			editor.undoManager.transact(function() {
				each('listUnstyled'.split(' '), function(name) {
					editor.formatter.remove(name);
				});
			});
		}
		editor.addButton('gui_fi_container', {
			type: 'splitbutton',
			text: 'Container',
			icon: 'gui_fi_quicktags guicon guicon-grid',
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
				onclick: function() {
					applyListFormat('listUnstyled');
				},
			},
			{
				text: 'List Inline',
				onclick: function() {
					applyListFormat('listInline');
				},
			},
			{
				text: 'List Group',
				onclick: function() {
					applyListFormat('listGroup');
				},
			}, ]
		});
		editor.addButton('gui_typo_olul_remove', {
			icon: 'remove',
			tooltip: 'remove this container',
			stateSelector: 'ul,ul',
			onclick: function() {
				applyListFormatRemove()
			},
		});
		editor.addButton('gui_typo_dl_remove', {
			icon: 'remove',
			tooltip: 'remove this container',
			stateSelector: 'dl',
			onclick: function() {
				applyListFormatRemove()
			},
		});
		editor.addButton('gui_typo_dl', {
			type: 'splitbutton',
			text: 'List',
			icon: 'bullist',
			menu: [{
				text: 'List Horizontal',
				onclick: function() {
					applyListFormat('listHorizontal');
				},
			}]
		});
        


		editor.addButton('gui_fi_row_remove', {
			icon: 'remove',
			tooltip: 'remove this row',
			stateSelector: '.row',
			onclick: function() {
				var divElm = editor.dom.getParent(editor.selection.getStart(), '.row');
				if (divElm) {
					editor.undoManager.transact(function() {
						$_(divElm).replaceWith('');
					});
				}
			},
		});
		editor.addButton('gui_fi_row', {
			type: 'splitbutton',
			text: 'Row',
			icon: 'gui_fi_quicktags guicon guicon-grid',
			menu: [{
				text: '+ Custom Column...',
				onclick: newColumn,
			},
			{
				text: '-',
			},
			{
				text: '2 Column (2 x 6 grid)',
				onclick: function() {
					newFixColumn('medium-6,medium-6');
				},
			},
			{
				text: '3 Column (3 x 4 grid)',
				onclick: function() {
					newFixColumn('medium-4,medium-4,medium-4');
				}
			},
			{
				text: '4 Column (4 x 3 grid)',
				onclick: function() {
					newFixColumn('medium-3,medium-3,medium-3,medium-3');
				}
			},
			{
				text: '6 Column (6 x 2 grid)',
				onclick: function() {
					newFixColumn('medium-2,medium-2,medium-2,medium-2,medium-2,medium-2');
				}
			},
			{
				text: '2 Column (7 grid + 5 grid)',
				onclick: function() {
					newFixColumn('medium-7,medium-5');
				}
			},
			{
				text: '2 Column (5 grid + 7 grid)',
				onclick: function() {
					newFixColumn('medium-5,medium-7');
				}
			},
			{
				text: '3 Column (3 grid + 6 grid + 3 grid)',
				onclick: function() {
					newFixColumn('medium-3,medium-6,medium-3');
				}
			}, ]
		});
        
		editor.addButton('gui_fi_column', {
			text: 'Column',
			icon: 'gui_fi_quicktags guicon guicon-grid',
            onclick: newColumn,
		});
        
		editor.addButton('gui_fi_column_remove', {
			icon: 'remove',
			tooltip: 'remove this column',
			stateSelector: classes_column.join(','),
			onclick: function() {
				var divElm = editor.dom.getParent(editor.selection.getStart(), classes_column.join(','));
				if (divElm) {
					editor.undoManager.transact(function() {
						$_(divElm).replaceWith('');
					});
				}
			},
		});
 

 
 
        
        var menuQuicktags = [{
				text: 'Grid System',
				icon: 'gui_fi_quicktags guicon guicon-grid',
				menu: [
				{
					text: 'Insert Column',
					menu: [{
						text: '2 Column (2 x 6 grid)',
						onclick: function() {
							newFixColumn('medium-6,medium-6');
						},
					},
					{
						text: '3 Column (3 x 4 grid)',
						onclick: function() {
							newFixColumn('medium-4,medium-4,medium-4');
						}
					},
					{
						text: '4 Column (4 x 3 grid)',
						onclick: function() {
							newFixColumn('medium-3,medium-3,medium-3,medium-3');
						}
					},
					{
						text: '6 Column (6 x 2 grid)',
						onclick: function() {
							newFixColumn('medium-2,medium-2,medium-2,medium-2,medium-2,medium-2');
						}
					},
					{
						text: '-',
					},
					{
						text: '2 Column (7 grid + 5 grid)',
						onclick: function() {
							newFixColumn('medium-7,medium-5');
						}
					},
					{
						text: '2 Column (5 grid + 7 grid)',
						onclick: function() {
							newFixColumn('medium-5,medium-7');
						}
					},
					{
						text: '3 Column (3 grid + 6 grid + 3 grid)',
						onclick: function() {
							newFixColumn('medium-3,medium-6,medium-3');
						}
					}, ],
				},
				{
					text: 'Rows',
					onclick: newRow
				},
				{
					text: 'Column',
					onclick: newColumn,
				}, ]
			},
			{
				text: 'Typography',
				icon: 'gui_fi_quicktags guicon guicon-text',
				menu: [{
					text: 'Paragraph Lead',
					onclick: function() {
						var pElm = editor.dom.getParent(editor.selection.getStart(), 'p');
						if (window.galau_ui_debug == true) {
							console.log('Paragraph => ', pElm);
						}
						if (pElm == null) {
							var win = tinymce.activeEditor.windowManager.open({
								title: 'Galau UI - Foundation Paragraph Lead',
								body: [{
									name: 'paragraph_lead',
									type: 'textbox',
									multiline: true,
									width: 400,
									height: 120,
								}, ],
								onsubmit: function() {
									var pText = win.find('#paragraph_lead')[0].value();
									var eLms = '';
									eLms += '<p class="lead">' + pText + '</p>';
									editor.insertContent(eLms);
								}
							});
						} else {
							editor.undoManager.transact(function() {
								editor.formatter.apply('pLead');
							});
						}
					}
				}]
			},
			{
				text: 'Components',
				icon: 'gui_fi_quicktags guicon guicon-tab',
				menu: [
				{
					text: "Label",
					icon: 'gui_fi_quicktags guicon guicon-label',
					onclick: function() {
						if (typeof editor.settings.showGuiFoundationLabel === 'function') {
							editor.settings.showGuiFoundationLabel();
						} else {
							tinymce.activeEditor.windowManager.alert('GUI - Foundation Label Plugin ' + alert_plugin_error);
						}
					}
				},
				{
					text: "Icons",
					icon: 'gui_fi_quicktags guicon guicon-foundation_icons',
					menu: [
                    {
						text: 'Font Awesome',
						icon: 'gui_fi_quicktags guicon guicon-fontawesome',
						onclick: function() {
							if (typeof editor.settings.showGuiFontAwesome === 'function') {
								editor.settings.showGuiFontAwesome();
							} else {
								tinymce.activeEditor.windowManager.alert('GUI - Font Awesome Plugin ' + alert_plugin_error);
							}
						}
					},
					{
						text: 'Dashicons',
						icon: 'gui_fi_quicktags guicon guicon-dashicons',
						onclick: function() {
							if (typeof editor.settings.showGuiDashicons === 'function') {
								editor.settings.showGuiDashicons();
							} else {
								tinymce.activeEditor.windowManager.alert('GUI - Dashicons Plugin ' + alert_plugin_error);
							}
						}
					},
					{
						text: 'Foundation Icons',
						icon: 'gui_fi_quicktags guicon guicon-foundation_icons',
						onclick: function() {
							if (typeof editor.settings.showGuiFoundationIcons === 'function') {
								editor.settings.showGuiFoundationIcons();
							} else {
								tinymce.activeEditor.windowManager.alert('GUI - Foundation Icon Plugin ' + alert_plugin_error);
							}
						}
					}, ]
				}, ],
			},
			{
				text: "Table",
				icon: 'gui_fi_quicktags  guicon guicon-table',
				onclick: function() {
					if (typeof editor.settings.showGuiFoundationTable === 'function') {
						editor.settings.showGuiFoundationTable();
					} else {
						tinymce.activeEditor.windowManager.alert('GUI - foundation Table Plugin ' + alert_plugin_error);
					}
				}
			},
			{
				text: "Images",
				icon: 'gui_fi_quicktags guicon guicon-image',
				onclick: function() {
					if (typeof editor.settings.showGuiFoundationImages === 'function') {
						editor.settings.showGuiFoundationImages();
					} else {
						tinymce.activeEditor.windowManager.alert('GUI - foundation Image Plugin ' + alert_plugin_error);
					}
				}
			}, /** button MENU **/ 
            {
				text: 'Buttons',
				icon: 'gui_fi_quicktags guicon guicon-button',
				onclick: function() {
					if (typeof editor.settings.showGuiFoundationButtons === 'function') {
						editor.settings.showGuiFoundationButtons();
					} else {
						tinymce.activeEditor.windowManager.alert('GUI - Foundation Buttons Plugin '  + alert_plugin_error);
					}
				}
			}, 
            ];
            
		editor.addButton('gui_fi_quicktags', {
			type: 'splitbutton',
			tooltip: 'Foundation Quick Button',
			text: 'Foundation',
			icon: 'gui_fi_quicktags guicon guicon-foundation',
			menu: menuQuicktags
		});

 
		editor.addMenuItem('gui_fi_quicktags', {
			icon: 'gui_fi_quicktags guicon guicon-foundation',
			text: 'Foundation',
			context: 'insert',
            	menu: menuQuicktags
		});
 
    	
    

		function newFixColumn(data) {
			var eLms = '';
			each(data.split(','), function(name) {
				eLms += '<div class="' + name + ' columns">';
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
			var menu_values = [];
			for (var z = 1; z <= 12; z++) {
				menu_values.push({
					text: z.toString() + ' Grid',
					value: 'medium-' + z.toString()
				});
			}
			var win = tinymce.activeEditor.windowManager.open({
				title: 'Column',
				width: 300,
				height: 80,
				body: [{
					name: 'column_size',
					type: 'listbox',
					label: 'Size',
					values: menu_values,
				}, ],
				onsubmit: function() {
					var grid = win.find('#column_size')[0].value();
					var eLms = '';
					eLms += '<div class=" ' + grid + ' columns">';
					eLms += '' + (Env.ie ? " " : '<p>&nbsp;</p>') + '';
					eLms += '</div>';
					eLms += '' + (Env.ie ? " " : '<br>') + '';
					editor.insertContent(eLms);
				}
			});
		}
		editor.on('init', function() {
			editor.addContextToolbar('div.row', 'gui_fi_row | undo redo | gui_fi_row_remove');
			editor.addContextToolbar(classes_column.join(','), 'gui_fi_column | undo redo | gui_fi_column_remove');           
		});
	});
})();