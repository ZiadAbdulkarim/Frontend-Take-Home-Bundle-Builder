import styles from './ProductCard.module.css'
import QuantityStepper from '../../../../components/QuantityStepper/QuantityStepper'

function ProductCard({ product, quantity, selectedVariantId, onSelectVariant, onQuantityChange }) {
  const selectedVariant = product.variants?.find((v) => v.id === selectedVariantId) || product.variants?.[0]
  const isSelected = quantity > 0

  return (
    <article className={`${styles.card} ${isSelected ? styles.selected : ''}`}>
      {/* Discount badge — absolute top-left of the image column */}
      {product.badge ? <span className={styles.badge}>{product.badge}</span> : null}

      {/* LEFT: image column */}
      <div className={styles.imageCol}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
        />
      </div>

      {/* RIGHT: content column */}
      <div className={styles.contentCol}>
        {/* Title + description + Learn More */}
        <div className={styles.titleBlock}>
          <h3 className={styles.title}>{product.name}</h3>
          <p className={styles.description}>
            {product.description}{' '}
            <a href="#" className={styles.link}>Learn More</a>
          </p>
        </div>

        {/* Variant selector — thumbnail image + label */}
        {product.variants?.length ? (
          <div className={styles.variantRow}>
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                className={`${styles.chip} ${selectedVariantId === variant.id ? styles.chipActive : ''}`}
                onClick={() => onSelectVariant(product.id, variant.id)}
              >
                {variant.image ? (
                  <img src={variant.image} alt="" className={styles.chipThumb} />
                ) : (
                  <span className={styles.chipSwatch} style={{ backgroundColor: variant.swatch }} />
                )}
                <span className={styles.chipLabel}>{variant.label}</span>
              </button>
            ))}
          </div>
        ) : null}

        {/* Footer: stepper left, price right */}
        <div className={styles.footer}>
          <QuantityStepper
            value={quantity}
            onChange={(nextValue) => onQuantityChange(product.id, nextValue)}
          />
          <div className={styles.priceBlock}>
            {product.comparePrice ? (
              <span className={styles.comparePrice}>${product.comparePrice.toFixed(2)}</span>
            ) : null}
            <span className={styles.price}>${product.price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
