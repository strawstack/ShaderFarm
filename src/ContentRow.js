import React from 'react';
import styles from './ContentRow.module.css';

class ContentRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            frag: this.props.frag
        };

        this.codeDisplay = undefined;

        this.SIZE = 300;

        // Camera
        this.camera = new this.props.three.OrthographicCamera( -0.5, 0.5, 0.5, -0.5, 1, 2 );

        // Scene
        this.scene = new this.props.three.Scene();

        // Plane
        var geometry = new this.props.three.PlaneGeometry(1, 1);
        var material = new this.props.three.ShaderMaterial({
            vertexShader: this.props.vert,
            fragmentShader: this.state.frag,
            uniforms: {
                resolution: {
                    value: this.SIZE * window.devicePixelRatio
                }
            }
        });

        this.plane = new this.props.three.Mesh( geometry, material );
        this.scene.add( this.plane );
        this.plane.position.z = -1;

        this.renderer = new this.props.three.WebGLRenderer( { antialias: true } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( this.SIZE, this.SIZE );
    }

    animate() {
        requestAnimationFrame( () => this.animate() );
        this.renderer.render( this.scene, this.camera );
    }

    componentDidMount() {
        window.addEventListener( 'resize', () => this.onWindowResize(), false );
        const renderTarget = document.querySelector(`#${this.props.name}-display`);
        renderTarget.appendChild( this.renderer.domElement );
        this.codeDisplay = document.querySelector(`#${this.props.name}-code`);
        this.codeDisplay.innerHTML = this.decodeHtml(this.state.frag);
        this.animate();
    }

    onWindowResize() {
        this.camera.aspect = this.SIZE / this.SIZE;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( this.SIZE, this.SIZE );
    }

    newMatWithFrag = (fragmentShader) => {
        return new this.props.three.ShaderMaterial({
            vertexShader: this.props.vert,
            fragmentShader: fragmentShader,
            uniforms: {
                resolution: {
                    value: this.SIZE * window.devicePixelRatio
                }
            }
        });
    };

    clickEvent(e) {
        const newMat = this.newMatWithFrag(this.decodeHtml(this.codeDisplay.innerHTML));
        this.plane.material = newMat;
    }

    decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    render() {
        return (
            <div className={styles.ContentRow}>
                <div className={styles.ShaderDisplay} id={`${this.props.name}-display`}></div>
                <div className={styles.CodeContainer}>
                    <div 
                        className={styles.CodeDisplay}
                        id={`${this.props.name}-code`}
                        contentEditable 
                        spellCheck="false"
                    ></div>
                    <div 
                    className={styles.UpdateBtn}
                        onClick={(e) => this.clickEvent(e)}
                    >UPDATE</div>
                </div>
            </div>
        );
    }
}

export default ContentRow;