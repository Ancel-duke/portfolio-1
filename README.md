# Ancel Ajanga Portfolio

A modern, responsive portfolio website built with React and Tailwind CSS, showcasing Ancel Ajanga's full-stack development skills and projects.

## 🚀 Features

- **Modern Design**: Clean, professional design with dark/light mode toggle
- **Responsive**: Fully responsive across all devices
- **Accessible**: WCAG compliant with proper ARIA attributes and keyboard navigation
- **SEO Optimized**: Meta tags, Open Graph, Twitter Cards, and JSON-LD schema
- **Performance**: Code splitting, lazy loading, and optimized assets
- **Contact Form**: Functional contact form with server stub
- **Project Showcase**: Detailed project cards with modal views

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router DOM
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Icons**: React Icons (Feather Icons)
- **SEO**: React Helmet Async
- **Build Tool**: Create React App
- **Deployment**: Netlify/Vercel ready

## 📋 Prerequisites

- Node.js 16+ 
- npm or yarn

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd ancel-ajanga-portfolio
npm install
```

### 2. Start Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
ancel-ajanga-portfolio/
├── public/
│   ├── assets/
│   │   ├── projects/          # Project images
│   │   └── resume.pdf         # Resume file
│   ├── index.html
│   └── robots.txt
├── src/
│   ├── components/            # Reusable components
│   ├── pages/                # Page components
│   ├── hooks/                # Custom hooks
│   ├── styles/               # CSS files
│   ├── App.jsx
│   └── index.js
├── server/                   # Express server stub
├── tailwind.config.js
├── package.json
└── README.md
```

## 🎨 Customization

### Colors
The project uses a custom color palette defined in `tailwind.config.js`:
- **Primary**: `#0ea5a4` (Teal)
- **Accent**: `#7c3aed` (Violet)

### Content Updates
1. **Personal Information**: Update content in components
2. **Projects**: Add new projects in `src/pages/Projects.jsx`
3. **Skills**: Modify skills array in `src/components/About.jsx`
4. **Contact**: Update contact information in `src/pages/Contact.jsx`

### Images
- Replace placeholder images in `public/assets/projects/`
- Add your resume PDF to `public/assets/resume.pdf`
- Update project screenshots as needed

## 🌐 Deployment

### Netlify Deployment

1. **Connect Repository**:
   - Push code to GitHub
   - Connect repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `build`

2. **Environment Variables** (Optional):
   ```
   REACT_APP_CONTACT_ENDPOINT=https://your-backend.com/api/contact
   ```

3. **Custom Domain** (Optional):
   - Add custom domain in Netlify settings
   - Update `public/index.html` meta tags

### Vercel Deployment

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Environment Variables** (Optional):
   - Add in Vercel dashboard
   - Update contact form endpoint

### Contact Form Backend

The project includes a server stub in `server/` directory. For production:

#### Option 1: Netlify Functions
Create `netlify/functions/contact.js`:
```javascript
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  
  const { name, email, message } = JSON.parse(event.body);
  
  // Add your email service logic here
  // Example: SendGrid, AWS SES, etc.
  
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};
```

#### Option 2: Vercel Serverless
Create `api/contact.js`:
```javascript
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  const { name, email, message } = req.body;
  
  // Add your email service logic here
  
  res.status(200).json({ success: true });
}
```

## 🔧 Development Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm run test       # Run tests
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
npm run analyze    # Analyze bundle size
```

## 📊 Performance Checklist

### Lighthouse Targets
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 90+

### Optimization Tips
1. **Images**: Use WebP format, optimize sizes
2. **Fonts**: Use `font-display: swap`
3. **Code Splitting**: Already implemented with React.lazy
4. **Bundle Size**: Monitor with `npm run analyze`

## ♿ Accessibility

### Implemented Features
- ✅ Semantic HTML structure
- ✅ ARIA labels and roles
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Color contrast compliance
- ✅ Screen reader support
- ✅ Reduced motion support

### Testing
```bash
# Install axe-core for testing
npm install --save-dev axe-core

# Run accessibility tests
npx axe http://localhost:3000
```

## 🔍 SEO Optimization

### Meta Tags
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ JSON-LD schema
- ✅ Proper title and description

### Additional SEO
- ✅ `robots.txt` configured
- ✅ Sitemap ready (generate with build)
- ✅ Structured data for Person schema

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Components
- ✅ Responsive navigation
- ✅ Mobile-first design
- ✅ Touch-friendly interactions

## 🎯 Production Checklist

### Before Deployment
- [ ] Replace placeholder images
- [ ] Add actual resume PDF
- [ ] Update project links and descriptions
- [ ] Test contact form functionality
- [ ] Run Lighthouse audit
- [ ] Test on multiple devices
- [ ] Validate HTML/CSS
- [ ] Check accessibility with axe-core

### Post-Deployment
- [ ] Verify all links work
- [ ] Test contact form
- [ ] Check mobile responsiveness
- [ ] Validate meta tags
- [ ] Test dark/light mode
- [ ] Monitor performance

## 📈 Analytics (Optional)

### Recommended Services
- **Plausible**: Privacy-focused analytics
- **Fathom**: Simple, privacy-friendly
- **Google Analytics**: Traditional option

### Implementation
Add to `public/index.html`:
```html
<!-- Plausible Analytics -->
<script defer data-domain="your-domain.com" src="https://plausible.io/js/script.js"></script>
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 👤 Author

**Ancel Ajanga**
- Email: ancel.ajanga@yahoo.com
- GitHub: [@Ancel-duke](https://github.com/Ancel-duke)
- Portfolio: [ancel-ajanga-portfolio.netlify.app](https://ancel-ajanga-portfolio.netlify.app)

---

**Built with ❤️ using React & Tailwind CSS**
