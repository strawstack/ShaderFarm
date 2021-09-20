import styles from './App.module.css';
import ContentRows from './ContentRows.js';

function App() {
  return (
    <div className={styles.App}>
      <a href="https://richard.dev" target="_blank" rel="noreferrer">
        <div className={styles.CreatedBy}>richard.dev</div>
      </a>
      <div className={styles.PageArea}>
        <div className={styles.ContentArea}>
          <div className={styles.PageTitle}>
              <h1><span>Shader</span> <span>Farm</span></h1>
          </div>
          <div className={styles.PageExplination}>
              <p className={styles.PageDescription}>Shader Farm is a place to view and edit shader code. Shaders are written in WebGL and rendered with ThreeJS and HTML5 canvas elements.</p>
              <p className={styles.PageDescription}>The code shown next to each shader is the actual fragment shader code used for rendering. Edit the code below and click "Update" to apply changes in realtime.</p>
          </div>
          <ContentRows />
          <div className={styles.GithubBanner}>
                <p>Code available on <a href="https://github.com/strawstack/FragShaderTemplate" target="_blank" rel="noreferrer">Github</a></p>
            </div>          
        </div>
      </div>
    </div>
  );
}

export default App;
