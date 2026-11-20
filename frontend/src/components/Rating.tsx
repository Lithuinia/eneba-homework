interface RatingProps {
  rating: number
  count?: number
}

export function Rating({ rating, count }: RatingProps) {
  const rounded = Math.round(rating)
  return (
    <span className="rating" aria-label={`${rating.toFixed(1)} out of 5`}>
      <span className="rating-stars" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= rounded ? 'star active' : 'star'}>
            ★
          </span>
        ))}
      </span>
      <span className="rating-value">{rating.toFixed(1)}</span>
      {typeof count === 'number' && <span className="rating-count">({count})</span>}
    </span>
  )
}
