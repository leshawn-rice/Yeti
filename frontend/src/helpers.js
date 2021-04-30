const handleScroll = (oldScrollPos, div, scrollDownPos, scrollUpPos) => {
  let newScrollPos = window.pageYOffset;

  // on ios, this causes the navbar to disappear then reappear due to the bouncy scrolling
  if (newScrollPos === 0) {
    div.style.top = scrollUpPos;
  }
  else if ((window.innerHeight + Math.ceil(window.pageYOffset + 1)) >= document.body.offsetHeight) {
    div.style.top = scrollDownPos;
  }
  else if (oldScrollPos > newScrollPos) {
    div.style.top = scrollUpPos;
  }
  else {
    div.style.top = scrollDownPos;
  }
  return newScrollPos;

}

export {
  handleScroll
};