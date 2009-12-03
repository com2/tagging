<?php
/*
 * Providing a administration interface for tagging.
 */
function tagging_admin_settings() {
  $options = node_get_types('names');
  $form['tagging_show_max_suggestion'] = array(
      '#type' => 'textfield',
      '#title' => 'Maximum suggestions',
      '#description' => 'Maximum suggestions to show in the user-interface. Please use a number',      
      '#valid' => 'integer',
      '#default_value' => variable_get('tagging_show_max_suggestion', 20)
  );
  
  $form['tagging_show_suggestion_example'] = array(
      '#type' => 'checkbox',
      '#title' => 'Provide example suggestion',
      '#description' => 'This will show a set of static suggestion in the user-interface. This should be only an example, you have to implement your own proper suggestion handler afterward and deacativate this one!',
      '#default_value' => variable_get('tagging_show_suggestion_example', 1)
  );

  return system_settings_form($form);
}