import { useEffect, useMemo, useState } from 'react'
import styles from './BundleBuilderPage.module.css'
import AccordionStep from '../../features/bundle-builder/components/AccordionStep/AccordionStep'
import ProductCard from '../../features/bundle-builder/components/ProductCard/ProductCard'
import ReviewPanel from '../../features/bundle-builder/components/ReviewPanel/ReviewPanel'
import { bundleSteps, createInitialSelectionState } from '../../data/bundleData'
import { usePersistentState } from '../../hooks/usePersistentState'

function BundleBuilderPage() {
  const [selectionState, setSelectionState] = usePersistentState('bundle-builder-state', createInitialSelectionState())
  const [saveStatus, setSaveStatus] = useState('')
  const [checkoutMessage, setCheckoutMessage] = useState('')

  const selectedProducts = useMemo(() => {
    return bundleSteps.flatMap((step) =>
      step.products.flatMap((product) => {
        if (product.variants?.length) {
          return product.variants.map((variant) => ({
            ...product,
            variant,
            key: variant.id,
            stepId: step.id,
            category: step.category,
            quantity: selectionState.quantities[variant.id] || 0,
            selectedVariantId: selectionState.selectedVariants[product.id],
          }))
        }

        return [{
          ...product,
          key: product.id,
          stepId: step.id,
          category: step.category,
          quantity: selectionState.quantities[product.id] || 0,
          selectedVariantId: selectionState.selectedVariants[product.id],
        }]
      }),
    )
  }, [selectionState.quantities, selectionState.selectedVariants])

  const reviewItems = useMemo(() => {
    return selectedProducts
      .filter((product) => product.quantity > 0)
      .map((product) => ({
        id: product.key,
        name: product.variant ? `${product.name} • ${product.variant.label}` : product.name,
        category: product.category,
        image: product.image,
        quantity: product.quantity,
        price: product.price,
        comparePrice: product.comparePrice || null,
        total: product.price * product.quantity,
        compareTotal: product.comparePrice ? product.comparePrice * product.quantity : null,
        isFree: product.isFree || false,
        isPlan: product.isPlan || false,
      }))
  }, [selectedProducts])

  const reviewGroups = useMemo(() => {
    const categories = ['Cameras', 'Sensors', 'Accessories', 'Plan']

    return categories
      .map((category) => ({
        category,
        items: reviewItems.filter((item) => item.category === category),
      }))
      .filter((group) => group.items.length > 0)
  }, [reviewItems])

  const total = reviewItems.reduce((sum, item) => sum + (item.isFree ? 0 : item.total), 0)
  const subtotal = reviewItems.reduce((sum, item) => {
    if (item.isFree) return sum + item.total
    return sum + (item.compareTotal || item.total)
  }, 0)
  const savings = Math.round((subtotal - total) * 100) / 100

  const handleSelectVariant = (productId, variantId) => {
    setSelectionState((current) => ({
      ...current,
      selectedVariants: {
        ...current.selectedVariants,
        [productId]: variantId,
      },
    }))
  }

  const handleQuantityChange = (productKey, nextValue) => {
    setSelectionState((current) => ({
      ...current,
      quantities: {
        ...current.quantities,
        [productKey]: nextValue,
      },
    }))
  }

  const handleStepChange = (nextIndex) => {
    setSelectionState((current) => ({
      ...current,
      activeStep: current.activeStep === nextIndex ? -1 : nextIndex,
    }))
  }

  const handleNext = (index) => {
    if (index < 3) {
      handleStepChange(index + 1)
    }
  }

  const activeStep = selectionState.activeStep ?? 0

  const handleSave = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('bundle-builder-state', JSON.stringify(selectionState))
      setSaveStatus('Saved locally')
      setCheckoutMessage('')
    }
  }

  const handleCheckout = () => {
    setCheckoutMessage('Checkout is a placeholder in this prototype.')
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage.getItem('bundle-builder-state')) {
      setSaveStatus('Restored your saved system')
    }
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.builder}>

          <div className={styles.stepContent}>
            {bundleSteps.map((step, index) => {
              const selectedCount = step.products.reduce((count, product) => {
                if (product.variants?.length) {
                  return count + (product.variants.some((variant) => (selectionState.quantities[variant.id] || 0) > 0) ? 1 : 0)
                }
                return count + ((selectionState.quantities[product.id] || 0) > 0 ? 1 : 0)
              }, 0)

              return (
                <AccordionStep
                  key={step.id}
                  step={step}
                  index={index}
                  isOpen={activeStep === index}
                  selectedCount={selectedCount}
                  onToggle={handleStepChange}
                  onNext={handleNext}
                  nextLabel={bundleSteps[index + 1]?.title || 'Review'}
                >
                  <div className={styles.cardsGrid}>
                    {step.products.map((product) => {
                      const selectedVariantId = selectionState.selectedVariants[product.id] || product.variants?.[0]?.id
                      const productQuantity = product.variants?.length
                        ? selectionState.quantities[selectedVariantId] || 0
                        : selectionState.quantities[product.id] || 0

                      return (
                        <ProductCard
                          key={product.id}
                          product={product}
                          quantity={productQuantity}
                          selectedVariantId={selectedVariantId}
                          onSelectVariant={handleSelectVariant}
                          onQuantityChange={(productId, nextValue) => {
                            if (product.variants?.length) {
                              const currentSelectedVariant = selectionState.selectedVariants[product.id] || product.variants[0].id
                              handleQuantityChange(currentSelectedVariant, nextValue)
                            } else {
                              handleQuantityChange(productId, nextValue)
                            }
                          }}
                        />
                      )
                    })}
                  </div>
                </AccordionStep>
              )
            })}
          </div>
        </div>
        <div className={styles.sidebar}>
          <ReviewPanel
            reviewGroups={reviewGroups}
            total={total}
            subtotal={subtotal}
            savings={savings}
            saveStatus={saveStatus}
            checkoutMessage={checkoutMessage}
            onSave={handleSave}
            onCheckout={handleCheckout}
            onQuantityChange={(productKey, nextValue) => handleQuantityChange(productKey, nextValue)}
          />
        </div>
      </div>
    </div>
  )
}

export default BundleBuilderPage
