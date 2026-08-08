import styles from './AccordionStep.module.css'
import camerasIcon from '../../../../assets/images/Choose-your-cameras.png'
import sensorsIcon from '../../../../assets/images/Choose-your-sensors.png'
import protectionIcon from '../../../../assets/images/Add-extra-protection.png'
import planIcon from '../../../../assets/images/Choose-your-plan.png'

const STEP_ICONS = {
  cameras: camerasIcon,
  sensors: sensorsIcon,
  accessories: protectionIcon,
  plan: planIcon,
}

function ChevronIcon({ isOpen }) {
  return (
    <svg
      className={`${styles.chevronIcon} ${isOpen ? styles.chevronOpen : ''}`}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function AccordionStep({ step, index, isOpen, selectedCount, onToggle, onNext, nextLabel, children }) {
  const isLast = index === 3
  const stepIcon = STEP_ICONS[step.id]

  return (
    <section className={`${styles.step} ${isOpen ? styles.open : ''}`}>
      <button className={styles.header} type="button" onClick={() => onToggle(index)}>
        <div className={styles.eyebrowRow}>
          <div className={styles.eyebrow}>STEP {index + 1} OF 4</div>
        </div>
        <div className={styles.headerDivider} />
        <div className={styles.mainRow}>
          <div className={styles.headingRow}>
            {stepIcon ? (
              <div className={styles.iconWrap}>
                <img src={stepIcon} alt="" className={styles.icon} aria-hidden="true" />
              </div>
            ) : null}
            <h2 className={styles.title}>{step.title}</h2>
          </div>
          <div className={styles.meta}>
            {isOpen && selectedCount > 0 ? (
              <span className={styles.countBadge}>{selectedCount} selected</span>
            ) : null}
            <ChevronIcon isOpen={isOpen} />
          </div>
        </div>
      </button>
      {isOpen ? (
        <div className={styles.body}>
          {children}
          <div className={styles.actions}>
            <button className={styles.nextButton} type="button" onClick={() => onNext(index)}>
              {isLast ? 'Review your system' : `Next: ${nextLabel || 'next step'}`}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default AccordionStep
