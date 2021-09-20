(function() {

var camera, scene, renderer, controls;
const SIZE = 300;
const ELEMENT = document.currentScript.dataset.element;

function init(shader_content) {

	// Helper function
	const newMatWithFrag = fragmentShader => {
		return new THREE.ShaderMaterial({
			vertexShader: shader_content.vert,
			fragmentShader: fragmentShader,
			uniforms: {
				resolution: {
					value: SIZE * window.devicePixelRatio
				}
			}
		});
	};

	// Camera
	camera = new THREE.OrthographicCamera( -0.5, 0.5, 0.5, -0.5, 1, 2 );

	// Scene
	scene = new THREE.Scene();

	// Plane
	var geometry = new THREE.PlaneGeometry(1, 1);
	var material = new THREE.ShaderMaterial({
		vertexShader: shader_content.vert,
		fragmentShader: shader_content.frag,
		uniforms: {
			resolution: {
				value: SIZE * window.devicePixelRatio
			}
		}
	});

	var plane = new THREE.Mesh( geometry, material );
	scene.add( plane );
	plane.position.z = -1;

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( SIZE, SIZE );

	const renderTarget = document.querySelector(`#${ELEMENT}`);
	renderTarget.appendChild( renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );

	const codeDisplay = document.querySelector(`#${ELEMENT}-code`);
	codeDisplay.innerHTML = shader_content.frag;

	// Bind to edit button
	const updateBtn = document.querySelector(`#${ELEMENT}-update`);
	updateBtn.addEventListener("click", e => {
		const newMat = newMatWithFrag(codeDisplay.innerHTML);
		plane.material = newMat;
	});
}

// Window resize
function onWindowResize() {
	camera.aspect = SIZE / SIZE;
	camera.updateProjectionMatrix();
	renderer.setSize( SIZE, SIZE );
}

// Animate
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

// Shaders
const PATH = `shaders/${ELEMENT}/`;
let shader_names = [`${PATH}shader.vert`, `${PATH}shader.frag`];
let promises = shader_names.map(shader_name => loadShader(shader_name));
Promise.all(promises).then(shader_content => {
	init({
		vert: shader_content[0],
		frag: shader_content[1]
	});
	animate();
});
function loadShader(url) {
	return new Promise(resolve => {
		new THREE.FileLoader().load(url, resolve);
	});
}

})()
