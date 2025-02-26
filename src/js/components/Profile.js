import { LitElement, html, css } from 'lit';
import 'bootstrap/dist/css/bootstrap.min.css';

class Profile extends LitElement {
  static styles = css`
    .profile {
      padding: 2rem;
      text-align: center;
    }
    .card {
      margin: auto;
      max-width: 400px;
    }
  `;

  render() {
    return html`
      <div class="profile">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Developer Profile</h5>
            <p class="card-text">Nama: Your Name</p>
            <p class="card-text">Email: your_email@example.com</p>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('profile-page', Profile);