
/**
 * 
 * @param {float} oldScrollPos 
 * @param {HTMLElement} div 
 * @param {float} scrollDownPos 
 * @param {float} scrollUpPos 
 * 
 * handles scrolling behavior, and sets the given div's style to the scrollDownPos/scrollUpPos 
 * depending on whether the user scrolled up or down
 * 
 */

const handleScroll = (oldScrollPos, div, scrollDownPos, scrollUpPos) => {
  let newScrollPos = window.pageYOffset;

  if (!div) return;

  // At Top of page
  if (newScrollPos === 0) {
    div.style.top = scrollUpPos;
  }
  // At bottom of page
  else if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
    div.style.top = scrollDownPos;
  }
  // Scrolling Up
  else if (oldScrollPos > newScrollPos) {
    div.style.top = scrollUpPos;
  }
  // Scrolling Down
  else {
    div.style.top = scrollDownPos;
  }
  return newScrollPos;
}

/**
 * 
 * checks if the bottom of the page has been reached and returns the result
 */

const checkBottom = () => {
  if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
    return true;
  }
  return false;
}

export {
  handleScroll,
  checkBottom
};