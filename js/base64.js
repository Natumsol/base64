define(function(require, exports, module) {

	var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""); //索引表

	/**
	 * @author natumsol@gmail.com
	 * @description 将二进制序列转换为Base64编码
	 * @param  {String}
	 * @return {String}
	 */
	function binToBase64(bitString) {
		var result = "";
		var tail = bitString.length % 6;
		var bitStringTemp1 = bitString.substr(0, bitString.length - tail);
		var bitStringTemp2 = bitString.substr(bitString.length - tail, tail);
		for (var i = 0; i < bitStringTemp1.length; i += 6) {
			var index = parseInt(bitStringTemp1.substr(i, 6), 2);
			result += code[index];
		}
		bitStringTemp2 += new Array(7 - tail).join("0");
		if (tail) {
			result += code[parseInt(bitStringTemp2, 2)];
			result += new Array((6 - tail) / 2 + 1).join("=");
		}
		return result;
	}

	/**
	 * @author natumsol@gmail.com
	 * @description 将base64编码转换为二进制序列
	 * @param  {String}
	 * @return {String}
	 */
	function base64ToBin(str) {
		var bitString = "";
		var tail = 0;
		for (var i = 0; i < str.length; i++) {
			if (str[i] != "=") {
				var decode = code.indexOf(str[i]).toString(2);
				bitString += (new Array(7 - decode.length)).join("0") + decode;
			} else {
				tail++;
			}
		}
		return bitString.substr(0, bitString.length - tail * 2);
	}

	/**
	 * @description 将字符转换为二进制序列
	 * @param  {String} str 
	 * @return {String}    
	 */
	function stringToBin(str) {
		var result = "";
		for (var i = 0; i < str.length; i++) {
			var charCode = str.charCodeAt(i).toString(2);
			result += (new Array(9 - charCode.length).join("0") + charCode);
		}
		return result;
	}
	/**
	 * @description 将二进制序列转换为字符串
	 * @param {String} Bin 
	 */
	function BinToStr(Bin) {
		var result = "";
		for (var i = 0; i < Bin.length; i += 8) {
			result += String.fromCharCode(parseInt(Bin.substr(i, 8), 2));
		}
		return result;
	}

	function numToString(num) {
		var bin = num.toString(2);
		return new Array(9 - bin.length).join(0) + bin;
	}

	exports.base64 = function(str) {
		return binToBase64(stringToBin(str));
	}
	exports.decodeBase64 = function(str) {
		return BinToStr(base64ToBin(str));
	}
	exports.numToString = numToString;
	exports.stringToBin = stringToBin;
	exports.binToBase64 = binToBase64;
	exports.base64ToBin = base64ToBin;
	exports.BinToStr = BinToStr;
})