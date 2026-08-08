import styles from './ReviewPanel.module.css'
import QuantityStepper from '../../../../components/QuantityStepper/QuantityStepper'
import guaranteeImg from '../../../../assets/images/Wyze-satisfaction-guarantee.png'
import shippingImg from '../../../../assets/images/Fast-Shipping.png'
import camUnlimitedImg from '../../../../assets/images/Cam-Unlimited.png'

function ReviewPanel({ reviewGroups, total, subtotal, savings, saveStatus, checkoutMessage, onSave, onCheckout, onQuantityChange }) {
  return (
    <aside className={styles.panel}>
      <div className={styles.headerBlock}>
        <div className={styles.eyebrow}>REVIEW</div>
        <h2 className={styles.header}>Your security system</h2>
        <p className={styles.subtitle}>
          Review your personalized protection system designed to keep what matters most safe.
        </p>
      </div>

      <div className={styles.divider} />

      <div className={styles.body}>
        {reviewGroups.map((group, groupIndex) => (
          <div key={group.category} className={styles.groupWrap}>
            {groupIndex > 0 ? <div className={styles.divider} /> : null}
            <div className={styles.group}>
              <div className={styles.groupTitle}>{group.category}</div>
              <div className={styles.groupItems}>
                {group.items.map((item) => (
                  item.isPlan ? (
                    <div key={item.id} className={styles.row}>
                      <div className={styles.rowLeft}>
                        <div className={styles.planName}>
                          <img src={camUnlimitedImg} alt="" className={styles.planIcon} aria-hidden="true" />
                          <span>Cam <strong className={styles.planBrand}>Unlimited</strong></span>
                        </div>
                      </div>
                      <div className={styles.rowRight}>
                        <div className={styles.priceBlock}>
                          {item.comparePrice ? (
                            <span className={styles.comparePrice}>${item.comparePrice.toFixed(2)}/mo</span>
                          ) : null}
                          <span className={styles.price}>${item.price.toFixed(2)}/mo</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={item.id} className={styles.row}>
                      <div className={styles.rowLeft}>
                        <div className={styles.thumbWrap}>
                          <img src={item.image} alt={item.name} className={styles.thumb} />
                        </div>
                        <div className={styles.itemInfo}>
                          <div className={styles.name}>{item.name}</div>
                        </div>
                      </div>
                      <div className={styles.rowRight}>
                        <QuantityStepper
                          value={item.quantity}
                          onChange={(nextValue) => onQuantityChange(item.id, nextValue)}
                          variant="frameless"
                        />
                        <div className={styles.priceBlock}>
                          {item.isFree ? (
                            <>
                              <span className={styles.comparePrice}>${item.total.toFixed(2)}</span>
                              <span className={styles.freeBadgeInline}>FREE</span>
                            </>
                          ) : (
                            <>
                              {item.compareTotal ? (
                                <span className={styles.comparePrice}>${item.compareTotal.toFixed(2)}</span>
                              ) : null}
                              <span className={styles.price}>${item.total.toFixed(2)}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className={styles.divider} />

        {/* Shipping row */}
        <div className={styles.shippingRow}>
          <div className={styles.perkLabel}>
            <div className={styles.thumbWrap}>
              <img src={shippingImg} alt="" className={styles.thumb} aria-hidden="true" />
            </div>
            <span className={styles.perkText}>Fast Shipping</span>
          </div>
          <div className={styles.shippingPrice}>
            <span className={styles.comparePrice}>$5.99</span>
            <span className={styles.freeBadgeInline}>FREE</span>
          </div>
        </div>

        {/* Guarantee + Total pricing section matching Figma composition */}
        <div className={styles.pricingSection}>
          <div className={styles.guaranteeLeft}>
            <img src={guaranteeImg} alt="Wyze 100% Satisfaction Guarantee" className={styles.guaranteeBadgeImg} />
          </div>
          <div className={styles.pricingRight}>
            <span className={styles.financingBadge}>as low as $19.19/mo</span>
            <div className={styles.totalPriceRow}>
              {subtotal > total ? (
                <span className={styles.totalCompare}>${subtotal.toFixed(2)}</span>
              ) : null}
              <strong className={styles.totalPrice}>${total.toFixed(2)}</strong>
            </div>
          </div>
        </div>

        {savings > 0 ? (
          <div className={styles.successText}>
            Congrats! You&apos;re saving ${savings.toFixed(2)} on your security bundle!
          </div>
        ) : null}

        <button className={styles.cta} type="button" onClick={onCheckout}>Checkout</button>
        {checkoutMessage ? <span className={styles.checkoutMessage}>{checkoutMessage}</span> : null}

        <div className={styles.saveWrap}>
          <button className={styles.saveLink} type="button" onClick={onSave}>Save my system for later</button>
        </div>
      </div>
    </aside>
  )
}

export default ReviewPanel
