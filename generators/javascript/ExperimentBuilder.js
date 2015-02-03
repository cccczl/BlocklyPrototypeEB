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

var blockNumber = 0;
TechDev['methods'] ={};

function getNextBlocksCode(block) {
	var nextBlock = block.getNextBlock();
	var nextBlocksCode = "";
	if(nextBlock) {
		var nextBlockCodeGenerator = Blockly.JavaScript[nextBlock.type];
		nextBlocksCode = nextBlockCodeGenerator(nextBlock, true);
	}
	
	return nextBlocksCode;
}

Blockly.JavaScript['eb_start'] = function(block) {
	blockNumber++;
	return "<<" + blockNumber + "Call>>";
};

Blockly.JavaScript['eb_wait'] = function(block) {
	var blockMethod = Blockly.JavaScript.provideFunction_(
	'block' + blockNumber + 'Method',
	[	'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '(duration) {',		
		'\thttpRequest = new XMLHttpRequest();',
		'\thttpRequest.open("get", \'http://localhost:1337/Wait/\' + duration + \'?format=json\', true);',
		'\thttpRequest.onreadystatechange = function(e) {',
		'\t\tif(httpRequest.readyState != 4) {',
		'\t\t\treturn;',
		'\t\t}',
		'\t\tguid = httpRequest.responseText;',
		'\t\t<<' + blockNumber + 'PollingCall>>',
		'\t};',
		'\thttpRequest.send();',
		'}'
	]);
	
	var pollingMethod = Blockly.JavaScript.provideFunction_(
	'block' + blockNumber + 'PollingMethod',
	[	'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '(guid) {',		
		'\thttpRequest = new XMLHttpRequest();',
		'\thttpRequest.open("get", "http://localhost:1337/ExperimentBuilder/" + guid + "?format=json", true);',
		'\thttpRequest.onreadystatechange = function(e) {',
		'\t\tif(httpRequest.readyState != 4) {',
		'\t\t\treturn;',
		'\t\t}',
		'\t\tstate = httpRequest.responseText;',
		'\t\tif (state == "Finished") {',
		'\t\t\t<<' + (blockNumber + 1) + 'Call>>',
		'\t\t} else if (state == "Errored") {',
		'\t\t\talert("An error occurred.");',
		'\t\t\treturn;',
		'\t\t} else {',
		'\t\t\t<<' + blockNumber + 'PollingCall>>',
		'\t\t}',
		'\t};',
		'\thttpRequest.send();',
		'}'
	]);
	
	var duration = Blockly.JavaScript.valueToCode(block, 'DURATION',
        Blockly.JavaScript.ORDER_NONE) || '0';
	
	TechDev['methods'][blockNumber + "Call"] = blockMethod + '(' + duration + ');\n';  
	TechDev['methods'][blockNumber + "PollingCall"] = pollingMethod + '(guid);\n';  
	
	blockNumber++;
	return "";
};