// $Id$
/**
 * @author Eugen Mayer
 * @Copyright Impressive.media GbR
 */
(function($) {
  $.fn.tagging = function() {
      return this.each( function(){
        var context = get_context($(this).attr('class'));
        
        if(context === null) {
          alert('cant initialize tagging-widget: "'+$(this).attr('id')+'"..did you forget the "taggig-widget-$CONTEXT" class?');
          return;
        }
        // Our containers.
        var input_sel = '.tagging-widget-'+context;
        var button_sel = '.tagging-button-'+context;
        var wrapper_sel = '.tagging-wrapper-'+context;
        var suggestions_wrapper_sel = '.suggestion-tagging-wrapper-'+context; 
        var target_sel = '.tagging-widget-target-'+context;     
        // Lets set all things up.
        bind_taglist_events();        
        update_tags();
        create_button();
        bind_enter();
        
        $(input_sel).val('');
        
        /*
         * Adds a tag to the visual list and to the hidden input field (target).
         */
        function add_tag(tag, autoupdate) {
          $(wrapper_sel).append("<span class='tag-text'>"+tag+"</span>");
          if(autoupdate) {
            update_tags();
          }
        }
        
        function add_tag_from_suggestion(tag, autoupdate) {
          // not helping agains XSS, but we are better with it
          tag = Drupal.check_plain(tag);
          $(wrapper_sel).append("<span class='tag-text'>"+tag+"</span>");
          if(autoupdate) {
            update_tags();
          }
        }
        /*
         * Removes a tag out of the visual list and out of the hidden input field (target).
         */
        function remove_tag(e) {
          $(e).remove();
          unbind_taglist_events();
          update_tags();
          bind_taglist_events();
        }
        /*
         * Updates the hidden input textfield with current tags.
         * We do so, that we later can pass the tags to the taxonomy validators
         * and dont have to fight with module weights.
         */
        function update_tags() {
         var tags = new Array();
         $(wrapper_sel+" span.tag-text").each( function () {
            tags.push($(this).text());    
          });

         $(target_sel).val(Drupal.check_plain(tags.join(',')));
         //alert($(target_sel).val());
        }
        
        /*
         * Checks, if the tag already exists. Lets avoid the dublicates
         * we have seen in the past. We dont tell the use anything, we
         * just do as we would have added it, as the user expects to have the tag
         * added, no matter its there or not.
         */
        function tag_exists(tag) {
          var tag = Drupal.check_plain($.trim(tag));
          var found = false;
          $(wrapper_sel+" span.tag-text").each(function() {
            if($(this).text() === tag) {
              found = true;
              return;
            }
          });
          return found;
        }
        
        /*
         * Adds the button to the inputfield. Actuall the button is optional
         * as we also add (primary) by pressing enter.
         */
        function create_button() {                    
          $(input_sel)
          //.after('<input type="image" src="add.png" class="tagging-button tagging-button-'+context+'" name="tag_add" value="'+Drupal.t('Add')+'">');
          .after('<a href="#" title="'+Drupal.t('Add')+'"><span class="tagging-button tagging-button-'+context+'"></span></a>');
          
          $(button_sel).bind('click',function() {   
              tags = $(input_sel).not('.tag-processed').val().split(',');         
              $.each(tags, function(i, tag) {
                tag = jQuery.trim(tag);
                if (tag != '' && !tag_exists(tag)) {
                  add_tag(tag, false);
                }
              });
              $(input_sel).val('');              
              update_tags();
              bind_taglist_events();
          });          
        }
        
        /*
         * Event for keypress on the input field of the tagging-widget.
         */
        function bind_enter() {
            if ($.browser.mozilla) {
              $(input_sel).bind('keypress',check_enter);
            }
            else {
              $(input_sel).bind('keydown',check_enter);
            }
        }
        /*
         * Checks, if enter is pressed. If yes, close the autocompletition
         * use the selected item and add it to the tag-list.
         */
        function check_enter(event) {
          if (event.keyCode == 13) {
            $('#autocomplete').each(function() {
              this.owner.hidePopup();
            });    
            $(button_sel).trigger('click');
            event.preventDefault();
            return false;
          }
          return true;
        } 
        
        /*
         * Adds the remove-tag methods to the tags in the wrapper.
         */
        function bind_taglist_events() {
          $(wrapper_sel+" span.tag-text:not(span.processed)").each(function() {
              $(this).addClass('processed');
              $(this).bind('click',function() { remove_tag(this); return false; });            
            } 
          );
          
          $(suggestions_wrapper_sel+" span.suggest-tag-text").each(function() {             
              $(this).bind('click',function() { 
                add_tag_from_suggestion($(this).children().text()); 
                remove_tag(this); 
                return false;
              });            
            } 
          );
        }
        
        /*
         * During updating of the tags, we unbind the events to avoid
         * sideffects.
         */
        function unbind_taglist_events() {
          $(wrapper_sel+" span.tag-text").each(function() {
              $(this).removeClass('processed');
              $(this).unbind('click');            
              return false;
            }
          );
        }
        
        /*
         * Extracts the content ID - for drupal thats the VID.
         * This is extracted from the tagging-widget-XX class
         * if the input element, which actuall has the tagging-widget class. 
         */
        function get_context(classes) {
          context = null;
           $(classes.split(' ')).each(function(){ 
              match = this.match(/tagging[-]widget[-](\d)+/i);
              if (match != null) {
                context =  match[1];
              }           
            }); 
          return context; 
        }
      }
    ); 
  }
})(jQuery);