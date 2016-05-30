// jQuery Alert Dialogs Plugin
//
// Version 1.0
//
// Cory S.N. LaViska
// A Beautiful Site (http://abeautifulsite.net/)
// 29 December 2008
//
// Visit http://abeautifulsite.net/notebook/87 for more information
//
// Usage:
//		jAlert( message, [title, callback] )
//		jConfirm( message, [title, callback] )
//		jPrompt( message, [value, title, callback] )
// 
// History:
//
//		1.00 - Released (29 December 2008)
//
// License:
// 
//		This plugin is licensed under the GNU General Public License: http://www.gnu.org/licenses/gpl.html
//
(function($) {


	$.alerts = {
		
		// These properties can be read/written by accessing $.alerts.propertyName from your scripts at any time
		
		verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
		horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
		repositionOnResize: true,           // re-centers the dialog on window resize
		overlayOpacity: .01,                // transparency level of overlay
		overlayColor: '#FFF',               // base color of overlay
		draggable: true,                    // make the dialogs draggable (requires UI Draggables plugin)
		okButton: '<input type="button" value="确定"" id="popup_ok" style="width:90px; padding-top:2px; padding-bottom:2px" />',         // text for the OK button
		cancelButton: '<input type="button" value="取消" id="popup_cancel" style="width:90px; padding-top:2px; padding-bottom:2px" />', // text for the Cancel button
		dialogClass: null,                  // if specified, this class will be applied to all dialogs
		fromIframe: false,					// called from iframe
		
		// Public methods

		confirmForm: function(form, title, callback) {
			$.alerts._show3(title, form, null, 'form', function(result) {
				if( callback ) callback(result);
			});
		},
		
		alert: function(message, title, callback) {
			$.alerts._show(title, message, null, 'alert', function(result) {
				if( callback ) callback(result);
			});
		},

		alert7: function(message, title, callback) {
			$.alerts._show7(title, message, null, 'alert', function(result) {
				if( callback ) callback(result);
			});
		},


		warning: function(message, title, callback) {
			$.alerts._show(title, message, null, 'warning', function(result) {
				if( callback ) callback(result);
			});
		},
		
		confirm: function(message, title, callback) {
			$.alerts._show(title, message, null, 'confirm', function(result) {
				if( callback ) callback(result);
			});
		},

		confirm2: function(message, title, callback) {
			$.alerts._show2(title, message, null, 'confirm', function(result) {
				if( callback ) callback(result);
			});
		},

			
		prompt: function(message, value, title, callback) {
			$.alerts._show(title, message, value, 'prompt', function(result) {
				if( callback ) callback(result);
			});
		},
		
		mask : function(message, cancelable){
				$.alerts._show('', message, cancelable, 'mask');
		},

		mask4 : function(message, cancelable){
				$.alerts._show4('', message, cancelable, 'mask');
		},
		
		// Private methods
		
		_show: function(title, msg, value, type, callback) {
			
			$.alerts._hide();
			$.alerts._overlay('show');

			//var body = $.alerts.fromIframe ? $("BODY", parent.document) : $("BODY");	
			var body = $("BODY");
			
			$(body).append(
			  '<div id="popup_container" style="display:none">' +
			    (title?'<h2 id="popup_title"></h2>':'') +
			    '<div id="popup_content">' +
			      '<div id="popup_message"></div>' +
				'</div>' +
			  '</div>');
			
			if( $.alerts.dialogClass ) $("#popup_container").addClass($.alerts.dialogClass);
			
			// IE6 Fix
			var pos = ($.browser && $.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed'; 
			
			$("#popup_container").css({
				position: pos,
				zIndex: 99999,
				padding: 0,
				margin: 0
			});
			
			if(title)$("#popup_title").text(title);
			$("#popup_content").addClass(type);

			if (type == 'form') {
				$("#popup_message").html(msg);
			} else {
				$("#popup_message").text(msg);
				$("#popup_message").html( $("#popup_message").text().replace(/\n/g, '<br />') );
			}
			
			//$("#popup_container").css({
			//	minWidth: $("#popup_container").outerWidth(),
			//	maxWidth: $("#popup_container").outerWidth()
			//});
			
			$.alerts._reposition();
			$.alerts._maintainPosition(true);
			
			switch( type ) {
                case 'mask':
                    if(value) {//cancelable
                        $("#popup_message").after('<div id="popup_panel">' + $.alerts.cancelButton + '</div>');
                        $("#popup_cancel").click(function () {
                            $.alerts._hide();
                        });
                    }
                    break;
				case 'alert':
					$("#popup_message").after('<div id="popup_panel">' + $.alerts.okButton + '</div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				case 'warning':
					$("#popup_message").after('<div id="popup_panel">' + $.alerts.okButton + '</div>');
					$("#popup_message").css('color', 'red');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				case 'confirm':
					$("#popup_message").after('<div id="popup_panel">' + $.alerts.okButton + '&nbsp;&nbsp;' + $.alerts.cancelButton + '</div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						if( callback ) callback(true);
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#popup_ok").focus();
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
				break;
				case 'form':
					$("#popup_message").after('<div id="popup_panel">' + $.alerts.okButton + '&nbsp;&nbsp;' + $.alerts.cancelButton + '</div>');
					$("#popup_ok").click( function() {
						if( callback ) callback(true);
						//call hidePopup to hide				
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#popup_ok").focus();
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
				break;
				case 'prompt':
					$("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel">' + $.alerts.okButton + '&nbsp;&nbsp;' + $.alerts.cancelButton + '</div>');
					$("#popup_prompt").width( $("#popup_message").width() );
					$("#popup_ok").click( function() {
						var val = $("#popup_prompt").val();
						$.alerts._hide();
						if( callback ) callback( val );
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback( null );
					});
					$("#popup_prompt, #popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
					if( value ) $("#popup_prompt").val(value);
					$("#popup_prompt").focus().select();
				break;
			}
			
			// Make draggable
			if( $.alerts.draggable ) {
				try {
					$("#popup_container").draggable({ handle: $("#popup_title") });
					$("#popup_title").css({ cursor: 'move' });
				} catch(e) { /* requires jQuery UI draggables */ }
			}

			$('#popup_container').fadeIn(300);

			$.alerts._mask();

		},


		// Private methods
		
		_show2: function(title, msg, value, type, callback) {
			
			$.alerts._hide();
			$.alerts._overlay('show');

			//var body = $.alerts.fromIframe ? $("BODY", parent.document) : $("BODY");	
			var body = $("BODY");
			
			$(body).append(
			  '<div id="popup_container" style="display:none">' +
			    (title?'<h2 id="popup_title"></h2>':'') +
			    '<div id="popup_content">' +
			      '<div id="popup_message"></div>' +
				'</div>' +
			  '</div>');
			
			if( $.alerts.dialogClass ) $("#popup_container").addClass($.alerts.dialogClass);
			
			// IE6 Fix
			var pos = ($.browser && $.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed'; 
			
			$("#popup_container").css({
				position: pos,
				zIndex: 99999,
				padding: 0,
				margin: 0
			});
			
			if(title)$("#popup_title").text(title);
			$("#popup_content").addClass(type);

			if (type == 'form') {
				$("#popup_message").html(msg);
			} else {
				$("#popup_message").text(msg);
				$("#popup_message").html( $("#popup_message").text().replace(/\n/g, '<br />') );
			}
			
			//$("#popup_container").css({
			//	minWidth: $("#popup_container").outerWidth(),
			//	maxWidth: $("#popup_container").outerWidth()
			//});
			
			$.alerts._reposition2();
			$.alerts._maintainPosition(true);
			
			switch( type ) {
                case 'mask':
                    if(value) {//cancelable
                        $("#popup_message").after('<div id="popup_panel">' + $.alerts.cancelButton + '</div>');
                        $("#popup_cancel").click(function () {
                            $.alerts._hide();
                        });
                    }
                    break;
				case 'alert':
					$("#popup_message").after('<div id="popup_panel">' + $.alerts.okButton + '</div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				case 'warning':
					$("#popup_message").after('<div id="popup_panel">' + $.alerts.okButton + '</div>');
					$("#popup_message").css('color', 'red');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				case 'confirm':
					$("#popup_message").after('<div id="popup_panel">' + $.alerts.okButton + '&nbsp;&nbsp;' + $.alerts.cancelButton + '</div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						if( callback ) callback(true);
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#popup_ok").focus();
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
				break;
				case 'form':
					$("#popup_message").after('<div id="popup_panel">' + $.alerts.okButton + '&nbsp;&nbsp;' + $.alerts.cancelButton + '</div>');
					$("#popup_ok").click( function() {
						if( callback ) callback(true);
						//call hidePopup to hide				
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#popup_ok").focus();
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
				break;
				case 'prompt':
					$("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel">' + $.alerts.okButton + '&nbsp;&nbsp;' + $.alerts.cancelButton + '</div>');
					$("#popup_prompt").width( $("#popup_message").width() );
					$("#popup_ok").click( function() {
						var val = $("#popup_prompt").val();
						$.alerts._hide();
						if( callback ) callback( val );
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback( null );
					});
					$("#popup_prompt, #popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
					if( value ) $("#popup_prompt").val(value);
					$("#popup_prompt").focus().select();
				break;
			}
                    // Make draggable
			if( $.alerts.draggable ) {
				try {
					$("#popup_container").draggable({ handle: $("#popup_title") });
					$("#popup_title").css({ cursor: 'move' });
				} catch(e) { /* requires jQuery UI draggables */ }
			}

			$('#popup_container').fadeIn(300);

			$.alerts._mask();

		},

		// Private methods
		
		_show3: function(title, msg, value, type, callback) {
			
			$.alerts._hide();
			$.alerts._overlay('show');

			//var body = $.alerts.fromIframe ? $("BODY", parent.document) : $("BODY");	
			var body = $("BODY");
			
			$(body).append(
			  '<div id="popup_container" style="display:none">' +
			    (title?'<h2 id="popup_title"></h2>':'') +
			    '<div id="popup_content">' +
			      '<div id="popup_message"></div>' +
				'</div>' +
			  '</div>');
			
			if( $.alerts.dialogClass ) $("#popup_container").addClass($.alerts.dialogClass);
			
			// IE6 Fix
			var pos = ($.browser && $.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed'; 
			
			$("#popup_container").css({
				position: pos,
				zIndex: 99999,
				padding: 0,
				margin: 0
			});
			
			if(title)$("#popup_title").text(title);
			$("#popup_content").addClass(type);

			if (type == 'form') {
				$("#popup_message").html(msg);
			} else {
				$("#popup_message").text(msg);
				$("#popup_message").html( $("#popup_message").text().replace(/\n/g, '<br />') );
			}
			
			//$("#popup_container").css({
			//	minWidth: $("#popup_container").outerWidth(),
			//	maxWidth: $("#popup_container").outerWidth()
			//});
			
			$.alerts._reposition3();
			$.alerts._maintainPosition(true);
			
			switch( type ) {
                case 'mask':
                    if(value) {//cancelable
                        $("#popup_message").after('<div id="popup_panel">' + $.alerts.cancelButton + '</div>');
                        $("#popup_cancel").click(function () {
                            $.alerts._hide();
                        });
                    }
                    break;
				case 'alert':
					$("#popup_message").after('<div id="popup_panel">' + $.alerts.okButton + '</div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				case 'warning':
					$("#popup_message").after('<div id="popup_panel">' + $.alerts.okButton + '</div>');
					$("#popup_message").css('color', 'red');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				case 'confirm':
					$("#popup_message").after('<div id="popup_panel">' + $.alerts.okButton + '&nbsp;&nbsp;' + $.alerts.cancelButton + '</div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						if( callback ) callback(true);
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#popup_ok").focus();
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
				break;
				case 'form':
					$("#popup_message").after('<div id="popup_panel">' + $.alerts.okButton + '&nbsp;&nbsp;' + $.alerts.cancelButton + '</div>');
					$("#popup_ok").click( function() {
						if( callback ) callback(true);
						//call hidePopup to hide				
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#popup_ok").focus();
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
				break;
				case 'prompt':
					$("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel">' + $.alerts.okButton + '&nbsp;&nbsp;' + $.alerts.cancelButton + '</div>');
					$("#popup_prompt").width( $("#popup_message").width() );
					$("#popup_ok").click( function() {
						var val = $("#popup_prompt").val();
						$.alerts._hide();
						if( callback ) callback( val );
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback( null );
					});
					$("#popup_prompt, #popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
					if( value ) $("#popup_prompt").val(value);
					$("#popup_prompt").focus().select();
				break;
			}
                    // Make draggable
			if( $.alerts.draggable ) {
				try {
					$("#popup_container").draggable({ handle: $("#popup_title") });
					$("#popup_title").css({ cursor: 'move' });
				} catch(e) { /* requires jQuery UI draggables */ }
			}

			$('#popup_container').fadeIn(300);

			$.alerts._mask();

		},


		// Private methods
		
		_show4: function(title, msg, value, type, callback) {
			
			$.alerts._hide();
			$.alerts._overlay('show');

			//var body = $.alerts.fromIframe ? $("BODY", parent.document) : $("BODY");	
			var body = $("BODY");
			
			$(body).append(
			  '<div id="popup_container" style="display:none">' +
			    (title?'<h2 id="popup_title"></h2>':'') +
			    '<div id="popup_content">' +
			      '<div id="popup_message"></div>' +
				'</div>' +
			  '</div>');
			
			if( $.alerts.dialogClass ) $("#popup_container").addClass($.alerts.dialogClass);
			
			// IE6 Fix
			var pos = ($.browser && $.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed'; 
			
			$("#popup_container").css({
				position: pos,
				zIndex: 99999,
				padding: 0,
				margin: 0
			});
			
			if(title)$("#popup_title").text(title);
			$("#popup_content").addClass(type);

			if (type == 'form') {
				$("#popup_message").html(msg);
			} else {
				$("#popup_message").text(msg);
				$("#popup_message").html( $("#popup_message").text().replace(/\n/g, '<br />') );
			}
			
			//$("#popup_container").css({
			//	minWidth: $("#popup_container").outerWidth(),
			//	maxWidth: $("#popup_container").outerWidth()
			//});
			
			$.alerts._reposition4();
			$.alerts._maintainPosition(true);
			
			switch( type ) {
                case 'mask':
                    if(value) {//cancelable
                        $("#popup_message").after('<div id="popup_panel">' + $.alerts.cancelButton + '</div>');
                        $("#popup_cancel").click(function () {
                            $.alerts._hide();
                        });
                    }
                    break;
				case 'alert':
					$("#popup_message").after('<div id="popup_panel">' + $.alerts.okButton + '</div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				case 'warning':
					$("#popup_message").after('<div id="popup_panel">' + $.alerts.okButton + '</div>');
					$("#popup_message").css('color', 'red');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				case 'confirm':
					$("#popup_message").after('<div id="popup_panel">' + $.alerts.okButton + '&nbsp;&nbsp;' + $.alerts.cancelButton + '</div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						if( callback ) callback(true);
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#popup_ok").focus();
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
				break;
				case 'form':
					$("#popup_message").after('<div id="popup_panel">' + $.alerts.okButton + '&nbsp;&nbsp;' + $.alerts.cancelButton + '</div>');
					$("#popup_ok").click( function() {
						if( callback ) callback(true);
						//call hidePopup to hide				
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#popup_ok").focus();
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
				break;
				case 'prompt':
					$("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel">' + $.alerts.okButton + '&nbsp;&nbsp;' + $.alerts.cancelButton + '</div>');
					$("#popup_prompt").width( $("#popup_message").width() );
					$("#popup_ok").click( function() {
						var val = $("#popup_prompt").val();
						$.alerts._hide();
						if( callback ) callback( val );
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback( null );
					});
					$("#popup_prompt, #popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
					if( value ) $("#popup_prompt").val(value);
					$("#popup_prompt").focus().select();
				break;
			}
			
			// Make draggable
			if( $.alerts.draggable ) {
				try {
					$("#popup_container").draggable({ handle: $("#popup_title") });
					$("#popup_title").css({ cursor: 'move' });
				} catch(e) { /* requires jQuery UI draggables */ }
			}

			$('#popup_container').fadeIn(300);

			$.alerts._mask();

		},



		// Private methods
		
		_show7: function(title, msg, value, type, callback) {
			
			$.alerts._hide();
			$.alerts._overlay('show');

			//var body = $.alerts.fromIframe ? $("BODY", parent.document) : $("BODY");	
			var body = $("BODY");
			
			$(body).append(
			  '<div id="popup_container" style="display:none">' +
			    (title?'<h2 id="popup_title"></h2>':'') +
			    '<div id="popup_content">' +
			      '<div id="popup_message"></div>' +
				'</div>' +
			  '</div>');
			
			if( $.alerts.dialogClass ) $("#popup_container").addClass($.alerts.dialogClass);
			
			// IE6 Fix
			var pos = ($.browser && $.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed'; 
			
			$("#popup_container").css({
				position: pos,
				zIndex: 99999,
				padding: 0,
				margin: 0
			});
			
			if(title)$("#popup_title").text(title);
			$("#popup_content").addClass(type);

			if (type == 'form') {
				$("#popup_message").html(msg);
			} else {
				$("#popup_message").text(msg);
				$("#popup_message").html( $("#popup_message").text().replace(/\n/g, '<br />') );
			}
			
			//$("#popup_container").css({
			//	minWidth: $("#popup_container").outerWidth(),
			//	maxWidth: $("#popup_container").outerWidth()
			//});
			
			$.alerts._reposition7();
			$.alerts._maintainPosition(true);
			
			switch( type ) {
                case 'mask':
                    if(value) {//cancelable
                        $("#popup_message").after('<div id="popup_panel">' + $.alerts.cancelButton + '</div>');
                        $("#popup_cancel").click(function () {
                            $.alerts._hide();
                        });
                    }
                    break;
				case 'alert':
					$("#popup_message").after('<div id="popup_panel">' + $.alerts.okButton + '</div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				case 'warning':
					$("#popup_message").after('<div id="popup_panel">' + $.alerts.okButton + '</div>');
					$("#popup_message").css('color', 'red');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				case 'confirm':
					$("#popup_message").after('<div id="popup_panel">' + $.alerts.okButton + '&nbsp;&nbsp;' + $.alerts.cancelButton + '</div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						if( callback ) callback(true);
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#popup_ok").focus();
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
				break;
				case 'form':
					$("#popup_message").after('<div id="popup_panel">' + $.alerts.okButton + '&nbsp;&nbsp;' + $.alerts.cancelButton + '</div>');
					$("#popup_ok").click( function() {
						if( callback ) callback(true);
						//call hidePopup to hide				
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#popup_ok").focus();
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
				break;
				case 'prompt':
					$("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel">' + $.alerts.okButton + '&nbsp;&nbsp;' + $.alerts.cancelButton + '</div>');
					$("#popup_prompt").width( $("#popup_message").width() );
					$("#popup_ok").click( function() {
						var val = $("#popup_prompt").val();
						$.alerts._hide();
						if( callback ) callback( val );
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback( null );
					});
					$("#popup_prompt, #popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
					if( value ) $("#popup_prompt").val(value);
					$("#popup_prompt").focus().select();
				break;
			}
			
			// Make draggable
			if( $.alerts.draggable ) {
				try {
					$("#popup_container").draggable({ handle: $("#popup_title") });
					$("#popup_title").css({ cursor: 'move' });
				} catch(e) { /* requires jQuery UI draggables */ }
			}

			$('#popup_container').fadeIn(300);

			$.alerts._mask();

		},


		
		_hide: function() {			
			$("#popup_container").remove();
			$.alerts._overlay('hide');
			$.alerts._maintainPosition(false);
			$.alerts._unmask();
		},

		_mask : function() {
			// if ($.alerts.fromIframe) {
			// 	$('body', parent.document).append('<div id="mask"></div>');
			// 	$('#mask', parent.document).fadeIn(300);
			// } else {
				$('body').append('<div id="mask"></div>');
				//$("#mask").append('<div id="mask2"></div>');
	    		$('#mask').fadeIn(300);
    		//}
		},

		_unmask : function() {
			// if ($.alerts.fromIframe) {
			// 	$('#mask', parent.document).fadeOut(300 , function() {
			// 		$('#mask', parent.document).remove(); 
			// 	});
			// } else {
				$('#mask').fadeOut(300 , function() {
					$('#mask').remove(); 
				});
			//}
		},
		
		_overlay: function(status) {
			switch( status ) {
				case 'show':
					$.alerts._overlay('hide');
					$("BODY").append('<div id="popup_overlay"></div>');
					$("#popup_overlay").css({
						position: 'absolute',
						zIndex: 99998,
						top: '0px',
						left: '0px',
						width: '100%',
						height: $(document).height(),
						background: $.alerts.overlayColor,
						opacity: $.alerts.overlayOpacity
					});					
				break;
				case 'hide':
					$("#popup_overlay").remove();
				break;
			}
		},

		
		_reposition: function() {
			var top = 0;
			if ( $.alerts.fromIframe ) {				
				top =parent.getScrollTop();
			} else {
				//top = (($("#popup_overlay").height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.alerts.verticalOffset;
				top = 100;
			}
			var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
			if( top < 0 ) top = 0;
			if( left < 0 ) left = 0;
			
			// IE6 fix
			if($.browser && $.browser.msie && parseInt($.browser.version) <= 6 ) top = top + $(window).scrollTop();
			
			
			  $("#popup_container").css({
				top: top + 'px',
				left: left + 'px'
			});
			
			$("#popup_overlay").height( $(document).height() );
		},

		_reposition2: function() {
			var top = 0;
			if ( $.alerts.fromIframe ) {				
				top =parent.getScrollTop();
			} else {
				top = (($("#popup_overlay").height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.alerts.verticalOffset;
			}
			var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
			if( top < 0 ) top = 0;
			if( left < 0 ) left = 0;
			
			// IE6 fix
			if($.browser && $.browser.msie && parseInt($.browser.version) <= 6 ) top = top + $(window).scrollTop();
			
			
			  $("#popup_container").css({
				top: top-150 + 'px',
				left: left + 'px'
			});
			
			$("#popup_overlay").height( $(document).height() );
		},

		_reposition3: function() {
			var top = 0;
			if ( $.alerts.fromIframe ) {				
				top =parent.getScrollTop();
			} else {
				top = (($("#popup_overlay").height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.alerts.verticalOffset;
			}
			var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
			if( top < 0 ) top = 0;
			if( left < 0 ) left = 0;
			
			// IE6 fix
			if($.browser && $.browser.msie && parseInt($.browser.version) <= 6 ) top = top + $(window).scrollTop();
			
			
			  $("#popup_container").css({
				top: 250 + 'px',
				left: left + 'px'
			});
			
			$("#popup_overlay").height( $(document).height() );
		},


		_reposition4: function() {
			var top = 0;
			if ( $.alerts.fromIframe ) {				
				top =parent.getScrollTop();
			} else {
				top = (($("#popup_overlay").height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.alerts.verticalOffset;
			}
			var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
			if( top < 0 ) top = 0;
			if( left < 0 ) left = 0;
			
			// IE6 fix
			if($.browser && $.browser.msie && parseInt($.browser.version) <= 6 ) top = top + $(window).scrollTop();
			
			
			  $("#popup_container").css({
				top: 200 + 'px',
				left: left + 'px'
			});
			
			$("#popup_overlay").height( $(document).height() );
		},


		_reposition6: function() {
			var top = 0;
			if ( $.alerts.fromIframe ) {				
				top =parent.getScrollTop();
			} else {
				top = (($("#popup_overlay").height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.alerts.verticalOffset;
			}
			var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
			if( top < 0 ) top = 0;
			if( left < 0 ) left = 0;
			
			// IE6 fix
			if($.browser && $.browser.msie && parseInt($.browser.version) <= 6 ) top = top + $(window).scrollTop();
			
			
			  $("#popup_container").css({
				top: 100 + 'px',
				left: left + 'px'
			});
			
			$("#popup_overlay").height( $(document).height() );


		},


		_reposition7: function() {
			var top = 0;
			if ( $.alerts.fromIframe ) {				
				top =parent.getScrollTop();
			} else {
				//top = (($("#popup_overlay").height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.alerts.verticalOffset;
				//top = 100;
				top=($(window).height()+250) / 2;
			}
			var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
			if( top < 0 ) top = 0;
			if( left < 0 ) left = 0;
			
			// IE6 fix
			if($.browser && $.browser.msie && parseInt($.browser.version) <= 6 ) top = top + $(window).scrollTop();
			
			
			  $("#popup_container").css({
				top: top + 'px',
				left: left + 'px'
			});
			
			$("#popup_overlay").height( $(document).height() );
		},


		

		_maintainPosition: function(status) {
			if( $.alerts.repositionOnResize ) {
				switch(status) {
					case true:
						$(window).bind('resize', function() {
							$.alerts._reposition();
						});
					break;
					case false:
						$(window).unbind('resize');
					break;
				}
			}
		}
		
	}
	
	// Shortuct functions
	jAlert = function(message, title, callback) {

		$.alerts.alert(message, (title?title:'提示'), callback);
	}

	jAlert7 = function(message, title, callback) {

		$.alerts.alert7(message, (title?title:'提示'), callback);
	}


	jForm = function(message, title, callback) {
		$.alerts.confirmForm(message, title, callback);
	}

	jWarning = function(message, title, callback) {
		$.alerts.warning(message, (title?title:'警告'), callback);
	}
	
	jConfirm = function(message, title, callback) {
		$.alerts.confirm(message, (title?title:'请确认'), callback);
	};
		
	jPrompt = function(message, value, title, callback) {
		$.alerts.prompt(message, value, title, callback);
	};
	
	unmask = function() {
		$.alerts._hide();
	}
	mask = function(message, cancelable) {
		$.alerts.mask(message, cancelable);
	}

	hidePopup = function() {
		$.alerts._hide();
	}

	jAlertIframe = function(message, title, callback) {
		$.alerts.fromIframe = true;
		$.alerts.alert(message, (title?title:'提示'), callback);
	};

	jFormIframe = function(message, title, callback) {
		$.alerts.fromIframe = true;
		$.alerts.confirmForm(message, title, callback);
	};

	jWarningIframe = function(message, title, callback) {
		$.alerts.fromIframe = true;
		$.alerts.warning(message, (title?title:'提示'), callback);
	};
	
	jConfirmIframe = function(message, title, callback) {
		$.alerts.fromIframe = true;
		$.alerts.confirm(message, (title?title:'请确认'), callback);
	};

    jConfirmIframe2 = function(message, title, callback) {
		$.alerts.fromIframe = true;
		$.alerts.confirm2(message, (title?title:'请确认'), callback);
	};

		
	jPromptIframe = function(message, value, title, callback) {
		$.alerts.fromIframe = true;
		$.alerts.prompt(message, value, title, callback);
	};
	
	unmaskIframe = function() {
		$.alerts.fromIframe = true;
		$.alerts._hide();
	}
	maskIframe = function(message, cancelable) {
		$.alerts.fromIframe = true;
		$.alerts.mask4(message, cancelable);
	}
	
})(jQuery);

/*
window.onload=function(){
  $("#popup_ok").click(function(){
  	alert("sds")
  });   //popup_container
}
*/