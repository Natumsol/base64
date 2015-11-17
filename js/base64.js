define(function(require, exports, module) {
	/**
	 * @param  {[type]}
	 * @return {[type]}
	 */
	var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");

	function strToBase64(bitString) {
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

	function base64ToStr(str) {
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
		return bitString.substr(0, bitString.length - (6 - tail * 2));
	}
	/**
	 * @param  {[type]}
	 * @return {[type]}
	 */
	function stringToBin(str) {
		var result = "";
		for (var i = 0; i < str.length; i++) {
			var charCode = str.charCodeAt(i).toString(2);
			result += (new Array(9 - charCode.length).join("0") + charCode);
		}
		return result;
	}

	function BinToStr(Bin) {
		var result = "";
		for (var i = 0; i < Bin.length; i += 8) {
			result += String.fromCharCode(parseInt(Bin.substr(i, 8), 2));
		}
		return result;
	}
	exports.base64 = function(str) {
		return strToBase64(stringToBin(str));
	}
	exports.decodeBase64 = function(str) {
		return BinToStr(base64ToStr(str));
	}
})