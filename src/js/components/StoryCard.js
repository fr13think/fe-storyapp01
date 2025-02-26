import { LitElement, html, css } from 'lit';
import 'bootstrap/dist/css/bootstrap.min.css';

class StoryCard extends LitElement {
  static properties = {
    story: { type: Object }
  };

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .card {
      width: 100%;
      max-width: 350px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }

    .card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .card-body {
      padding: 1rem;
    }

    .card-title {
      font-size: 1.3rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      color: #333;
    }

    .card-text {
      font-size: 0.95rem;
      color: black;
      line-height: 1.5;
    }

    .story-date {
      font-size: 0.8rem;
      color: #888;
    }

    .btn-primary {
      margin-top: 1rem;
      display: block;
      width: 100%;
      border-radius: 8px;
      background: #6200ee;
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      transition: background 0.3s;
    }

    .btn-primary:hover {
      background: #4500bb;
    }
  `;

  render() {
    return html`
      <div class="card">
        <img src="${this.story.photoUrl}" class="card-img-top" alt="${this.story.name}">
        <div class="card-body">
          <h5 class="card-title">${this.story.name}</h5>
          <p class="card-text">${this.story.description}</p>
          <p class="story-date"><small>${new Date(this.story.createdAt).toLocaleDateString('id-ID', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</small></p>
          <button class="btn btn-primary">Baca Selengkapnya</button>
        </div>
      </div>
    `;
  }
}

customElements.define('story-card', StoryCard);
