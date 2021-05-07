const checkLastRating = (currentRating) => {
  let wasUprated = false;
  let wasDownrated = false;
  // If no current rating, both are false
  if (!currentRating.rows.length) return { wasUprated, wasDownrated };

  if (currentRating.rows[0].rating === 1) {
    wasUprated = true;
  }
  if (currentRating.rows[0].rating === -1) {
    wasDownrated = true;
  }
  return { wasUprated, wasDownrated }
}

module.exports = {
  checkLastRating
}