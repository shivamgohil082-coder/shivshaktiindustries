# SHIV SHAKTI INDUSTRIES — CLIENT USER GUIDE

**Welcome to your new website administration dashboard!**  
This guide is designed for business owners and team members with **no technical or programming knowledge**. You do not need to know any SQL, code, or server commands. Everything is controlled through an easy, point-and-click interface.

---

## 1. How to Log In to Your Dashboard

1. Open your web browser (Chrome, Edge, Safari, Firefox).
2. Visit your private Owner Access Portal: **`https://shivshaktiindustries.org/owner-access-7x9k`** (or `http://localhost:3000/owner-access-7x9k` on local test servers).
   > *Security Note:* Public visitors who attempt to visit `/admin` will see a standard **404 Page Not Found** error. This is a built-in security shield that hides your management portal from bots and attackers.
3. Enter your administrator credentials:
   - **Username:** `admin` (or `admin@shivshaktiindustries.com`)
   - **Default Password:** `Admin@ShivShakti2026!`
4. Click **"Access Management Console"**.

> **Important Security Tip:** Upon logging in for the first time, go to **Settings** and update your password to a private password known only to you.

---

## 2. Managing Products (Add, Edit, Delete & Publish)

Your website features an interactive **16-product Precision Gallery** and product grid. You have full control over what appears on the website.

### A. How to Add a New Product
1. In the left navigation menu, click **"Products"**.
2. Click the orange button: **"+ Add New Component"**.
3. Fill out the simple product form:
   - **Component Name:** e.g., *Precision CNC Turned Threaded Bushing*
   - **Category:** Select from Turning, Milling (VMC), Flanges & Valves, Connectors, or Assemblies.
   - **Micro-Tolerance:** e.g., *±0.003mm* or *±0.005mm*
   - **Material Grade:** e.g., *Brass CW614N / SS304*
   - **Machining Process:** e.g., *Swiss CNC Turning*
   - **Component Photo:** Click **"Upload New Image"** to pick a photo from your computer (JPG, PNG, or WEBP up to 5MB).
   - **Visibility Checkbox:** Check *"Publish immediately to public website"*.
4. Click **"Save Component to Catalog"**. The new component is immediately live on your website!

### B. How to Edit an Existing Component
1. Go to **"Products"**.
2. Use the search bar to locate your product.
3. Click the **Pencil (Edit)** icon on the right side of the product row.
4. Update any field (name, tolerance, description, or image).
5. Click **"Update Component"**.

### C. How to Hide or Publish a Product Without Deleting
1. Go to **"Products"**.
2. In the **"Visibility"** column, simply click the **"Published"** or **"Draft"** button.
   - Clicking it toggles between **Published (Live)** and **Draft (Hidden)** instantly.

### D. How to Delete a Product
1. Go to **"Products"**.
2. Click the **Trash Can (Delete)** icon next to the product you wish to remove.
3. A safety pop-up window will ask: *"Are you sure you want to permanently delete this component?"*
4. Click **"Delete Component"** to confirm.

---

## 3. Managing Customer Inquiries & RFQs (Quote Requests)

When a customer submits a contact inquiry or quotation request on your website, two things happen automatically:
1. An instant email notification is delivered to your designated email (`rfq@shivshaktiindustries.org` or `info@shivshaktiindustries.org`).
2. A permanent record is stored in your **Admin Dashboard**, ensuring **zero leads are ever lost**.

### A. How to View Inquiries
1. In the left navigation menu, click **"Enquiries & RFQ"**.
2. You will see a complete list of inquiries showing:
   - Unique Reference Number (e.g. `SSI-RFQ-1042`)
   - Customer Name, Email, Phone, and Company
   - Inquired Component or Message
   - Date received and current status
3. Click the orange **"Details"** button to open the full message and download any attached CAD drawings or PDFs.

### B. Changing Lead Status
You can track where each customer inquiry is in your sales pipeline:
- **New** (Red) — Fresh inquiry received, awaiting initial review.
- **Pending** (Amber) — Engineering drawings under feasibility review.
- **Contacted** (Blue) — Quotation or email reply sent to the customer.
- **Completed** (Green) — Order confirmed or project finished.

To change status: Open the enquiry details, click the desired status button, and click **"Save Internal Notes"**.

### C. Exporting Inquiries to Excel / CSV
1. Go to **"Enquiries & RFQ"**.
2. Click the top button: **"Export All to CSV"**.
3. A clean spreadsheet file (`ssi-enquiries-YYYY-MM-DD.csv`) will immediately download to your computer. You can open it in Microsoft Excel, Google Sheets, or any accounting software.

---

## 4. Editing Website Text (Home Headlines, Story, & Contacts)

1. In the left navigation menu, click **"Website Content"**.
2. You will see editable blocks for your Home Hero tagline, Company Story, and Quality Commitment.
3. Edit the title or paragraph text.
4. Click **"Save Changes"**. The public website will display your updated text immediately.

---

## 5. Managing Google SEO Titles & Descriptions

1. In the left navigation menu, click **"SEO Meta"**.
2. You will see the Google search settings for all pages (`/`, `/products`, `/services`, `/contact`, `/quality`).
3. Each page shows a **Google Search Preview** box showing exactly how your listing will appear in Google results.
4. Adjust your Page Title (keep under 60 characters) or Meta Description (keep under 160 characters).
5. Click **"Save SEO"**.

---

## 6. How to Change or Reset Your Password

### A. If You Are Already Logged In:
1. Click **"Backup & Settings"** in the left menu.
2. Scroll to **"Change Administrator Password"**.
3. Type your Current Password.
4. Type your New Password (at least 8 characters) and confirm it.
5. Click **"Update Password"**.

### B. If You Forgot Your Password:
1. Go to your private portal: **`https://shivshaktiindustries.org/owner-access-7x9k`**.
2. Click **"Forgot password?"**.
3. Enter your administrator email address (`info@shivshaktiindustries.org`).
4. Click **"Dispatch Reset Link"**.
5. Check your email for the secure 60-minute password reset link, click it, and set your new password.

---

## 7. Downloading Backups

1. Click **"Backup & Settings"** in the left menu.
2. Under **"Database Backup & Recovery"**, click:
   - **Download JSON Backup** — for a universal data backup.
   - **Download SQL Dump** — for a standard MySQL/MariaDB database dump.
3. Store the downloaded file safely on your computer or cloud drive.
