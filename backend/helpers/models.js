/**
 * 
 * @param {object} currentRating 
 * @returns an object with properties wasUprated & wasDownrated, indicating the current rating 
 * of the given item (post/comment)
 * 
 * If the comment is currently uprated, it will return {wasUprated: true, wasDownrated: false} and vice-versa
 */

const checkLastRating = (currentRating) => {
  let wasUprated = false;
  let wasDownrated = false;
  // If no current rating, both are false
  if (!currentRating || !currentRating.rows.length) return { wasUprated, wasDownrated };

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