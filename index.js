const scrollContainer = document.getElementById("scrollContainer");
const customScrollbar = document.getElementById("customScrollbar");
const scrollbarThumb = document.getElementById("scrollbarThumb");

const fragment = document.createDocumentFragment();
Array.from({ length: 100 }, (_, index) => {
  const item = document.createElement("div");
  item.setAttribute("id", index);
  item.classList.add("item");
  item.innerText = `Item   ${index}`;

  fragment.appendChild(item);
});
scrollContainer.appendChild(fragment);

const maxScrollTop =
  scrollContainer.scrollHeight - scrollContainer.clientHeight;

scrollContainer.addEventListener("scroll", () => {
  const scrollRatio = scrollContainer.scrollTop / maxScrollTop;

  scrollbarThumb.style.top = `${
    scrollRatio * (customScrollbar.offsetHeight - scrollbarThumb.offsetHeight)
  }px`;
});

let isDragging = false;
let initialMouseY;

scrollbarThumb.addEventListener("mousedown", (event) => {
  isDragging = true;
  initialMouseY = event.clientY - scrollbarThumb.getBoundingClientRect().top;
  document.addEventListener("mousemove", handleThumbDrag);
  document.addEventListener("mouseup", stopThumbDrag);
});

function handleThumbDrag(event) {
  if (!isDragging) return;

  const scrollbarBounds = customScrollbar.getBoundingClientRect();
  const thumbHeight = scrollbarThumb.offsetHeight;
  const minY = scrollbarBounds.top;
  const maxY = scrollbarBounds.bottom - thumbHeight;

  let newThumbPosition = event.clientY - initialMouseY;
  newThumbPosition = Math.max(minY, Math.min(newThumbPosition, maxY));

  scrollbarThumb.style.top = `${newThumbPosition - scrollbarBounds.top}px`;

  scrollContainer.scrollTop =
    ((newThumbPosition - scrollbarBounds.top) * maxScrollTop) /
    (customScrollbar.offsetHeight - scrollbarThumb.offsetHeight);
}

function stopThumbDrag() {
  isDragging = false;
  document.removeEventListener("mousemove", handleThumbDrag);
  document.removeEventListener("mouseup", stopThumbDrag);
}
