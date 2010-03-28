<?php

// Author: Eugen Mayer (http://kontextwork.de)
// Copyright 2010
/*
 * Providing a administration interface for tagging_vocab_extractor.
 */
function tagging_vocab_extractor_suggest_admin_settings() {
  $form['tagging_vocab_extractor_suggest_cck'] = array(
      '#type' => 'textfield',
      '#title' => t('CCK fields to scan'),
      '#description' => t('Comma seperated list of cck field names, which will be scanned for terms if they exist'),
      '#valid' => 'string',
      '#default_value' => variable_get('tagging_vocab_extractor_suggest_cck', '')
  );

  return system_settings_form($form);
}