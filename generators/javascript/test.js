/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for text blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.JavaScript.test');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['test_apiCall'] = function(block) {
	var url = Blockly.JavaScript.valueToCode(block, 'URL',
        Blockly.JavaScript.ORDER_NONE);
		
	var functionName = Blockly.JavaScript.provideFunction_(
	'test_apiCall',
	[	'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '(url) {',
		'var req = new XMLHttpRequest();',
		'req.open("get", , true);',
		'req.send();',
		'}'
	]);
	var code = functionName + '(' + url + ')';
	return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};