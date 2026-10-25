const showImageFallback = (image) => {
  const fallback = document.createElement('span');
  fallback.className = 'image-fallback';
  fallback.textContent = image.alt;
  image.replaceWith(fallback);
};

// Each publication accepts GIF, WebP, PNG, JPG, or JPEG; the SVG is the fallback placeholder.
document.querySelectorAll('img[data-publication-image]').forEach((image) => {
  const basePath = image.getAttribute('src').replace(/\.svg(?:[?#].*)?$/i, '');
  const extensions = ['gif', 'webp', 'png', 'jpg', 'jpeg', 'svg'];
  let extensionIndex = 0;

  image.addEventListener('error', () => {
    extensionIndex += 1;
    if (extensionIndex < extensions.length) {
      image.src = `${basePath}.${extensions[extensionIndex]}`;
    } else {
      showImageFallback(image);
    }
  });

  image.src = `${basePath}.${extensions[0]}`;
});

document.querySelectorAll('img:not([data-publication-image])').forEach((image) => {
  image.addEventListener('error', () => showImageFallback(image), { once: true });
  if (image.complete && image.naturalWidth === 0) showImageFallback(image);
});
