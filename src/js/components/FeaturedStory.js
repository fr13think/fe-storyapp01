import { LitElement, html, css } from 'lit';

class FeaturedStory extends LitElement {
  static properties = {
    stories: { type: Array },
    currentIndex: { type: Number }
  };

  static styles = css`
    .featured-container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 2rem;
    }

    .slider-container {
      width: 100%;
      max-width: 800px; /* Maksimal ukuran slider */
      height: 400px; /* Tinggi slider tetap */
      overflow: hidden;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 12px;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
    }

    .slider-image {
      width: 100%;
      height: 100%;
      object-fit: cover; /* Gambar tetap proporsional */
      object-position: center; /* Selalu berada di tengah */
      border-radius: 12px;
    }

    .slider-text {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.6);
      color: white;
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 1.2rem;
      text-align: center;
    }

    .slider-buttons {
      margin-top: 1rem;
      display: flex;
      gap: 10px;
    }

    .btn {
      background: #6200ee;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 8px;
      cursor: pointer;
      transition: 0.3s;
    }

    .btn:hover {
      background: #4500bb;
    }
  `;

  constructor() {
    super();
    this.stories = [];
    this.currentIndex = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.stories.length) {
      console.warn('Tidak ada cerita unggulan.');
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.stories.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.stories.length) % this.stories.length;
  }

  render() {
    if (!this.stories.length) {
      return html`<p class="empty-message">Tidak ada cerita unggulan.</p>`;
    }

    return html`
      <div class="featured-container">
        <div class="slider-container">
          <img src="${this.stories[this.currentIndex].photoUrl}" class="slider-image" alt="${this.stories[this.currentIndex].name}">
          <div class="slider-text">${this.stories[this.currentIndex].name}</div>
        </div>
        <div class="slider-buttons">
          <button class="btn" @click="${this.prevSlide}">⭠ Sebelumnya</button>
          <button class="btn" @click="${this.nextSlide}">Selanjutnya ⭢</button>
        </div>
      </div>
    `;
  }
}

customElements.define('featured-story', FeaturedStory);
