import { LitElement, html, css } from 'lit';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome

class Navbar extends LitElement {
  createRenderRoot() {
    return this; // Agar tidak menggunakan shadow DOM, sehingga bisa memakai Bootstrap CSS
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .navbar {
      background-color: #6200ee !important;
      padding: 0.8rem 1.5rem;
    }

    .navbar-brand {
      display: flex;
      align-items: center;
      font-size: 1.2rem;
      font-weight: bold;
      color: white;
    }

    .navbar-brand i {
      margin-right: 8px;
      font-size: 1.4rem;
      color: #ffcc00;
    }

    .navbar-toggler {
      border: none;
      outline: none;
    }

    .nav-link {
      color: white !important;
      font-size: 1rem;
      padding: 0.5rem 1rem;
      transition: color 0.3s ease-in-out;
    }

    .nav-link:hover {
      color: #ffcc00 !important;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .navbar {
        padding: 0.5rem 1rem;
      }

      .nav-link {
        font-size: 0.9rem;
      }
    }
  `;

  constructor() {
    super();
    console.log('Navbar component created');
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('Navbar component connected to the DOM');

    this.addEventListener('click', (event) => {
      const toggler = this.querySelector('.navbar-toggler');
      const menu = this.querySelector('#navbarNav');

      if (event.target === toggler || toggler.contains(event.target)) {
        const isExpanded = menu.classList.contains('show');

        if (isExpanded) {
          menu.classList.remove('show');
          toggler.setAttribute('aria-expanded', 'false');
        } else {
          menu.classList.add('show');
          toggler.setAttribute('aria-expanded', 'true');
        }
      }
    });
  }

  render() {
    console.log('Navbar component rendered');
    return html`
      <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container">
          <a class="navbar-brand" href="#">
            <i class="fas fa-globe"></i> Story App
          </a>
          <button class="navbar-toggler" type="button" aria-expanded="false">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link" href="index.html">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="add-story.html">Tambah Story</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="profile.html">Profile</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define('nav-bar', Navbar);
