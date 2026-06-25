# Stock Insights - Component Architecture & Structure

## 🏗️ Component Hierarchy

```
App.jsx (Main Container)
├── AnimatedStockTicker (Canvas-based background)
│
├── Left Panel (Branding)
│   ├── Logo Container (logo.svg)
│   ├── Branding Title (H1 + Accent)
│   ├── Tagline (P)
│   ├── Feature Pills (3 items)
│   └── Trust Badge
│
└── Right Panel (Form)
    ├── Form Header
    ├── Status Message (conditional)
    ├── Form Row (2 columns)
    │   ├── First Name Input
    │   └── Last Name Input
    ├── Email Input
    ├── Password Input (wrapper)
    │   ├── Input field
    │   ├── Toggle button
    │   └── PasswordStrengthIndicator
    ├── Market Select
    ├── StockTagInput
    │   ├── Tag Display
    │   ├── Input + Suggestions
    │   └── Counter
    ├── Submit Button
    ├── Sign In Link
    └── Security Note
```

---

## 📦 New Components

### **1. AnimatedStockTicker.jsx**
**Purpose**: Renders animated background canvas with wave patterns

**Props**: None (self-contained)

**Features**:
- Canvas rendering with requestAnimationFrame
- Dual sine waves (blue + green)
- Responsive to window size
- 40% opacity for watermark effect

**State**:
- Canvas ref
- Animation loop ID
- Offset tracking

---

### **2. PasswordStrengthIndicator.jsx**
**Purpose**: Real-time password strength feedback

**Props**:
```javascript
{
  password: string  // Current password value
}
```

**Features**:
- 5-level strength evaluation
- Dynamic color bars
- Text feedback ("Weak" → "Very Strong")
- Null rendering when no password

**Algorithm**:
```
0 points: No password
+1: Length ≥ 8 chars
+1: Length ≥ 12 chars
+1: Has uppercase + lowercase
+1: Has numbers
+1: Has special characters
```

---

### **3. StockTagInput.jsx**
**Purpose**: Intelligent stock selection with autocomplete

**Props**:
```javascript
{
  stocks: string[],           // Selected stocks
  onChange: (stocks) => void  // Callback on change
}
```

**Features**:
- Max 3 stocks
- Autocomplete suggestions
- Remove button per tag
- Keyboard support (Backspace to remove)
- Debounced suggestion filtering

**Suggested Stocks**:
```javascript
["RELIANCE", "INFY", "TCS", "WIPRO", "AAPL", "TSLA", "GOOGL", "MSFT", "AMZN", "META", "BTC", "ETH"]
```

---

## 🎯 State Management (App.jsx)

```javascript
formData: {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  market: string,
  stocks: string[]
}

showPassword: boolean
message: string
loading: boolean
errors: {
  [fieldName]: string  // Error message per field
}
```

---

## 🔄 Form Validation Logic

**On Submit**:
1. Check firstName (required, non-empty)
2. Check lastName (required, non-empty)
3. Check email (required, valid format)
4. Check password (required, min 8 chars)
5. Show field errors if any
6. Return early if validation fails

**On Change**:
- Clear error for that field
- Update formData state

---

## 🎨 CSS Architecture

### **Root Variables** (`App.css`)
```css
--primary-dark: #0a0f1e
--primary-blue: #0d1b3e
--secondary-blue: #3b82f6
--accent-green: #22c55e
--accent-green-light: #84cc16
--error-red: #ef4444
--shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.2)
```

### **Key Classes**
- `.registration-container` - Main flex container (split layout)
- `.branding-panel` - Left side (55% width)
- `.form-panel` - Right side (45% width)
- `.registration-form` - Card wrapper
- `.form-group` - Field + label container
- `.form-row` - 2-column grid for names
- `.password-input-wrapper` - Password + toggle
- `.stock-input-container` - Stock tags system
- `.submit-button` - CTA with shimmer effect
- `.status-message` - Success/error alerts

### **Animations** (keyframes)
- `logoFloat` - Up/down floating motion
- `slideInDown` - Top entrance
- `slideInUp` - Bottom entrance
- `fadeIn` - Opacity transition
- `popIn` - Scale pop animation
- `spin` - Loading spinner

### **Responsive Breakpoints**
```css
1200px:   Column flex-direction (stack panels)
768px:    Form padding reduction
480px:    Touch-friendly sizing
```

---

## 📡 API Integration

### **registerUser(userData)**
**Location**: `api/userApi.js`

**Payload**:
```javascript
{
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  market: string | null,
  stocks: string[]
}
```

**Endpoint**: `POST /api/users/register`

**Base URL**: Configured via `VITE_API_BASE` env or defaults to `http://localhost:5001/api`

---

## 🔐 Form Behavior

### **Error Handling**
- Per-field validation errors displayed below input
- Red border + light red background
- Error clears on field focus/change

### **Loading State**
- Button shows spinner
- Button disabled
- Text changes to "Creating Account..."

### **Success Flow**
1. Show "✓ Registration successful! Redirecting..."
2. Reset form after 2 seconds
3. Clear message

### **Error Flow**
- Show error message (from backend or generic)
- Button becomes enabled again
- User can retry

---

## 🚀 Performance Optimizations

1. **Canvas Animation**: RequestAnimationFrame (60fps)
2. **Debounced Search**: Stock suggestions (useEffect dependency)
3. **CSS Animations**: GPU-accelerated (transform, opacity)
4. **Event Delegation**: Button clicks handled at form level
5. **Conditional Rendering**: Components only render when needed

---

## ♿ Accessibility Features

- Form labels linked to inputs (htmlFor)
- ARIA labels on buttons (aria-label)
- Semantic HTML (form, input, button, select)
- Focus management (focus ring styling)
- Error text associated with fields
- Color contrast ratios meet WCAG AA

---

## 📝 File Size Reference

| File | Lines | Size |
|------|-------|------|
| App.jsx | ~420 | ~14 KB |
| App.css | ~720 | ~32 KB |
| PasswordStrengthIndicator.jsx | ~45 | ~1.5 KB |
| StockTagInput.jsx | ~95 | ~3.2 KB |
| AnimatedStockTicker.jsx | ~70 | ~2.1 KB |
| **Total** | **~1350** | **~53 KB** |

---

## 🎯 Quick Development Guide

### To add a new field:
1. Add to `formData` state in App.jsx
2. Add to `validateForm()` function
3. Create `form-group` div in JSX
4. Add CSS classes for styling
5. Update API payload

### To customize colors:
1. Edit `:root` variables in App.css
2. All components automatically update

### To change animations:
1. Modify `@keyframes` in App.css
2. Adjust `animation` property on elements

### To change logo:
1. Replace `/public/logo.svg`
2. No code changes needed

---

## ✅ Testing Checklist

- [ ] Form validation works
- [ ] Password strength updates in real-time
- [ ] Stock suggestions appear on typing
- [ ] Max 3 stocks enforced
- [ ] Error messages display correctly
- [ ] Success message shows on submit
- [ ] Mobile layout stacks properly
- [ ] Animations are smooth
- [ ] API integration works
- [ ] Loading state shows spinner

---

**Architecture Ready for Production** ✨
