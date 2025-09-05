# School Management System

A modern, responsive web application built with Next.js for managing school data. Features include adding new schools and viewing all registered schools in an intuitive interface.

## 🚀 Features

- **Add Schools**: Comprehensive form with validation for adding new schools
- **View Schools**: Grid and list views for browsing all registered schools
- **Image Upload**: Upload and display school images
- **Search & Filter**: Search schools by name, city, or address with city filtering
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Built with Tailwind CSS and DaisyUI components
- **Smooth Animations**: Enhanced user experience with Framer Motion animations
- **Form Validation**: Client-side validation using React Hook Form

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + DaisyUI
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Database**: MySQL
- **Image Handling**: Sharp for image optimization

## 📋 Prerequisites

- Node.js 18+ 
- MySQL database (online service recommended)

## 🏗 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sanketb-14/school-hub
   cd school-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env.local`
   - Update the database configuration:
   ```env
   DB_HOST=your_mysql_host
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=school_management
   ```

4. **Database Setup**
   The application will automatically create the required `schools` table on first run.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🗄 Database Schema

The application uses a single `schools` table with the following structure:

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact BIGINT NOT NULL,
  image TEXT,
  email_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```



## 📱 Pages Overview

### 1. Home Page (`/`)
- Welcome page with feature overview
- Quick navigation to main functions
- Statistics and call-to-action sections

### 2. Add School (`/addSchool`)
- Comprehensive form with validation
- Image upload functionality
- Real-time form validation feedback
- Responsive design for all devices

### 3. Show Schools (`/showSchools`)
- Grid and list view modes
- Search functionality
- City-based filtering
- Responsive card layouts
- Image display with fallbacks

## 🎨 UI Components

- **Navbar**: Responsive navigation with mobile menu
- **Forms**: Validated forms with error handling
- **Cards**: Modern card designs for school display
- **Modals**: Success/error feedback
- **Loading States**: Smooth loading animations
- **Empty States**: Helpful messages when no data

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify
3. Configure environment variables

### Other Hosting Platforms
The app can be deployed to any platform that supports Node.js applications.

## 🔧 Configuration

### Environment Variables
- `DB_HOST`: MySQL host URL
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name
- `DB_PORT`: Database port (default: 3306)

### Image Upload
- **Supported formats**: JPG, PNG, WebP
- **Maximum size**: 5MB
- **Storage location**: `public/schoolImages/`

## 🧪 Development

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

### File Structure
```
├── app/
│   ├── api/
│   │   ├── schools/route.js          # Schools CRUD API
│   │   └── images/[filename]/route.js # Image serving API
│   ├── components/
│   │   └── Navbar.jsx                # Navigation component
│   ├── addSchool/
│   │   └── page.jsx                  # Add school form page
│   ├── showSchools/
│   │   └── page.jsx                  # Display schools page
│   ├── globals.css                   # Global styles
│   ├── layout.js                     # Root layout
│   └── page.jsx                      # Home page
├── lib/
│   └── db.js                         # Database configuration
├── public/
│   └── schoolImages/                 # Uploaded school images
├── .env.example                      # Environment variables template
├── tailwind.config.js                # Tailwind configuration
├── next.config.js                    # Next.js configuration
└── package.json                      # Project dependencies
```

## 🔒 Security Features

- **Input Validation**: Server-side validation for all form inputs
- **File Upload Security**: Type and size validation for images
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Input sanitization
- **Directory Traversal Protection**: Filename validation

## 📊 Performance Optimizations

- **Image Optimization**: Next.js automatic image optimization
- **Lazy Loading**: Images load on demand
- **Caching**: Static assets cached for 1 year
- **Code Splitting**: Automatic code splitting by Next.js
- **Responsive Images**: Multiple sizes for different devices

## 🎯 Form Validation Rules

### School Name
- Required field
- Text input

### Address
- Required field
- Textarea input
- Complete address expected

### City & State
- Required fields
- Text inputs

### Contact Number
- Required field
- Must be 10-15 digits
- Numbers only

### Email Address
- Required field
- Must be valid email format
- Unique constraint (database level)

### School Image
- Optional field
- Accepted formats: JPG, PNG, WebP
- Maximum size: 5MB
- Automatic filename sanitization

## 🔍 Search & Filter Features

### Search Functionality
- Search by school name
- Search by city
- Search by address
- Real-time search results
- Case-insensitive matching

### Filter Options
- Filter by city
- Dropdown with all available cities
- Combine with search for refined results

### View Modes
- **Grid View**: Card-based layout (default)
- **List View**: Compact list layout
- Responsive on all devices

## 🎨 Design System

### Color Scheme
- Primary colors defined by DaisyUI theme
- Gradient backgrounds for visual appeal
- Proper contrast ratios for accessibility

### Typography
- Inter font family
- Responsive text sizes
- Clear hierarchy with proper heading levels

### Components
- Consistent button styles
- Form input standardization
- Card component variations
- Loading states and animations

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚨 Error Handling

- **Client-side**: Form validation with real-time feedback
- **Server-side**: Comprehensive error responses
- **Database**: Connection error handling
- **File Upload**: Size and type validation
- **User Feedback**: Toast notifications for success/error states

## 🔄 API Endpoints

### GET `/api/schools`
- Fetches all schools
- Returns JSON array of school objects
- Ordered by creation date (newest first)

### POST `/api/schools`
- Creates new school record
- Accepts multipart/form-data
- Handles image upload
- Returns success/error response

### GET `/api/schools/images/[filename]`
- Serves school images
- Handles caching headers
- Validates filename security
- Returns image with proper MIME type

## 🧪 Testing

### Manual Testing Checklist
- [ ] Form validation (all fields)
- [ ] Image upload (various formats/sizes)
- [ ] Search functionality
- [ ] Filter functionality
- [ ] Responsive design (mobile/tablet/desktop)
- [ ] Error handling scenarios
- [ ] Database connectivity

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request



## 📞 Support

For support or questions:
- Create an issue on GitHub
- Check the documentation
- Review the code comments

## 🎉 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- DaisyUI for beautiful UI components
- Framer Motion for smooth animations
- React Hook Form for form management
- Lucide React for consistent icons

---

**Happy Coding! 🚀**