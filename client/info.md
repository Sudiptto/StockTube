## **PURPOSE**
---
### **React.ts frontend**

## **HOW TO RUN**
---

### **Prerequisites**
- Make sure you have **pnpm** installed globally:
  ```bash
  npm install -g pnpm
  ```

### **Setup and Installation**
1. **Navigate to the correct directory** (this is important!):
   ```bash
   cd StockTube/client/stock-video-generator
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Set up environment variables** (Optional - for AI suggestions):
   ```bash
   # Copy the example environment file
   cp .env.example .env.local
   
   # Edit .env.local and add your Google Gemini API key
   # Get your API key from: https://makersuite.google.com/app/apikey
   ```

### **Running the Development Server**
4. **Start the development server** (make sure you're still in `StockTube/client/stock-video-generator`):
   ```bash
   pnpm dev
   ```

5. **Open your browser** and go to:
   ```
   http://localhost:3000
   ```

### **Important Notes**
- ⚠️ **You MUST be in the `StockTube/client/stock-video-generator` directory** for the commands to work
- The project uses **pnpm**, not npm - make sure to use `pnpm` commands
- If you get any errors, make sure you're in the right directory and have run `pnpm install` first
- **Smart Suggestions work without API key** - Google Gemini API is optional for enhanced suggestions

### **Optional: Google Gemini API Setup**
The app includes smart suggestions that work without any API. However, if you want to use Google Gemini for enhanced AI suggestions:

1. **Get API Key**: Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Copy environment file**: `cp .env.example .env.local`
3. **Add your API key** to `.env.local`:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here
   ```
4. **Restart the development server** for changes to take effect


### **Other Available Commands**
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run linting