import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../sass/main.scss';
import './components/StoryCard.js';
import './components/AddStoryForm.js';
import './components/Navbar.js';
import './components/Profile.js';
import './components/StoryList.js';
import './components/FeaturedStory.js'; // Tambahkan ini
import stories from '../data/stories.json';

const app = document.getElementById('app');

// Tambahkan FeaturedStory
const featuredStory = document.createElement('featured-story');
featuredStory.stories = stories.listStory; // Kirim data ke FeaturedStory
app.appendChild(featuredStory);

// Tambahkan StoryList
const storyList = document.createElement('story-list');
storyList.stories = stories.listStory; // Kirim data ke StoryList
app.appendChild(storyList);

console.log('Data stories:', stories.listStory); // Debugging untuk cek apakah data masuk
