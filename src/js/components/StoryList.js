import { LitElement, html, css } from 'lit';
import './StoryCard.js';

class StoryList extends LitElement {
  static properties = {
    stories: { type: Array }
  };

  static styles = css`
    .story-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      padding: 2rem;
      justify-items: center;
    }

    .empty-message {
      text-align: center;
      font-size: 1.2rem;
      color: #777;
      margin-top: 2rem;
    }

    .fade-in {
      opacity: 0;
      animation: fadeIn 0.8s ease-in-out forwards;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;

  render() {
    return html`
      <div class="story-list">
        ${this.stories.length > 0 
          ? this.stories.map((story, index) => html`
              <story-card class="fade-in" style="animation-delay: ${index * 0.2}s" .story="${story}"></story-card>
            `)
          : html`<p class="empty-message">Belum ada cerita. Tambahkan cerita pertama Anda!</p>`}
      </div>
    `;
  }
}

customElements.define('story-list', StoryList);
