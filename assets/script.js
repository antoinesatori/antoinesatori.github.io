document.addEventListener('DOMContentLoaded', () => {
  // Sélectionne tous les liens YouTube
  document.querySelectorAll('a[href*="youtu.be"], a[href*="youtube.com"]').forEach(link => {
    try {
      const href = link.getAttribute('href');
      const url = new URL(href, window.location.origin);
      let videoId = "";

      if (url.hostname.includes("youtu.be")) {
        // Format court : https://youtu.be/VIDEO_ID
        videoId = url.pathname.slice(1);
      } else if (url.hostname.includes("youtube.com")) {
        // Format long : https://www.youtube.com/watch?v=VIDEO_ID
        videoId = url.searchParams.get("v");
      }

      if (!videoId) return;

      const thumbUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      const title = link.textContent.trim();

      // Création de la carte
      const card = document.createElement("a");
      card.href = href;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      card.className = "video-card";

      card.innerHTML = `
        <div class="video-thumb">
          <img src="${thumbUrl}" alt="${title}">
        </div>
        <div class="video-info">
          <div class="video-title">${title}</div>
          <div class="video-meta">Voir sur YouTube</div>
        </div>
      `;

      link.replaceWith(card);

    } catch (e) {
      console.warn("Lien YouTube non transformé :", link, e);
    }
  });
});

