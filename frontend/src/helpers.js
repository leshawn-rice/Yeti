const handleScroll = (oldScrollPos, div, scrollDownPos, scrollUpPos) => {
  let newScrollPos = window.pageYOffset;

  // on ios, this causes the navbar to disappear then reappear due to the bouncy scrolling

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