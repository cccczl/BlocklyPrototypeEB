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

Blockly.JavaScript['test_wait'] = function(block) {
	var duration = Blockly.JavaScript.valueToCode(block, 'DURATION',
        Blockly.JavaScript.ORDER_NONE) || '0';
	
	var commandUrl = '\'' + 'http://localhost:1337/Wait/' + duration + '?format=json\'';	
	
	var functionName = Blockly.JavaScript.provideFunction_(
	'executeWaitBlock',
	[	'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '(duration) {',		
		'\thttpRequest = new XMLHttpRequest();',
		'\thttpRequest.open("get", \'http://localhost:1337/Wait/\' + duration + \'?format=json\' , true);',
		'\thttpRequest.onreadystatechange = function(e) {',
		'\t\tif(httpRequest.readyState != 4) {',
		'\t\t\treturn;',
		'\t\t}',
		'\t\tvar responseText = httpRequest.responseText;',
		'\t\t// todo - do something with the response text',
		'\t}',
		'\thttpRequest.send();',
		'}'
	]);
	
	var code = functionName + '(' + duration + ');\n';  
	return code;
};

Blockly.JavaScript['test_apiCall'] = function(block) {
	var url = Blockly.JavaScript.valueToCode(block, 'URL',
        Blockly.JavaScript.ORDER_NONE) || '\'\'';
	var urlLength = url.length;	
		
	var withoutQuotes = url.substring(1, urlLength - 1);	
	var fullUrl = '\'' + 'http://' + withoutQuotes + '\'';	
		
	var functionName = Blockly.JavaScript.provideFunction_(
	'apiCall',
	[	'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '(url, httpRequest) {',
		'if(!httpRequest) {',
			'httpRequest = new XMLHttpRequest();',
			'httpRequest.open("get", url, true);',
			'httpRequest.send();',
		'} else if (httpRequest.readyState === 4) {',
			'var response = httpRequest.responseText;',
			'alert(response);',
			'return response;',			
		'}',
		Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '(\'\', httpRequest);',
		'};'
	]);
	var code = functionName + '(' + fullUrl + ', null);\n';
	return code;
};