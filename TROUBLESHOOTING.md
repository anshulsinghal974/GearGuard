# Troubleshooting Guide

## Server is Running but No Output Shows

The dev server is running on **http://localhost:5173**

### Steps to Fix:

1. **Open the correct URL in your browser:**
   - Open your browser (Chrome, Firefox, Edge, etc.)
   - Navigate to: `http://localhost:5173`
   - Or try: `http://127.0.0.1:5173`

2. **Check Browser Console for Errors:**
   - Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac) to open Developer Tools
   - Go to the "Console" tab
   - Look for any red error messages
   - Share any errors you see

3. **If you see a blank white screen:**
   - Check the browser console (step 2)
   - Try hard refresh: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)
   - Clear browser cache and reload

4. **If server is not running:**
   ```bash
   # Stop any running processes (Ctrl+C in terminal)
   # Then start fresh:
   npm run dev
   ```

5. **Check if the terminal shows the server URL:**
   - Look for a message like: `Local: http://localhost:5173/`
   - Click on that URL if it's clickable in your terminal

6. **Common Issues:**

   **Issue: "Cannot find module" errors**
   - Solution: Run `npm install` again
   
   **Issue: Port 5173 already in use**
   - Solution: Kill the process using port 5173, or change port in vite.config.ts
   
   **Issue: Blank screen with no errors**
   - Solution: Check if JavaScript is enabled in your browser
   - Try a different browser
   - Check if you have any browser extensions blocking the page

### Quick Test:

1. The server should be accessible at: `http://localhost:5173`
2. You should see the GearGuard navigation bar with:
   - Dashboard
   - Equipment
   - Requests
   - Teams
   - Calendar
   - Reports

### Still Not Working?

Please share:
1. What you see in the browser (screenshot if possible)
2. Any error messages from the browser console (F12 → Console tab)
3. Any error messages from the terminal where `npm run dev` is running

