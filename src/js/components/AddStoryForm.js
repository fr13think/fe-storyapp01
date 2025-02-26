import { LitElement, html, css } from 'lit';

class AddStoryForm extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .form-container {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    padding: 1rem;
    }

    @media (min-width: 768px) {
      .form-container {
        width: 90%;
        max-width: 600px;
        padding: 1.5rem;
      }
    }

    @media (min-width: 992px) {
      .form-container {
        width: 80%;
        max-width: 800px;
        padding: 2rem;
      }
    }

    @media (min-width: 1200px) {
      .form-container {
        width: 70%;
        max-width: 900px;
      }
    }

    @media (min-width: 1400px) {
      .form-container {
        width: 60%;
        max-width: 1000px;
      }
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #333;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .form-control:focus {
      border-color: #1a73e8;
      box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
      outline: none;
    }

    textarea.form-control {
      min-height: 120px;
      resize: vertical;
    }

    .helper-text {
      font-size: 0.875rem;
      color: #666;
      margin-top: 0.25rem;
    }

    .preview-container {
      margin-top: 1rem;
      text-align: center;
    }

    .preview-image {
      max-width: 100%;
      max-height: 300px;
      border-radius: 8px;
      object-fit: contain;
    }

    .button-container {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      gap: 0.5rem;
    }

    .btn-primary {
      background-color: #1a73e8;
      color: white;
      width: 100%;
    }

    .btn-primary:hover {
      background-color: #1557b0;
    }

    .btn-primary:disabled {
      background-color: #89b4f7;
      cursor: not-allowed;
    }

    .alert {
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      font-size: 0.95rem;
    }

    .alert-success {
      background-color: #e6f4ea;
      color: #1e4620;
      border: 1px solid #c6e7c6;
    }

    .alert-error {
      background-color: #fce8e6;
      color: #c5221f;
      border: 1px solid #f6ccc8;
    }

    .spinner {
      width: 1rem;
      height: 1rem;
      border: 2px solid #ffffff;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    .invalid-feedback {
      display: none;
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .form-control.is-invalid {
      border-color: #dc3545;
    }

    .form-control.is-invalid + .invalid-feedback {
      display: block;
    }
  `;

  static properties = {
    loading: { type: Boolean },
    error: { type: String },
    success: { type: String },
    previewUrl: { type: String }
  };

  constructor() {
    super();
    this.loading = false;
    this.error = '';
    this.success = '';
    this.previewUrl = '';
  }

  render() {
    return html`
      <div class="form-container">
        ${this.error ? html`
          <div class="alert alert-error">
            ${this.error}
          </div>
        ` : ''}
        
        ${this.success ? html`
          <div class="alert alert-success">
            ${this.success}
          </div>
        ` : ''}

        <form @submit=${this._handleSubmit}>
          <div class="form-group">
            <label for="description">Deskripsi Cerita</label>
            <textarea 
              class="form-control" 
              id="description" 
              name="description"
              placeholder="Ceritakan kisah menarikmu di sini..."
              required
            ></textarea>
            <div class="helper-text">Minimal 10 karakter</div>
          </div>

          <div class="form-group">
            <label for="photo">URL Gambar</label>
            <input 
              type="url" 
              class="form-control" 
              id="photo" 
              name="photo"
              placeholder="https://example.com/image.jpg"
              @input=${this._handleImageUrlChange}
              required
            />
            <div class="helper-text">Masukkan URL gambar yang valid</div>
          </div>

          ${this.previewUrl ? html`
            <div class="preview-container">
              <img src="${this.previewUrl}" alt="Preview" class="preview-image">
            </div>
          ` : ''}

          <button 
            type="submit" 
            class="btn btn-primary"
            ?disabled=${this.loading}
          >
            ${this.loading ? html`
              <span class="spinner"></span>
            ` : html`
              <i class="bi bi-plus-circle"></i>
            `}
            ${this.loading ? 'Mengirim...' : 'Tambah Cerita'}
          </button>
        </form>
      </div>
    `;
  }

  _handleImageUrlChange(e) {
    const url = e.target.value;
    if (this._isValidUrl(url)) {
      this.previewUrl = url;
    }
  }

  _isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  async _handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const description = form.description.value.trim();
    const photoUrl = form.photo.value.trim();

    if (description.length < 10) {
      this.error = 'Deskripsi minimal 10 karakter!';
      setTimeout(() => this.error = '', 3000);
      return;
    }

    try {
      this.loading = true;
      this.error = '';
      
      const story = {
        description,
        photoUrl,
        createdAt: new Date().toISOString()
      };

      // Simulasi loading
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simpan ke localStorage
      const stories = JSON.parse(localStorage.getItem('stories') || '[]');
      stories.unshift(story);
      localStorage.setItem('stories', JSON.stringify(stories));

      this.success = 'Cerita berhasil ditambahkan!';
      form.reset();
      this.previewUrl = '';

      // Redirect setelah 2 detik
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);

    } catch (error) {
      this.error = 'Gagal menambahkan cerita. Silakan coba lagi.';
      console.error('Error:', error);
    } finally {
      this.loading = false;
    }
  }
}

customElements.define('add-story-form', AddStoryForm);