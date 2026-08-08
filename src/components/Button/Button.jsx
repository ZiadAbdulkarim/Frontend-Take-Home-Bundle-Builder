import styles from './Button.module.css'

function Button({ children, className = '', ...props }) {
  return (
    <button className={`${styles.button} ${className}`.trim()} type="button" {...props}>
      {children}
    </button>
  )
}

export default Button
