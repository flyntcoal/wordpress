/**
 * @author Jasman <jasman@ihsana.com>
 * @copyright Ihsana IT Solutiom 2015
 * @license Commercial License
 
 * @package Galau UI
 */
(function()
{
	tinymce.PluginManager.add('gui_advtoolbars', function(editor, url)
	{
		var $_ = tinymce.dom.DomQuery;
		var each = tinymce.each;
		var toolbars = true;
		var checkToolbars;

		function showToolbars()
		{
			toolbars = editor.theme.panel.state.data.visible;

			if (toolbars == true)
			{
				tinymce.activeEditor.theme.panel.hide();
				toolbars = false;
				if (window.galau_ui_debug == true)
				{
					console.log('gui_advtoolbars => try panel : hide');
				}

			}
			else
			{
				tinymce.activeEditor.theme.panel.show();
				toolbars = true;
				if (window.galau_ui_debug == true)
				{
					console.log('gui_advtoolbars => try panel : show');
				}
			}
			checkToolbars.active(toolbars);
		};

		function toggleToolbars()
		{
			toolbars = editor.theme.panel.state.data.visible;
			checkToolbars = this;
			checkToolbars.active(toolbars);
		}

		var menus_advtoolbar = [
		{
			text: 'Toolbars',
			onclick: showToolbars,
			selectable: true,
			onPostRender: toggleToolbars,
			}];


		editor.addMenuItem('gui_advtoolbars', {
			text: 'Tools Panel',
			context: 'view',
			menu: menus_advtoolbar,
			prependToContext: true
		});

 

	});
})();