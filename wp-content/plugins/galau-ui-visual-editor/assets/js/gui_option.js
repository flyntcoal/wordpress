/*global ajaxurl, isRtl */
(function($) {
	function filterAddOns() {
		$('.gui_filter_addons').each(function() {
			var framework = $(this).val();
			var target_class = '.row-' + framework;
			if ($(this).prop('checked')) {
				$(target_class).attr('style', '');
				console.log(target_class, 'normal');
			} else {
				$(target_class).attr('style', 'display:none;');
				//console.log(target_class,'none');
			}
		});
	};

	function encodeEntities(value) {
		return value.
		replace(/&/g, '&amp;').
		replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function(value) {
			var hi = value.charCodeAt(0);
			var low = value.charCodeAt(1);
			return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';';
		}).
		replace(/([^\#-~| |!])/g, function(value) {
			return '&#' + value.charCodeAt(0) + ';';
		}).
		replace(/</g, '&lt;').
		replace(/>/g, '&gt;');
	}

	function htmlDecode(value) {
		return $('<div/>').html(value).text();
	} /** Add Ons **/
	$(document).ready(function($) {
		filterAddOns();
		$('.gui_filter_addons').click(function() {
			filterAddOns();
		});
	}); /** Fonts **/
	$(document).ready(function($) {
		$('#gui-font-cat-list').on("change", function() {
			var category = $(this).val();
			$("#gui-font-list").find('.category').attr('disabled', true).fadeOut();
			$("#gui-font-list").find('.' + category).attr('disabled', false).fadeIn();
		});
		$('#gui-font-list').on("change", function() {
			var fontmeta = $.parseJSON($(this).val());
			var fontfamily = fontmeta.name;
			var fontdesigner = fontmeta.designer;
			var fontlicense = fontmeta.license;
			$('#gui-font-name').html(fontfamily);
			$('#gui-font-designer').html(fontdesigner);
			$('#gui-font-license').html(fontlicense);
			$("#gui-font-loader").replaceWith('');
			var fontlink = 'https://fonts.googleapis.com/css?family=' + fontfamily.replace(' ', '+');
			var link = $('<link id="gui-font-loader">').attr('rel', 'stylesheet').attr('type', 'text/css').attr('href', fontlink);
			$("head").append(link);
			$("#gui-font-preview").css("font-family", "'" + fontfamily + "'");
		});
		$("#gui-font-choose").click(function() {
			var fontItem = $('#gui-font-list').val();
			var fontMeta = $.parseJSON(fontItem);
			var fontItems = "<li><input type='checkbox' class='gui_google_fonts' />" + fontMeta.name + "<input name='gui_google_fonts[]' type='hidden' value='" + encodeEntities(fontItem) + "' /></li>";
			$("#gui-font-selected").append(fontItems);
		});
		$("#gui-font-remove").click(function() {
			$(".gui_google_fonts:checked").each(function() {
				$(this).parent().replaceWith('');
			});
		});
		$("#gui-font-clear").click(function() {
			$(".gui_google_fonts").each(function() {
				$(this).parent().replaceWith('');
			});
		});
	}); /** Custom CSS **/
	$(document).ready(function($) {
		if ($("#gui-custom-css").length) {
			var textarea = document.getElementById("gui-custom-css");
			window.editor_markdown = CodeMirror.fromTextArea(textarea, {
				mime: 'text/css',
				mode: {
					name: "css",
					globalVars: true
				},
				extraKeys: {
					"Ctrl-Space": "autocomplete"
				},
				lineWrapping: true,
				lineNumbers: true,
				foldGutter: true,
				gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
			});
		}
	});
})(jQuery); /** toolbar **/
var guiAddOns;
(function($) {
	//toolbar
	var $document = $(document);
	guiAddOns = {
		/**
		 * A closed Sidebar that gets a addons dragged over it.
		 *
		 * @var element|null
		 */
		hoveredSidebar: null,
		addButton: function() {
			$("#addonss-right").on('click', '.gui_toolbar_append', function() {
				var $this = $(this),
					$data = $($this).attr("data-value"),
					$wrap = $this.closest('.addons');
				$target = $($wrap).find(".addons-button"), $data_old = $target.val();
				$target.val($data_old + ' ' + $data);
			});
			$("#addonss-right").on('click', '.gui_toolbar_insert', function() {
				var $this = $(this),
					$data = $($this).attr("data-value"),
					$wrap = $this.closest('.addons');
				$target = $($wrap).find(".addons-button");
				$target.val($data);
			});
		},
		init: function() {
			var rem, the_id, self = this,
				chooser = $('.addonss-chooser'),
				selectSidebar = chooser.find('.addonss-chooser-sidebars'),
				sidebars = $('div.addonss-sortables'),
				isRTL = !! ('undefined' !== typeof isRtl && isRtl);
			this.addButton();
			$('#addonss-right .sidebar-name').click(function() {
				var $this = $(this),
					$wrap = $this.closest('.addonss-holder-wrap');
				if ($wrap.hasClass('closed')) {
					$wrap.removeClass('closed');
					$this.parent().sortable('refresh');
				} else {
					$wrap.addClass('closed');
				}
				$document.triggerHandler('wp-pin-menu');
			});
			$('#addonss-left .sidebar-name').click(function() {
				$(this).closest('.addonss-holder-wrap').toggleClass('closed');
				$document.triggerHandler('wp-pin-menu');
			});
			$(document.body).bind('click.addonss-toggle', function(e) {
				var target = $(e.target),
					css = {
						'z-index': 100
					},
					addons, inside, targetWidth, addonsWidth, margin;
				if (target.parents('.addons-top').length && !target.parents('#available-addonss').length) {
					addons = target.closest('div.addons');
					inside = addons.children('.addons-inside');
					targetWidth = parseInt(addons.find('input.addons-width').val(), 10), addonsWidth = addons.parent().width();
					if (inside.is(':hidden')) {
						if (targetWidth > 250 && (targetWidth + 30 > addonsWidth) && addons.closest('div.addonss-sortables').length) {
							if (addons.closest('div.addons-liquid-right').length) {
								margin = isRTL ? 'margin-right' : 'margin-left';
							} else {
								margin = isRTL ? 'margin-left' : 'margin-right';
							}
							css[margin] = addonsWidth - (targetWidth + 30) + 'px';
							addons.css(css);
						}
						addons.addClass('open');
						inside.slideDown('fast');
					} else {
						inside.slideUp('fast', function() {
							addons.attr('style', '');
							addons.removeClass('open');
						});
					}
					e.preventDefault();
				} else if (target.hasClass('addons-control-save')) {
					guiAddOns.save(target.closest('div.addons'), 0, 1, 0);
					e.preventDefault();
				} else if (target.hasClass('addons-control-remove')) {
					guiAddOns.save(target.closest('div.addons'), 1, 1, 0);
					e.preventDefault();
				} else if (target.hasClass('addons-control-close')) {
					addons = target.closest('div.addons');
					addons.removeClass('open');
					guiAddOns.close(addons);
					e.preventDefault();
				}
			});
			sidebars.children('.addons').each(function() {
				var $this = $(this);
				guiAddOns.appendTitle(this);
				if ($this.find('p.addons-error').length) {
					$this.find('a.addons-action').trigger('click');
				}
			});
			$('#addons-list').children('.addons').draggable({
				connectToSortable: 'div.addonss-sortables',
				handle: '> .addons-top > .addons-title',
				distance: 2,
				helper: 'clone',
				zIndex: 100,
				containment: '#wpwrap',
				refreshPositions: true,
				start: function(event, ui) {
					var chooser = $(this).find('.addonss-chooser');
					ui.helper.find('div.addons-description').hide();
					the_id = this.id;
					if (chooser.length) {
						// Hide the chooser and move it out of the addons
						$('#wpbody-content').append(chooser.hide());
						// Delete the cloned chooser from the drag helper
						ui.helper.find('.addonss-chooser').remove();
						self.clearaddonsSelection();
					}
				},
				stop: function() {
					if (rem) {
						$(rem).hide();
					}
					rem = '';
				}
			});
			/**
			 * Opens and closes previously closed Sidebars when addonss are dragged over/out of them.
			 */
			sidebars.droppable({
				tolerance: 'intersect',
				/**
				 * Open Sidebar when a addons gets dragged over it.
				 *
				 * @param event
				 */
				over: function(event) {
					var $wrap = $(event.target).parent();
					if (guiAddOns.hoveredSidebar && !$wrap.is(guiAddOns.hoveredSidebar)) {
						// Close the previous Sidebar as the addons has been dragged onto another Sidebar.
						guiAddOns.closeSidebar(event);
					}
					if ($wrap.hasClass('closed')) {
						guiAddOns.hoveredSidebar = $wrap;
						$wrap.removeClass('closed');
					}
					$(this).sortable('refresh');
				},
				/**
				 * Close Sidebar when the addons gets dragged out of it.
				 *
				 * @param event
				 */
				out: function(event) {
					if (guiAddOns.hoveredSidebar) {
						guiAddOns.closeSidebar(event);
					}
				}
			});
			sidebars.sortable({
				placeholder: 'addons-placeholder',
				items: '> .addons',
				handle: '> .addons-top > .addons-title',
				cursor: 'move',
				distance: 2,
				containment: '#wpwrap',
				tolerance: 'pointer',
				refreshPositions: true,
				start: function(event, ui) {
					var height, $this = $(this),
						$wrap = $this.parent(),
						inside = ui.item.children('.addons-inside');
					if (inside.css('display') === 'block') {
						inside.hide();
						$(this).sortable('refreshPositions');
					}
					if (!$wrap.hasClass('closed')) {
						// Lock all open sidebars min-height when starting to drag.
						// Prevents jumping when dragging a addons from an open sidebar to a closed sidebar below.
						height = ui.item.hasClass('ui-draggable') ? $this.height() : 1 + $this.height();
						$this.css('min-height', height + 'px');
					}
					// console.log(the_id);
				},
				stop: function(event, ui) {
					var addNew, addonsNumber, $sidebar, $children, child, item, $addons = ui.item,
						id = the_id;
					// Reset the var to hold a previously closed sidebar.
					guiAddOns.hoveredSidebar = null;
					if ($addons.hasClass('deleting')) {
						guiAddOns.save($addons, 1, 0, 1); // delete addons
						$addons.remove();
						return;
					}
					addNew = $addons.find('input.add_new').val();
					addonsNumber = $addons.find('input.multi_number').val();
					$addons.attr('style', '').removeClass('ui-draggable');
					the_id = '';
					if (addNew) {
						if ('multi' === addNew) {
							$addons.html(
							$addons.html().replace(/<[^<>]+>/g, function(tag) {
								return tag.replace(/__i__|%i%/g, addonsNumber);
							}));
							$addons.attr('id', id.replace('__i__', addonsNumber));
							addonsNumber++;
							$('div#' + id).find('input.multi_number').val(addonsNumber);
						} else if ('single' === addNew) {
							$addons.attr('id', 'new-' + id);
							rem = 'div#' + id;
						}
						guiAddOns.save($addons, 0, 0, 1);
						$addons.find('input.add_new').val('');
						$document.trigger('addons-added', [$addons]);
					}
					$sidebar = $addons.parent();
					if ($sidebar.parent().hasClass('closed')) {
						$sidebar.parent().removeClass('closed');
						$children = $sidebar.children('.addons');
						// Make sure the dropped addons is at the top
						if ($children.length > 1) {
							child = $children.get(0);
							item = $addons.get(0);
							if (child.id && item.id && child.id !== item.id) {
								$(child).before($addons);
							}
						}
					}
					if (addNew) {
						$addons.find('a.addons-action').trigger('click');
					} else {
						guiAddOns.saveOrder($sidebar.attr('id'));
					}
				},
				activate: function() {
					$(this).parent().addClass('addons-hover');
				},
				deactivate: function() {
					// Remove all min-height added on "start"
					$(this).css('min-height', '').parent().removeClass('addons-hover');
				},
				receive: function(event, ui) {
					var $sender = $(ui.sender);
					// Don't add more addonss to orphaned sidebars
					if (this.id.indexOf('orphaned_addonss') > -1) {
						$sender.sortable('cancel');
						return;
					}
					// If the last addons was moved out of an orphaned sidebar, close and remove it.
					if ($sender.attr('id').indexOf('orphaned_addonss') > -1 && !$sender.children('.addons').length) {
						$sender.parents('.orphan-sidebar').slideUp(400, function() {
							$(this).remove();
						});
					}
				}
			}).sortable('option', 'connectWith', 'div.addonss-sortables');
			$('#available-addonss').droppable({
				tolerance: 'pointer',
				accept: function(o) {
					return $(o).parent().attr('id') !== 'addons-list';
				},
				drop: function(e, ui) {
					ui.draggable.addClass('deleting');
					$('#removing-addons').hide().children('span').empty();
				},
				over: function(e, ui) {
					ui.draggable.addClass('deleting');
					$('div.addons-placeholder').hide();
					if (ui.draggable.hasClass('ui-sortable-helper')) {
						$('#removing-addons').show().children('span').html(ui.draggable.find('div.addons-title').children('h4').html());
					}
				},
				out: function(e, ui) {
					ui.draggable.removeClass('deleting');
					$('div.addons-placeholder').show();
					$('#removing-addons').hide().children('span').empty();
				}
			});
			// Area Chooser
			$('#addonss-right .addonss-holder-wrap').each(function(index, element) {
				var $element = $(element),
					name = $element.find('.sidebar-name h3').text(),
					id = $element.find('.addonss-sortables').attr('id'),
					li = $('<li tabindex="0">').text($.trim(name));
				if (index === 0) {
					li.addClass('addonss-chooser-selected');
				}
				selectSidebar.append(li);
				li.data('sidebarId', id);
			});
			$('#available-addonss .addons .addons-title').on('click.addonss-chooser', function() {
				var $addons = $(this).closest('.addons');
				if ($addons.hasClass('addons-in-question') || $('#addonss-left').hasClass('chooser')) {
					self.closeChooser();
				} else {
					// Open the chooser
					self.clearaddonsSelection();
					$('#addonss-left').addClass('chooser');
					$addons.addClass('addons-in-question').children('.addons-description').after(chooser);
					chooser.slideDown(300, function() {
						selectSidebar.find('.addonss-chooser-selected').focus();
					});
					selectSidebar.find('li').on('focusin.addonss-chooser', function() {
						selectSidebar.find('.addonss-chooser-selected').removeClass('addonss-chooser-selected');
						$(this).addClass('addonss-chooser-selected');
					});
				}
			});
			// Add event handlers
			chooser.on('click.addonss-chooser', function(event) {
				var $target = $(event.target);
				if ($target.hasClass('button-primary')) {
					self.addaddons(chooser);
					self.closeChooser();
				} else if ($target.hasClass('button-secondary')) {
					self.closeChooser();
				}
			}).on('keyup.addonss-chooser', function(event) {
				if (event.which === $.ui.keyCode.ENTER) {
					if ($(event.target).hasClass('button-secondary')) {
						// Close instead of adding when pressing Enter on the Cancel button
						self.closeChooser();
					} else {
						self.addaddons(chooser);
						self.closeChooser();
					}
				} else if (event.which === $.ui.keyCode.ESCAPE) {
					self.closeChooser();
				}
			});
		},
		saveOrder: function(sidebarId) {
			var data = {
				action: 'addons_order',
				save_addons: $('#_wpnonce_addonss').val(),
				sidebars: []
			};
			if (sidebarId) {
				$('#' + sidebarId).find('.spinner:first').addClass('is-active');
			}
			$('div.addonss-sortables').each(function() {
				if ($(this).sortable) {
					data['sidebars[' + $(this).attr('id') + ']'] = $(this).sortable('toArray').join(',');
				}
			});
			$.post(ajaxurl, data, function() {
				$('.spinner').removeClass('is-active');
			});
		},
		save: function(addons, del, animate, order) {
			var sidebarId = addons.closest('div.addonss-sortables').attr('id'),
				data = addons.find('form').serialize(),
				a;
			addons = $(addons);
			$('.spinner', addons).addClass('is-active');
			a = {
				action: 'addons_save',
				save_addons: $('#_wpnonce_addonss').val(),
				sidebar: sidebarId
			};
			if (del) {
				a.delete_addons = 1;
			}
			data += '&' + $.param(a);
			$.post(ajaxurl, data, function(r) {
				//guiAddOns.addButton();
				var id;
				if (del) {
					if (!$('input.addons_number', addons).val()) {
						id = $('input.addons-id', addons).val();
						$('#available-addonss').find('input.addons-id').each(function() {
							if ($(this).val() === id) {
								$(this).closest('div.addons').show();
							}
						});
					}
					if (animate) {
						order = 0;
						addons.slideUp('fast', function() {
							$(this).remove();
							guiAddOns.saveOrder();
						});
					} else {
						addons.remove();
					}
				} else {
					$('.spinner').removeClass('is-active');
					if (r && r.length > 2) {
						$('div.addons-content', addons).html(r);
						guiAddOns.appendTitle(addons);
						$document.trigger('addons-updated', [addons]);
					}
				}
				if (order) {
					guiAddOns.saveOrder();
				}
			});
		},
		appendTitle: function(addons) {
			var title = $('input[id*="-title"]', addons).val() || '';
			if (title) {
				title = ': ' + title.replace(/<[^<>]+>/g, '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
			}
			$(addons).children('.addons-top').children('.addons-title').children().children('.in-addons-title').html(title);
		},
		close: function(addons) {
			addons.children('.addons-inside').slideUp('fast', function() {
				addons.attr('style', '');
			});
		},
		addaddons: function(chooser) {
			var addons, addonsId, add, n, viewportTop, viewportBottom, sidebarBounds, sidebarId = chooser.find('.addonss-chooser-selected').data('sidebarId'),
				sidebar = $('#' + sidebarId);
			addons = $('#available-addonss').find('.addons-in-question').clone();
			addonsId = addons.attr('id');
			add = addons.find('input.add_new').val();
			n = addons.find('input.multi_number').val();
			// Remove the cloned chooser from the addons
			addons.find('.addonss-chooser').remove();
			if ('multi' === add) {
				addons.html(
				addons.html().replace(/<[^<>]+>/g, function(m) {
					return m.replace(/__i__|%i%/g, n);
				}));
				addons.attr('id', addonsId.replace('__i__', n));
				n++;
				$('#' + addonsId).find('input.multi_number').val(n);
			} else if ('single' === add) {
				addons.attr('id', 'new-' + addonsId);
				$('#' + addonsId).hide();
			}
			// Open the addonss container
			sidebar.closest('.addonss-holder-wrap').removeClass('closed');
			sidebar.append(addons);
			sidebar.sortable('refresh');
			guiAddOns.save(addons, 0, 0, 1);
			// No longer "new" addons
			addons.find('input.add_new').val('');
			$document.trigger('addons-added', [addons]);
/*
                     * Check if any part of the sidebar is visible in the viewport. If it is, don't scroll.
                     * Otherwise, scroll up to so the sidebar is in view.
                     *
                     * We do this by comparing the top and bottom, of the sidebar so see if they are within
                     * the bounds of the viewport.
                     */
			viewportTop = $(window).scrollTop();
			viewportBottom = viewportTop + $(window).height();
			sidebarBounds = sidebar.offset();
			sidebarBounds.bottom = sidebarBounds.top + sidebar.outerHeight();
			if (viewportTop > sidebarBounds.bottom || viewportBottom < sidebarBounds.top) {
				$('html, body').animate({
					scrollTop: sidebarBounds.top - 130
				}, 200);
			}
			window.setTimeout(function() {
				// Cannot use a callback in the animation above as it fires twice,
				// have to queue this "by hand".
				addons.find('.addons-title').trigger('click');
			}, 250);
		},
		closeChooser: function() {
			var self = this;
			$('.addonss-chooser').slideUp(200, function() {
				$('#wpbody-content').append(this);
				self.clearaddonsSelection();
			});
		},
		clearaddonsSelection: function() {
			$('#addonss-left').removeClass('chooser');
			$('.addons-in-question').removeClass('addons-in-question');
		},
		/**
		 * Closes a Sidebar that was previously closed, but opened by dragging a addons over it.
		 *
		 * Used when a addons gets dragged in/out of the Sidebar and never dropped.
		 *
		 * @param sidebar
		 */
		closeSidebar: function(sidebar) {
			this.hoveredSidebar.addClass('closed');
			$(sidebar.target).css('min-height', '');
			this.hoveredSidebar = null;
		}
	};
	$document.ready(function() {
		guiAddOns.init();
	});
})(jQuery);