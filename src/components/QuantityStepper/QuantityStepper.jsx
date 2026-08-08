import styles from './QuantityStepper.module.css'

function QuantityStepper({ value, onChange, variant }) {
  const stepperClass = `${styles.stepper} ${variant ? styles[variant] : ''}`

  return (
    <div className={stepperClass}>
      <button type="button" className={styles.button} onClick={() => onChange(Math.max(0, value - 1))}>
        −
      </button>
      <span className={styles.value}>{value}</span>
      <button type="button" className={styles.button} onClick={() => onChange(value + 1)}>
        +
      </button>
    </div>
  )
}

export default QuantityStepper
