import styles from './Thumbnail.module.css'

function Thumbnail({ src, alt, size = 'sm' }) {
  return <img src={src} alt={alt} className={`${styles.thumb} ${styles[size]}`} />
}

export default Thumbnail
