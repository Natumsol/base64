require(["./js/domReady", "./js/base64"], function(domReady, base) {
	domReady(function() {
		var $ = document.getElementById.bind(document);
		$("convert1").addEventListener("click", function() {
			$("target1").value = base.base64($("source1").value);
		}, false);
		$("convert2").addEventListener("click", function() {
			$("target2").value = base.decodeBase64($("source2").value);
		}, false);

		function getCanvas(w, h) {
			var c = document.createElement('canvas');
			c.width = w;
			c.height = h;
			return c;
		}

		function getPixels(img) {
			var c = getCanvas(img.width, img.height);
			var ctx = c.getContext('2d');
			ctx.drawImage(img, 0, 0);
			return ctx.getImageData(0, 0, c.width, c.height);
		}


		function img2Base64(img) {
			var imgData = getPixels(img).data;
			var imgWidth = getPixels(img).width;
			var imgHeight = getPixels(img).height;
			var bin = "";
			for (var i = 0; i < imgData.length; i++) {
				bin += base.numToString(imgData[i]);
			}
			bin = bin + base.stringToBin("$$" + imgWidth + "," + imgHeight + "$$");
			return base.binToBase64(bin);
		}



		function paint(imgData) {
			var canvas = document.getElementById("myCanvas");
			var ctx = canvas.getContext("2d");
			ctx.fillRect(0, 0, imgData.width, imgData.height);
			ctx.putImageData(imgData, 0, 0);
		}

		function base642img(data) {
			var str = base.BinToStr(base.base64ToBin(data));
			var imgWidth = str.match(/\$\$(\d+),(\d+)\$\$$/, "")[1];
			var imgHeight = str.match(/\$\$(\d+),(\d+)\$\$$/, "")[2]
			var imgData = base.base64ToBin(data).replace(base.stringToBin("$$" + imgWidth + "," + imgHeight + "$$"), "");

			var ImageDataArray = new Uint8ClampedArray(imgWidth * imgHeight * 4);
			for (var i = 0; i < ImageDataArray.length; i++) {
				ImageDataArray[i] = parseInt(imgData.substr(i * 8, 8), 2);
			}
			return new ImageData(ImageDataArray, imgWidth, imgHeight);

		}


		var img = $("img");
		$("imgData").value = img2Base64(img).substr(0, 2000) + "\n太多了后面省略。。";
		paint(base642img(img2Base64(img)));
	})
})