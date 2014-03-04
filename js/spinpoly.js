define(['lib/three.min', 'lib/mootools'], function () {
	return new Class(function () {
		//private
		var mesh = null;
		var loaded = false;
		var onScene = false;
		var speed = null;
		var lastFrame = 0;
		var lastFrameRenderedFlag = false;

		Object.append(this, {
			//public
			getMesh : function () {
				return mesh;
			},
			setMesh : function (value) {
				mesh = value;
			},
			getSpeed : function () {
				return speed;
			},
			setSpeed : function (value) {
				speed = value;
			},
			//create mesh
			load : function (pos) {
				var geometry = new THREE.CubeGeometry(
						1,
						1,
						1);
				/*
				Create a texture for the material
				 */
				var texture = new THREE.Texture(makeTexture());
				texture.needsUpdate = true;

				/*
				Create a material for the mesh
				 */
				material = new THREE.MeshLambertMaterial({
						map : texture,
						vertexColors : THREE.VertexColors
					});

				/*
				Create the mesh using the geometry and materials we just created
				 */
				mesh = new THREE.Mesh(
						geometry,
						material);
				mesh.overdraw = true;
				mesh.position = pos;
				speed = .09;
				loaded = true;

				function makeTexture() {
					var canvas = document.createElement('canvas');
					canvas.width = 256;
					canvas.height = 256;
					var context = canvas.getContext('2d');

					//fill it with white & black border
					context.fillStyle = '#ffffff';
					context.fillRect(0, 0, 256, 256);
					context.lineWidth = 10;
					context.strokeRect(0, 0, 256, 256);

					// return the just built canvas2
					return canvas;
				};
			},

			hasLoaded : function () {
				return loaded;
			},
			onScene : function () {
				return onScene;
			},
			addToScene : function (scene) {
				scene.add(mesh);
				onScene = true;
			},
			updateBox : function () {
				var time = (new Date()).getTime();
				var delta_t = time - lastFrame;
				mesh.rotation.y += speed * delta_t * 2 * Math.PI / 1000;
				mesh.rotation.z += speed * delta_t * 2 * Math.PI / 1000;
				//mesh.position.z  = speed * time * 2 * Math.PI / 1000;
				lastFrame = time;
			}
		});
	});
});
