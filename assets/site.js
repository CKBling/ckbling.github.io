// Optional image failure handling. All content and navigation work without JS.
document.querySelectorAll('img').forEach((image) => {
  const showFallback = () => {
    const fallback = document.createElement('span');
    fallback.className = 'image-fallback';
    fallback.textContent = image.alt;
    image.replaceWith(fallback);
  };
  image.addEventListener('error', showFallback, { once: true });
  if (image.complete && image.naturalWidth === 0) showFallback();
});
