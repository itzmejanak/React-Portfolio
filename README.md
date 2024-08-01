# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

commands
- `git subtree push --prefix dist origin gh-pages`
- `git push origin --delete gh-pages`
- `git add dist -f`


Process:
To deploy your React Vite portfolio using React Router on GitHub Pages, you need to ensure that your project is set up to handle routing correctly. Here’s how you can update your project based on your GitHub repository:

### 1. Update `vite.config.js`
Set the base URL for GitHub Pages.

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/React-Portfolio/', // Replace with your GitHub repository name
});
```

### 2. Create `404.html`
Create a `404.html` file in your root directory to redirect to `index.html`.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; url=./index.html">
  </head>
  <body>
  </body>
</html>
```

### 3. Update `App.js` to use `HashRouter`
Modify your `App.js` to use `HashRouter` instead of `BrowserRouter`.

```jsx
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';

import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import About from './Components/About';
import Skill from './Components/Skill';
import Services from './Components/Services';
import Projects from './Components/Projects';
import Testimonials from './Components/Testimonials';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import PDF from './Components/PDF';
import ThemeSwitcher from './Commons/ThemeSwitcher';
import Apps from './Components/Apps';

const MainPage = () => (
  <>
    <Hero />
    <About />
    <Skill />
    <Services />
    <Projects />
    <Testimonials />
    <Contact />
  </>
);

function App() {
  useEffect(() => {
    Aos.init({
      duration: 500,
      easing: "ease-in-sine"
    });
  }, []);

  return (
    <Router>
      <ThemeSwitcher />
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/e-book" element={<PDF />} />
        <Route path="/apps" element={<Apps />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
```

### 4. Add `homepage` to `package.json`
Ensure your `package.json` includes the `homepage` field.

```json
{
  "name": "react-portfolio",
  "version": "0.1.0",
  "private": true,
  "homepage": "https://itzmejanak.github.io/React-Portfolio/",
  ...
}
```

### 5. Deploy to GitHub Pages
Commit your changes and push to your GitHub repository. Use the following commands to deploy:

```sh
npm run build
git add dist -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
```

### 6. GitHub Actions Workflow (Optional)
Set up a GitHub Action to automate deployment. Create a `.github/workflows/deploy.yml` file:

```yaml
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'

      - name: Install dependencies
        run: npm install

      - name: Build the project
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

By following these steps, you should be able to deploy your React Vite portfolio to GitHub Pages successfully. If you encounter any issues, please let me know!