/**
 * @author Jasman <jasman@ihsana.com>
 * @copyright Ihsana IT Solutiom 2015
 * @package Galau UI
 * tinymce.init({
 *      plugins:["gui_dashicons",...],
 *      toolbar1:[""gui_dashicons|..."],
 *      gui_dashicons:{menu:true,css:{exist:false, external:'http://ihsana.web.id/jz-includes/css/font-awesome/css/font-awesome.min.css'}},
 * });
 */
tinymce.PluginManager.add('gui_dashicons', function(editor, url) {
	var icon_text = 'Dashicons';
	var icon_selector = 'span.dashicons';
	var icon_name = 'gui_dashicons';
	var icon_class = 'dashicons guicon guicon-dashicons';
	var icon_command = 'showGuiDashicons';
	var css_list = [url + '/assets/css/plugin.min.css'];
	var galau_ui_title = 'Galau UI - Dashicons';
	var galau_ui_desc = 'Dashicons is the official icon font of the WordPress';
	var icon_list = [
		["Menu", "dashicons dashicons-menu"],
		["Site", "dashicons dashicons-admin-site"],
		["Dashboard", "dashicons dashicons-dashboard"],
		["Post", "dashicons dashicons-admin-post"],
		["Media", "dashicons dashicons-admin-media"],
		["Links", "dashicons dashicons-admin-links"],
		["Page", "dashicons dashicons-admin-page"],
		["Comments", "dashicons dashicons-admin-comments"],
		["Appearance", "dashicons dashicons-admin-appearance"],
		["Plugins", "dashicons dashicons-admin-plugins"],
		["Users", "dashicons dashicons-admin-users"],
		["Tools", "dashicons dashicons-admin-tools"],
		["Settings", "dashicons dashicons-admin-settings"],
		["Network", "dashicons dashicons-admin-network"],
		["Home", "dashicons dashicons-admin-home"],
		["Generic", "dashicons dashicons-admin-generic"],
		["Collapse", "dashicons dashicons-admin-collapse"],
		["Filter", "dashicons dashicons-filter"],
		["Customizer", "dashicons dashicons-admin-customizer"],
		["Multisite", "dashicons dashicons-admin-multisite"],
		["Write Blog", "dashicons dashicons-welcome-write-blog"],
		["Add Page", "dashicons dashicons-welcome-add-page"],
		["View Site", "dashicons dashicons-welcome-view-site"],
		["Widgets And Menus", "dashicons dashicons-welcome-widgets-menus"],
		["Comments", "dashicons dashicons-welcome-comments"],
		["Learn More", "dashicons dashicons-welcome-learn-more"],
		["Aside", "dashicons dashicons-format-aside"],
		["Image", "dashicons dashicons-format-image"],
		["Gallery", "dashicons dashicons-format-gallery"],
		["Video", "dashicons dashicons-format-video"],
		["Status", "dashicons dashicons-format-status"],
		["Quote", "dashicons dashicons-format-quote"],
		["Chat", "dashicons dashicons-format-chat"],
		["Audio", "dashicons dashicons-format-audio"],
		["Camera", "dashicons dashicons-camera"],
		["Images (alt)", "dashicons dashicons-images-alt"],
		["Images (alt 2)", "dashicons dashicons-images-alt2"],
		["Video (alt)", "dashicons dashicons-video-alt"],
		["Video (alt 2)", "dashicons dashicons-video-alt2"],
		["Video (alt 3)", "dashicons dashicons-video-alt3"],
		["Archive", "dashicons dashicons-media-archive"],
		["Audio", "dashicons dashicons-media-audio"],
		["Code", "dashicons dashicons-media-code"],
		["Default", "dashicons dashicons-media-default"],
		["Document", "dashicons dashicons-media-document"],
		["Interactive", "dashicons dashicons-media-interactive"],
		["Spreadsheet", "dashicons dashicons-media-spreadsheet"],
		["Text", "dashicons dashicons-media-text"],
		["Video", "dashicons dashicons-media-video"],
		["Audio Playlist", "dashicons dashicons-playlist-audio"],
		["Video Playlist", "dashicons dashicons-playlist-video"],
		["Play Player", "dashicons dashicons-controls-play"],
		["Player Pause", "dashicons dashicons-controls-pause"],
		["Player Forward", "dashicons dashicons-controls-forward"],
		["Player Skip Forward", "dashicons dashicons-controls-skipforward"],
		["Player Back", "dashicons dashicons-controls-back"],
		["Player Skip Back", "dashicons dashicons-controls-skipback"],
		["Player Repeat", "dashicons dashicons-controls-repeat"],
		["Player Volume On", "dashicons dashicons-controls-volumeon"],
		["Player Volume Off", "dashicons dashicons-controls-volumeoff"],
		["Crop", "dashicons dashicons-image-crop"],
		["Rotate", "dashicons dashicons-image-rotate"],
		["Rotate Left", "dashicons dashicons-image-rotate-left"],
		["Rotate Right", "dashicons dashicons-image-rotate-right"],
		["Flip Vertical", "dashicons dashicons-image-flip-vertical"],
		["Flip Horizontal", "dashicons dashicons-image-flip-horizontal"],
		["Filter", "dashicons dashicons-image-filter"],
		["Undo", "dashicons dashicons-undo"],
		["Redo", "dashicons dashicons-redo"],
		["Bold", "dashicons dashicons-editor-bold"],
		["Italic", "dashicons dashicons-editor-italic"],
		["Ul", "dashicons dashicons-editor-ul"],
		["Ol", "dashicons dashicons-editor-ol"],
		["Quote", "dashicons dashicons-editor-quote"],
		["Alignleft", "dashicons dashicons-editor-alignleft"],
		["Aligncenter", "dashicons dashicons-editor-aligncenter"],
		["Alignright", "dashicons dashicons-editor-alignright"],
		["Insertmore", "dashicons dashicons-editor-insertmore"],
		["Spellcheck", "dashicons dashicons-editor-spellcheck"],
		["Expand", "dashicons dashicons-editor-expand"],
		["Contract", "dashicons dashicons-editor-contract"],
		["Kitchen Sink", "dashicons dashicons-editor-kitchensink"],
		["Underline", "dashicons dashicons-editor-underline"],
		["Justify", "dashicons dashicons-editor-justify"],
		["Textcolor", "dashicons dashicons-editor-textcolor"],
		["Paste", "dashicons dashicons-editor-paste-word"],
		["Paste", "dashicons dashicons-editor-paste-text"],
		["Remove Formatting", "dashicons dashicons-editor-removeformatting"],
		["Video", "dashicons dashicons-editor-video"],
		["Custom Character", "dashicons dashicons-editor-customchar"],
		["Outdent", "dashicons dashicons-editor-outdent"],
		["Indent", "dashicons dashicons-editor-indent"],
		["Help", "dashicons dashicons-editor-help"],
		["Strikethrough", "dashicons dashicons-editor-strikethrough"],
		["Unlink", "dashicons dashicons-editor-unlink"],
		["Rtl", "dashicons dashicons-editor-rtl"],
		["Break", "dashicons dashicons-editor-break"],
		["Code", "dashicons dashicons-editor-code"],
		["Paragraph", "dashicons dashicons-editor-paragraph"],
		["Table", "dashicons dashicons-editor-table"],
		["Align Left", "dashicons dashicons-align-left"],
		["Align Right", "dashicons dashicons-align-right"],
		["Align Center", "dashicons dashicons-align-center"],
		["Align None", "dashicons dashicons-align-none"],
		["Lock", "dashicons dashicons-lock"],
		["Unlock", "dashicons dashicons-unlock"],
		["Calendar", "dashicons dashicons-calendar"],
		["Calendar", "dashicons dashicons-calendar-alt"],
		["Visibility", "dashicons dashicons-visibility"],
		["Hidden", "dashicons dashicons-hidden"],
		["Post Status", "dashicons dashicons-post-status"],
		["Edit Pencil", "dashicons dashicons-edit"],
		["Trash Remove Delete", "dashicons dashicons-trash"],
		["Sticky", "dashicons dashicons-sticky"],
		["External", "dashicons dashicons-external"],
		["Arrow-up", "dashicons dashicons-arrow-up"],
		["Arrow-down", "dashicons dashicons-arrow-down"],
		["Arrow-right", "dashicons dashicons-arrow-right"],
		["Arrow-left", "dashicons dashicons-arrow-left"],
		["Arrow-up", "dashicons dashicons-arrow-up-alt"],
		["Arrow-down", "dashicons dashicons-arrow-down-alt"],
		["Arrow-right", "dashicons dashicons-arrow-right-alt"],
		["Arrow-left", "dashicons dashicons-arrow-left-alt"],
		["Arrow-up", "dashicons dashicons-arrow-up-alt2"],
		["Arrow-down", "dashicons dashicons-arrow-down-alt2"],
		["Arrow-right", "dashicons dashicons-arrow-right-alt2"],
		["Arrow-left", "dashicons dashicons-arrow-left-alt2"],
		["Sort", "dashicons dashicons-sort"],
		["Left Right", "dashicons dashicons-leftright"],
		["Randomize Shuffle", "dashicons dashicons-randomize"],
		["List View", "dashicons dashicons-list-view"],
		["Exerpt View", "dashicons dashicons-exerpt-view"],
		["Grid View", "dashicons dashicons-grid-view"],
		["Share", "dashicons dashicons-share"],
		["Share", "dashicons dashicons-share-alt"],
		["Share", "dashicons dashicons-share-alt2"],
		["Twitter Social", "dashicons dashicons-twitter"],
		["Rss", "dashicons dashicons-rss"],
		["Email", "dashicons dashicons-email"],
		["Email", "dashicons dashicons-email-alt"],
		["Facebook Social", "dashicons dashicons-facebook"],
		["Facebook Social", "dashicons dashicons-facebook-alt"],
		["Googleplus Social", "dashicons dashicons-googleplus"],
		["Networking Social", "dashicons dashicons-networking"],
		["Hammer Development", "dashicons dashicons-hammer"],
		["Art Design", "dashicons dashicons-art"],
		["Migrate Migration", "dashicons dashicons-migrate"],
		["Performance", "dashicons dashicons-performance"],
		["Universal Access Accessibility", "dashicons dashicons-universal-access"],
		["Universal Access Accessibility", "dashicons dashicons-universal-access-alt"],
		["Tickets", "dashicons dashicons-tickets"],
		["Nametag", "dashicons dashicons-nametag"],
		["Clipboard", "dashicons dashicons-clipboard"],
		["Heart", "dashicons dashicons-heart"],
		["Megaphone", "dashicons dashicons-megaphone"],
		["Schedule", "dashicons dashicons-schedule"],
		["Wordpress", "dashicons dashicons-wordpress"],
		["Wordpress", "dashicons dashicons-wordpress-alt"],
		["Press This", "dashicons dashicons-pressthis"],
		["Update", "dashicons dashicons-update"],
		["Screenoptions", "dashicons dashicons-screenoptions"],
		["Info", "dashicons dashicons-info"],
		["Cart Shopping", "dashicons dashicons-cart"],
		["Feedback Form", "dashicons dashicons-feedback"],
		["Cloud", "dashicons dashicons-cloud"],
		["Translation Language", "dashicons dashicons-translation"],
		["Tag", "dashicons dashicons-tag"],
		["Category", "dashicons dashicons-category"],
		["Archive", "dashicons dashicons-archive"],
		["Tagcloud", "dashicons dashicons-tagcloud"],
		["Text", "dashicons dashicons-text"],
		["Yes Check Checkmark", "dashicons dashicons-yes"],
		["No X", "dashicons dashicons-no"],
		["No X", "dashicons dashicons-no-alt"],
		["Plus Add Increase", "dashicons dashicons-plus"],
		["Plus Add Increase", "dashicons dashicons-plus-alt"],
		["Minus Decrease", "dashicons dashicons-minus"],
		["Dismiss", "dashicons dashicons-dismiss"],
		["Marker", "dashicons dashicons-marker"],
		["Filled Star", "dashicons dashicons-star-filled"],
		["Half Star", "dashicons dashicons-star-half"],
		["Empty Star", "dashicons dashicons-star-empty"],
		["Flag", "dashicons dashicons-flag"],
		["Warning", "dashicons dashicons-warning"],
		["Location Pin", "dashicons dashicons-location"],
		["Location", "dashicons dashicons-location-alt"],
		["Vault Safe", "dashicons dashicons-vault"],
		["Shield", "dashicons dashicons-shield"],
		["Shield", "dashicons dashicons-shield-alt"],
		["Sos Help", "dashicons dashicons-sos"],
		["Search", "dashicons dashicons-search"],
		["Slides", "dashicons dashicons-slides"],
		["Analytics", "dashicons dashicons-analytics"],
		["Pie Chart", "dashicons dashicons-chart-pie"],
		["Bar Chart", "dashicons dashicons-chart-bar"],
		["Line Chart", "dashicons dashicons-chart-line"],
		["Area Chart", "dashicons dashicons-chart-area"],
		["Groups", "dashicons dashicons-groups"],
		["Businessman", "dashicons dashicons-businessman"],
		["Id", "dashicons dashicons-id"],
		["Id", "dashicons dashicons-id-alt"],
		["Products", "dashicons dashicons-products"],
		["Awards", "dashicons dashicons-awards"],
		["Forms", "dashicons dashicons-forms"],
		["Testimonial", "dashicons dashicons-testimonial"],
		["Portfolio", "dashicons dashicons-portfolio"],
		["Book", "dashicons dashicons-book"],
		["Book", "dashicons dashicons-book-alt"],
		["Download", "dashicons dashicons-download"],
		["Upload", "dashicons dashicons-upload"],
		["Backup", "dashicons dashicons-backup"],
		["Clock", "dashicons dashicons-clock"],
		["Lightbulb", "dashicons dashicons-lightbulb"],
		["Microphone Mic", "dashicons dashicons-microphone"],
		["Desktop Monitor", "dashicons dashicons-desktop"],
		["Tablet Ipad", "dashicons dashicons-tablet"],
		["Smartphone Iphone", "dashicons dashicons-smartphone"],
		["Phone", "dashicons dashicons-phone"],
		["Index Card", "dashicons dashicons-index-card"],
		["Carrot Food Vendor", "dashicons dashicons-carrot"],
		["Building", "dashicons dashicons-building"],
		["Store", "dashicons dashicons-store"],
		["Album", "dashicons dashicons-album"],
		["Palm Tree", "dashicons dashicons-palmtree"],
		["Tickets (alt)", "dashicons dashicons-tickets-alt"],
		["Money", "dashicons dashicons-money"],
		["Smiley Smile", "dashicons dashicons-smiley"],
		["Thumbs Up", "dashicons dashicons-thumbs-up"],
		["Thumbs Down", "dashicons dashicons-thumbs-down"],
		["Layout", "dashicons dashicons-layout"]
	];
	var config = '';
	if (typeof editor.settings[icon_name] === 'object') {
		var config = editor.settings[icon_name];
	}
	var display_menu = true;
	var display_toolbar_text = true;
	if (typeof config === 'object') {
		if (typeof config.css !== 'undefined') {
			if (!config.css.exist) {
				if (!config.css.external) {
					css_list.push(url + '/assets/css/dashicons.min.css');
					if (window.galau_ui_debug == true) {
						console.log('dashicons => css : internal');
					}
				} else {
					css_list.push(config.css.external);
					if (window.galau_ui_debug == true) {
						console.log('dashicons => css : external');
					}
				}
			} else {
				if (window.galau_ui_debug == true) {
					console.log('dashicons => css : exist');
				}
			}
		} else {
			css_list.push(url + '/assets/css/dashicons.min.css');
			if (window.galau_ui_debug == true) {
				console.log('dashicons => css : internal');
			}
		}
		if (config.toolbar_text) {
			display_toolbar_text = true;
		} else {
			display_toolbar_text = false;
		}
		if (config.menu) {
			display_menu = true;
		} else {
			display_menu = false;
		}
	} else {
		css_list.push(url + '/assets/css/dashicons.min.css');
		if (window.galau_ui_debug == true) {
			console.log('dashicons => css : internal');
		}
	}

	function showDialog(callback) {
		if (!callback) {
			callback = false;
		}
		//set current icon
		var selection = editor.selection;
		var dom = editor.dom;
		//window.console && console.log(icon_class);

		function getParentTd(elm) {
			while (elm) {
				if (elm.nodeName == 'TD') {
					return elm;
				}
				elm = elm.parentNode;
			}
		}

		function displayIcons(icons_list, obj) {
			var newTable, gridHtml, x, y, win;
			gridHtml = '<table role="presentation" cellspacing="0" ><tbody>';
			var width = 15;
			var height = Math.ceil(icons_list.length / width);
			for (y = 0; y < height; y++) {
				gridHtml += '<tr>';
				for (x = 0; x < width; x++) {
					var index = y * width + x;
					if (index < icons_list.length) {
						var chr = icons_list[index];
						gridHtml += '<td title="' + chr[0] + '" data-icon="' + chr[1] + '" ><div tabindex="-1" title="' + chr[0] + '" role="button"><span class="' + chr[1] + '"></span></div></td>';
					} else {
						gridHtml += '<td />';
					}
				}
				gridHtml += '</tr>';
			}
			gridHtml += '</tbody></table>';
			if (obj == true) {
				newTable = document.createElement('div');
				newTable.setAttribute('id', 'icon-table');
				newTable.setAttribute('class', 'mce-icon-table');
				newTable.innerHTML = gridHtml;
			} else {
				newTable = '<div class="mce-icon-table" id="icon-table">';
				newTable += gridHtml;
				newTable += '</div>';
			}
			return newTable;
		}

		function onSearch(keyword) {
			var filter = [];
			//icon_list
			for (var x = 0; x < icon_list.length; x++) {
				var chr = icon_list[x];
				if (chr[1].toLowerCase().indexOf(keyword) >= 0) {
					filter.push(chr);
				}
			};
			var newTable = displayIcons(filter, true);
			var oldTable = document.querySelector('#icon-table');
			oldTable.parentNode.replaceChild(newTable, oldTable);
			//window.console && console.log(newTable);
		}
		win = editor.windowManager.open({
			title: galau_ui_title,
			classes: icon_name + '-panel',
			bodyType: "tabpanel",
			body: [{
				title: "General",
				type: 'container',
				layout: 'flex',
				spacing: 10,
				padding: 10,
				items: [{
					type: 'container',
					classes: 'icon-table',
					html: '<div class="mce-icon-box" id="icon-box">' + displayIcons(icon_list, false) + '</div>',
					spacing: 10,
					minHeight: 300,
					onclick: function(e) {
						var td = getParentTd(e.target);
						if (typeof callback === 'string') {
							editor.settings[callback](td.getAttribute('data-icon'));
							win.close();
						} else {
							var icon_markup = '<span class="' + td.getAttribute('data-icon') + '"></span> <span data-mce-bogus="1"/>';
							editor.execCommand('mceInsertContent', false, icon_markup);
							if (!e.ctrlKey) {
								win.close();
							}
						}
					},
					onmouseover: function(e) {
						var td = getParentTd(e.target);
						var preview = document.getElementById('icon_preview');
						if (td && td.firstChild) {
							preview.setAttribute('class', td.getAttribute('data-icon'));
							win.find('#icon_title_preview').text(td.title);
						} else {
							preview.setAttribute('class', ' ');
							win.find('#icon_title_preview').text(' ');
						}
					}
				},
				{
					type: 'container',
					layout: 'flex',
					direction: 'column',
					align: 'center',
					spacing: 5,
					minWidth: 160,
					minHeight: 40,
					items: [{
						type: 'panel',
						name: 'preview',
						html: '<span style="margin:10px;font-size:60px;width:60px;height:60px;text-align: center" id="icon_preview"></span>',
						style: 'text-align:center;background:#fff;',
						border: 1,
						width: 80,
						minHeight: 80
					},
					{
						type: 'label',
						name: 'icon_title_preview',
						text: ' ',
						style: 'text-align: center',
						border: 1,
						minWidth: 140,
						minHeight: 36
					}]
				}, ],
			},
			{
				title: "About",
				type: "form",
				layout: "grid",
				items: [{
					type: "panel",
					classes: 'about-us',
					html: "<h2>" + galau_ui_title + "</h2><h4>Created by <a href='http://ihsana.com/jasman/'>Jasman</a></h4><p>" + galau_ui_desc + "</p>",
					style: "background-color:transparent",
				}, ]
			}],
			buttons: [{
				text: "Close",
				onclick: function() {
					win.close();
				},
			}],
		});
		var selectedElm = selection.getNode();
		var spanElm = dom.getParent(selectedElm, 'span[class]');
		if ((value = dom.getAttrib(spanElm, 'class'))) {
			var preview = document.querySelector('#icon_preview');
			preview.setAttribute('class', value);
		}
		var footPanel = document.querySelector('.mce-' + icon_name + '-panel .mce-foot .mce-container-body');
		var search_icon = tinymce.ui.Factory.create({
			type: 'container',
			classes: 'icon-search-container',
			items: [{
				type: 'textbox',
				onkeyup: function(e) {
					onSearch(e.target.value)
				},
				label: 'Search',
				size: 24,
			}, ]
		}).renderTo(footPanel).reflow();
	}
	// inline menu icon
	editor.addButton(icon_name + '_remove', {
		icon: 'remove',
		onclick: function() {
			var $_ = tinymce.dom.DomQuery;
			var spanElm = editor.dom.getParent(editor.selection.getStart(), icon_selector);
			if (spanElm) {
				editor.undoManager.transact(function() {
					$_(spanElm).replaceWith('');
				});
			}
		},
	});
	editor.on('init', function() {
		editor.addContextToolbar(icon_selector, icon_name + ' undo redo | ' + icon_name + '_remove');
	});
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
		console.log('dashicons => valid: ', editor.settings.valid_elements);
		console.log('dashicons => extended_valid: ', editor.settings.extended_valid_elements);
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
	var toolbar_text = '';
	if (display_toolbar_text) {
		toolbar_text = icon_text;
	}
	editor.addCommand(icon_command, showDialog);
	// Add to button
	editor.addButton(icon_name, {
		icon: icon_class,
		text: toolbar_text,
		tooltip: icon_text,
		cmd: icon_command,
		stateSelector: icon_selector,
	});
	if (display_menu == true) {
		// Add to menu
		editor.addMenuItem(icon_name, {
			icon: icon_class,
			text: icon_text,
			cmd: icon_command,
			stateSelector: icon_selector,
			context: 'insert',
		});
	}
	//callback
	if (!editor.settings[icon_command]) {
		editor.settings[icon_command] = showDialog;
	}
	var iconPicker = [{
		value: 'none',
		text: 'None'
	}];
	//register to iconPicker
	if (typeof editor.settings.gui_icon_picker === 'object') {
		iconPicker = editor.settings.gui_icon_picker;
	}
	iconPicker.push({
		value: icon_command,
		text: icon_text
	});
	editor.settings.gui_icon_picker = iconPicker
});