/**
* @constructor
*/
function jamoutTHREEJS () {
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
}
/**
* init
*/
jamoutTHREEJS.prototype.init = function () {
	this.scene = new THREE.Scene();
	this.img = 'http://localhost:8000/images/j.jpg';
	this.camera();
	this.renderer();
	window.addEventListener( 'resize', this.onWindowResize(), false );
	this.createtorus();
	this.addShape(-105,0,0,7);
    this.addShape(-105,40,0,7);
    this.addShape(-105,-40,0,7);
	this.render();
};
/**
* Control the camera
*/
jamoutTHREEJS.prototype.camera = function () {
	this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000 );
	this.camera.position.set(0,0,20);

};
/**
* Constrol the rotation
*/
jamoutTHREEJS.prototype.rotation = function () {

	this.camera.position.z = 200;
};

/**
* Control the renderer
*/
jamoutTHREEJS.prototype.renderer = function (){
	this.renderer = new THREE.WebGLRenderer({ alpha: true, logarithmicDepthBuffer: true });
	this.renderer.setSize ( window.innerWidth, window.innerHeight);
	this.renderer.setClearColor( 0xff67ff, 0);

	var container = document.getElementById('jamout3dRender');
	    container.appendChild(this.renderer.domElement);
};
/**
* Properties of a 3d cube
*/
jamoutTHREEJS.prototype.createcube = function (){
	this.geometry = new THREE.BoxGeometry(1.8, 1.8, 1.8);
	var img = this.img;
	var color = new THREE.Color(0xFF69B4);
	// var boxTexture = THREE.ImageUtils.loadTexture(img);
    this.material = new THREE.MeshNormalMaterial( { color: color/*, wireframe: true*/ } );
};

/**
* Properties of a 3d torus
*/
jamoutTHREEJS.prototype.createtorus = function (){
	this.geometry = new THREE.TorusGeometry(8, 3, 16,100);
	var color = new THREE.Color(0xFF69B4);
    this.material = new THREE.MeshNormalMaterial();
};




/**
* Multiply and create cubes
* @param {number} x position
* @param {number} y position
* @param {number} z position
* @param {number} cubes # of horizontal cubes
*/
jamoutTHREEJS.prototype.addShape = function (x, y, z, cubes){
	for (var i = 0; i < cubes ; i++) {
	    this.shape = new THREE.Mesh(this.geometry, this.material);
	    this.shape.position.set(i*35+x, y, z);
		    this.scene.add(this.shape);
	    }
};
/**
* Redraw the screen on resize
*/
jamoutTHREEJS.prototype.onWindowResize = function () {

		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( window.innerWidth, window.innerHeight );

};
/**
* Render everything
*/
jamoutTHREEJS.prototype.render = function render() {
  
    	requestAnimationFrame( this.render.bind(this) );
			
		 this.rotation();		

		for ( var i = 0, l = this.scene.children.length; i < l; i ++ ) {

			var object = this.scene.children[ i ];

			object.rotation.x += 0.01;
			object.rotation.y += 0.01;

		}


			this.renderer.render(this.scene, this.camera);
	};


var CUBE = new jamoutTHREEJS();
CUBE.init();
