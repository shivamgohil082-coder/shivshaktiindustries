import mysql, { Pool } from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { parseJsonc } from './jsonc';
import crypto from 'crypto';

// Types
export interface DbProduct {
  id: number;
  name: string;
  slug: string;
  category: string;
  process?: string;
  industry?: string;
  material?: string;
  tolerance?: string;
  finish?: string;
  dimensions?: string;
  weight?: string;
  moq: number;
  description?: string;
  specs?: string;
  applications?: string;
  image: string;
  is_published: number | boolean;
  featured: number | boolean;
  created_at?: string;
  updated_at?: string;
}

export interface DbEnquiry {
  id: number;
  reference_no: string;
  type: 'RFQ' | 'General' | 'Career' | 'Vendor';
  full_name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  attachment_path?: string;
  attachment_name?: string;
  status: 'New' | 'Pending' | 'Contacted' | 'Completed';
  admin_notes?: string;
  ip_address?: string;
  created_at: string;
  updated_at: string;
}

export interface DbCustomer {
  id: number;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  billing_address: string;
  shipping_address: string;
  gst_number: string;
  created_at: string;
  updated_at: string;
}

export type SaleStatus = 'Paid' | 'Pending' | 'Overdue' | 'Cancelled';

export interface DbSale {
  id: number;
  reference_no: string;
  customer_name: string;
  amount: number;
  status: SaleStatus;
  sold_at: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface DbContentBlock {
  id: number;
  section_key: string;
  title?: string;
  subtitle?: string;
  content?: string;
  updated_at: string;
}

export interface DbSeoMeta {
  id: number;
  page_path: string;
  meta_title: string;
  meta_description: string;
  keywords?: string;
  canonical_url?: string;
  updated_at: string;
}

export interface DbAdminUser {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  role: string;
  reset_token?: string | null;
  reset_token_expiry?: string | null;
  last_login?: string | null;
  created_at?: string;
}

// ----------------------------------------------------------------------------
// Local Persistent Storage Directory (Fallback & Seed Provider)
// ----------------------------------------------------------------------------
const STORE_DIR = path.join(process.cwd(), 'data', 'store');
const PRODUCTS_STORE = path.join(STORE_DIR, 'products.json');
const ENQUIRIES_STORE = path.join(STORE_DIR, 'enquiries.json');
const CUSTOMERS_STORE = path.join(STORE_DIR, 'customers.json');
const SALES_STORE = path.join(STORE_DIR, 'sales.json');
const CONTENT_STORE = path.join(STORE_DIR, 'content.json');
const SEO_STORE = path.join(STORE_DIR, 'seo.json');
const USERS_STORE = path.join(STORE_DIR, 'users.json');

function ensureStoreDir() {
  if (!fs.existsSync(STORE_DIR)) {
    fs.mkdirSync(STORE_DIR, { recursive: true });
  }
}

function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    ensureStoreDir();
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2), 'utf8');
      return fallback;
    }
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJsonFile<T>(filePath: string, data: T) {
  ensureStoreDir();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// Initial seed helper from products.jsonc
export function getInitialProducts(): DbProduct[] {
  try {
    const jsoncPath = path.join(process.cwd(), 'data', 'products.jsonc');
    if (fs.existsSync(jsoncPath)) {
      const raw = fs.readFileSync(jsoncPath, 'utf8');
      const items = parseJsonc<Array<Record<string, unknown>>>(raw);
      if (Array.isArray(items) && items.length > 0) {
        return items.map((item, idx) => ({
          id: idx + 1,
          name: String(item.name || `Component ${idx + 1}`),
          slug: String(item.name || `component-${idx + 1}`)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, ''),
          category: String(item.category || (item.name?.toString().includes('Turned') ? 'Turning' : 'Milling')),
          process: String(item.process || 'Precision CNC Machining'),
          industry: String(item.industry || 'Industrial Engineering'),
          material: String(item.materials || item.material || 'Brass CW614N / SS304'),
          tolerance: String(item.tolerance || '±0.005mm'),
          finish: String(item.finish || 'Precision Machined / Passivated'),
          dimensions: String(item.dimensions || 'Custom per Drawing'),
          weight: String(item.weight || '0.5 kg'),
          moq: Number(item.moq) || 50,
          description: String(item.description || item.specs || ''),
          specs: String(item.specs || ''),
          applications: String(item.applications || ''),
          image: String(item.image || '/images/products/cnc-turned-bushings-fittings.jpg'),
          is_published: 1,
          featured: idx < 6 ? 1 : 0,
        }));
      }
    }
  } catch (err) {
    console.error('Failed reading initial products seed:', err);
  }
  return [];
}

// Default Content Blocks
function getInitialContentBlocks(): DbContentBlock[] {
  return [
    {
      id: 1,
      section_key: 'home_hero',
      title: 'Precision Engineering Solutions.',
      subtitle: 'Premium Industrial Manufacturing',
      content: 'We manufacture precision components according to customer drawings, technical specifications, and samples with micron-level tolerances.',
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      section_key: 'company_info',
      title: 'Shiv Shakti Industries',
      subtitle: 'Leading Manufacturer of Precision Engineering Parts',
      content: 'C1-677, Makarpura GIDC, Vadodara, 390010, Gujarat, India. Phone: +91 92136 62579. Email: info@shivshaktiindustries.org',
      updated_at: new Date().toISOString(),
    },
    {
      id: 3,
      section_key: 'quality_promise',
      title: 'Committed to Excellence in CNC & VMC Machining',
      subtitle: 'Zero Defects Quality Management',
      content: 'Every batch of raw materials is verified for chemical composition and 100% final visual and dimensional inspection is conducted before dispatch.',
      updated_at: new Date().toISOString(),
    },
  ];
}

// Default SEO Meta
function getInitialSeoMeta(): DbSeoMeta[] {
  return [
    {
      id: 1,
      page_path: '/',
      meta_title: 'Precision CNC Machining & VMC Manufacturing | Shiv Shakti Industries',
      meta_description: 'Shiv Shakti Industries is a premier manufacturer of high-precision CNC turned parts, VMC machined components, and custom engineering assemblies in Makarpura GIDC, Vadodara.',
      keywords: 'CNC Machining Vadodara, VMC Machining Gujarat, Precision Turned Components, Shiv Shakti Industries',
      canonical_url: 'https://shivshaktiindustries.org',
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      page_path: '/products',
      meta_title: 'Precision CNC Products & Components | Shiv Shakti Industries',
      meta_description: 'Explore our range of precision turned pins, VMC brass hydraulic manifolds, splined transmission assemblies, stainless steel flanges with ±0.003mm tolerances.',
      keywords: 'CNC products, turned bushings, hydraulic manifolds, transmission assemblies, Gujarat manufacturing',
      canonical_url: 'https://shivshaktiindustries.org/products',
      updated_at: new Date().toISOString(),
    },
    {
      id: 3,
      page_path: '/services',
      meta_title: 'Precision Machining Services | CNC, VMC & Fabrication',
      meta_description: 'Comprehensive precision manufacturing services: 4-Axis CNC Turning, VMC Milling, Conventional Machining, Sheet Metal Fabrication, Surface Finishing & Metrology in Vadodara.',
      keywords: 'CNC turning services, VMC milling services, sheet metal fabrication Vadodara, custom machining',
      canonical_url: 'https://shivshaktiindustries.org/services',
      updated_at: new Date().toISOString(),
    },
    {
      id: 4,
      page_path: '/contact',
      meta_title: 'Contact Us & Request a Quote (RFQ) | Shiv Shakti Industries',
      meta_description: 'Get in touch with Shiv Shakti Industries for precision CNC & VMC machining quotes, technical consulting, drawing reviews, and engineering inquiries in Vadodara, Gujarat.',
      keywords: 'RFQ CNC machining, quote precision parts, contact Shiv Shakti Industries, Makarpura GIDC',
      canonical_url: 'https://shivshaktiindustries.org/contact',
      updated_at: new Date().toISOString(),
    },
  ];
}

// Uses PBKDF2 with a unique random salt.
function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, combinedHash: string): boolean {
  try {
    const [salt, originalHash] = combinedHash.split(':');
    if (!salt || !originalHash) return false;

    // Check direct password input
    const computedHash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    if (crypto.timingSafeEqual(Buffer.from(computedHash, 'utf8'), Buffer.from(originalHash, 'utf8'))) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

function getInitialAdminUsers(): DbAdminUser[] {
  const initialPassword = process.env.ADMIN_INITIAL_PASSWORD;
  if (!initialPassword || initialPassword.length < 12) return [];

  return [
    {
      id: 1,
      username: 'admin',
      email: 'info@shivshaktiindustries.org',
      password_hash: hashPassword(initialPassword),
      role: 'superadmin',
      reset_token: null,
      reset_token_expiry: null,
      last_login: null,
      created_at: new Date().toISOString(),
    },
  ];
}

function getLocalAdminUsers(): DbAdminUser[] {
  const users = readJsonFile<DbAdminUser[]>(USERS_STORE, []);
  if (users.length > 0) return users;

  const initialUsers = getInitialAdminUsers();
  if (initialUsers.length > 0) {
    writeJsonFile(USERS_STORE, initialUsers);
    return initialUsers;
  }
  return users;
}

// ----------------------------------------------------------------------------
// MySQL Connection Pool (Optional / Config-Driven)
// ----------------------------------------------------------------------------
let pool: Pool | null = null;
let isMySqlAvailable = false;
let hasCheckedMySql = false;

export function hasMySqlConfig(): boolean {
  return Boolean(
    process.env.DB_HOST &&
    process.env.DB_USER &&
    process.env.DB_NAME
  );
}

export async function getMySqlPool(): Promise<Pool | null> {
  if (pool) return pool;
  if (!hasMySqlConfig()) return null;

  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 5000,
    });

    // Test connectivity
    const conn = await pool.getConnection();
    conn.release();
    isMySqlAvailable = true;
    hasCheckedMySql = true;
    return pool;
  } catch (err) {
    if (!hasCheckedMySql) {
      console.warn('MySQL connection unavailable, operating in local persistence mode:', (err as Error).message);
      hasCheckedMySql = true;
    }
    pool = null;
    isMySqlAvailable = false;
    return null;
  }
}

// ----------------------------------------------------------------------------
// Database Operations (Universal Engine with MySQL + Fallback)
// ----------------------------------------------------------------------------

export async function getAllProducts(publishedOnly = false): Promise<DbProduct[]> {
  const mysqlPool = await getMySqlPool();
  if (mysqlPool) {
    try {
      const sql = publishedOnly
        ? 'SELECT * FROM products WHERE is_published = 1 ORDER BY id ASC'
        : 'SELECT * FROM products ORDER BY id DESC';
      const [rows] = await mysqlPool.query(sql);
      return rows as DbProduct[];
    } catch (e) {
      console.error('MySQL getAllProducts query failed, falling back:', e);
    }
  }

  // Fallback to local store
  const initial = getInitialProducts();
  const products = readJsonFile<DbProduct[]>(PRODUCTS_STORE, initial);
  if (publishedOnly) {
    return products.filter((p) => p.is_published === 1 || p.is_published === true);
  }
  return products;
}

export async function getProductById(id: number): Promise<DbProduct | null> {
  const mysqlPool = await getMySqlPool();
  if (mysqlPool) {
    try {
      const [rows] = await mysqlPool.query('SELECT * FROM products WHERE id = ? LIMIT 1', [id]);
      const list = rows as DbProduct[];
      return list[0] || null;
    } catch (e) {
      console.error('MySQL getProductById query failed:', e);
    }
  }

  const products = await getAllProducts(false);
  return products.find((p) => p.id === id) || null;
}

export async function saveProduct(productData: Partial<DbProduct>): Promise<DbProduct> {
  const mysqlPool = await getMySqlPool();
  const now = new Date().toISOString();

  if (mysqlPool) {
    try {
      if (productData.id) {
        // Update existing
        await mysqlPool.query(
          `UPDATE products SET 
            name = ?, slug = ?, category = ?, process = ?, industry = ?, 
            material = ?, tolerance = ?, finish = ?, dimensions = ?, weight = ?, 
            moq = ?, description = ?, specs = ?, applications = ?, image = ?, 
            is_published = ?, featured = ?, updated_at = NOW()
           WHERE id = ?`,
          [
            productData.name,
            productData.slug,
            productData.category,
            productData.process || '',
            productData.industry || '',
            productData.material || '',
            productData.tolerance || '',
            productData.finish || '',
            productData.dimensions || '',
            productData.weight || '',
            productData.moq || 10,
            productData.description || '',
            productData.specs || '',
            productData.applications || '',
            productData.image,
            productData.is_published ? 1 : 0,
            productData.featured ? 1 : 0,
            productData.id,
          ]
        );
        return (await getProductById(productData.id))!;
      } else {
        // Insert new
        const [result] = await mysqlPool.query(
          `INSERT INTO products 
            (name, slug, category, process, industry, material, tolerance, finish, dimensions, weight, moq, description, specs, applications, image, is_published, featured)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            productData.name,
            productData.slug,
            productData.category,
            productData.process || '',
            productData.industry || '',
            productData.material || '',
            productData.tolerance || '',
            productData.finish || '',
            productData.dimensions || '',
            productData.weight || '',
            productData.moq || 10,
            productData.description || '',
            productData.specs || '',
            productData.applications || '',
            productData.image,
            productData.is_published ? 1 : 0,
            productData.featured ? 1 : 0,
          ]
        );
        const insertId = (result as { insertId: number }).insertId;
        return (await getProductById(insertId))!;
      }
    } catch (e) {
      console.error('MySQL saveProduct failed, writing to fallback store:', e);
    }
  }

  // Local fallback
  const products = await getAllProducts(false);
  if (productData.id) {
    const idx = products.findIndex((p) => p.id === productData.id);
    if (idx !== -1) {
      products[idx] = {
        ...products[idx],
        ...productData,
        updated_at: now,
      } as DbProduct;
      writeJsonFile(PRODUCTS_STORE, products);
      return products[idx];
    }
  }

  const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  const newProduct: DbProduct = {
    id: newId,
    name: productData.name || 'New Component',
    slug: productData.slug || `component-${newId}`,
    category: productData.category || 'Turning',
    process: productData.process || 'Precision CNC Machining',
    industry: productData.industry || 'Industrial',
    material: productData.material || 'Brass / SS304',
    tolerance: productData.tolerance || '±0.005mm',
    finish: productData.finish || 'Machined',
    dimensions: productData.dimensions || '',
    weight: productData.weight || '',
    moq: productData.moq || 10,
    description: productData.description || '',
    specs: productData.specs || '',
    applications: productData.applications || '',
    image: productData.image || '/images/products/cnc-turned-bushings-fittings.jpg',
    is_published: productData.is_published !== undefined ? productData.is_published : 1,
    featured: productData.featured !== undefined ? productData.featured : 0,
    created_at: now,
    updated_at: now,
  };

  products.unshift(newProduct);
  writeJsonFile(PRODUCTS_STORE, products);
  return newProduct;
}

export async function deleteProduct(id: number): Promise<boolean> {
  const mysqlPool = await getMySqlPool();
  if (mysqlPool) {
    try {
      await mysqlPool.query('DELETE FROM products WHERE id = ?', [id]);
      return true;
    } catch (e) {
      console.error('MySQL deleteProduct failed:', e);
    }
  }

  const products = await getAllProducts(false);
  const filtered = products.filter((p) => p.id !== id);
  writeJsonFile(PRODUCTS_STORE, filtered);
  return true;
}

// ----------------------------------------------------------------------------
// Customer Database Operations
// Requires migrations/001_create_customers.sql when MySQL is enabled.
// ----------------------------------------------------------------------------

export async function getAllCustomers(search = ''): Promise<DbCustomer[]> {
  const mysqlPool = await getMySqlPool();
  if (mysqlPool) {
    try {
      if (search.trim()) {
        const term = `%${search.trim()}%`;
        const [rows] = await mysqlPool.query(
          `SELECT * FROM customers
           WHERE company_name LIKE ? OR contact_name LIKE ? OR email LIKE ? OR phone LIKE ?
           ORDER BY updated_at DESC, id DESC`,
          [term, term, term, term]
        );
        return rows as DbCustomer[];
      }

      const [rows] = await mysqlPool.query(
        'SELECT * FROM customers ORDER BY updated_at DESC, id DESC'
      );
      return rows as DbCustomer[];
    } catch (error) {
      console.error('MySQL getAllCustomers failed:', error);
      throw new Error('Unable to load customers from MySQL.', { cause: error });
    }
  }

  const customers = readJsonFile<DbCustomer[]>(CUSTOMERS_STORE, []);
  const term = search.trim().toLowerCase();
  if (!term) return customers;
  return customers.filter((customer) =>
    [customer.company_name, customer.contact_name, customer.email, customer.phone]
      .some((value) => value.toLowerCase().includes(term))
  );
}

export async function getCustomerById(id: number): Promise<DbCustomer | null> {
  const mysqlPool = await getMySqlPool();
  if (mysqlPool) {
    try {
      const [rows] = await mysqlPool.query(
        'SELECT * FROM customers WHERE id = ? LIMIT 1',
        [id]
      );
      return (rows as DbCustomer[])[0] || null;
    } catch (error) {
      console.error('MySQL getCustomerById failed:', error);
      throw new Error('Unable to load customer from MySQL.', { cause: error });
    }
  }

  const customers = await getAllCustomers();
  return customers.find((customer) => customer.id === id) || null;
}

export async function getCustomerEnquiryHistory(email: string): Promise<DbEnquiry[]> {
  const enquiries = await getAllEnquiries();
  const normalizedEmail = email.trim().toLowerCase();
  return enquiries.filter((enquiry) => enquiry.email.trim().toLowerCase() === normalizedEmail);
}

export type CustomerInput = Omit<DbCustomer, 'id' | 'created_at' | 'updated_at'>;

export async function createCustomer(data: CustomerInput): Promise<DbCustomer> {
  const mysqlPool = await getMySqlPool();
  if (mysqlPool) {
    try {
      const [result] = await mysqlPool.query(
        `INSERT INTO customers
          (company_name, contact_name, email, phone, billing_address, shipping_address, gst_number)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          data.company_name,
          data.contact_name,
          data.email,
          data.phone,
          data.billing_address,
          data.shipping_address,
          data.gst_number,
        ]
      );
      const insertId = (result as { insertId: number }).insertId;
      const customer = await getCustomerById(insertId);
      if (!customer) throw new Error('Created customer could not be retrieved.');
      return customer;
    } catch (error) {
      console.error('MySQL createCustomer failed:', error);
      throw new Error('Unable to create customer in MySQL.', { cause: error });
    }
  }

  const customers = await getAllCustomers();
  if (customers.some((customer) => customer.email.toLowerCase() === data.email.toLowerCase())) {
    throw new Error('A customer with this email address already exists.');
  }

  const now = new Date().toISOString();
  const customer: DbCustomer = {
    id: customers.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1,
    ...data,
    created_at: now,
    updated_at: now,
  };
  customers.unshift(customer);
  writeJsonFile(CUSTOMERS_STORE, customers);
  return customer;
}

export async function updateCustomer(id: number, data: CustomerInput): Promise<DbCustomer | null> {
  const mysqlPool = await getMySqlPool();
  if (mysqlPool) {
    try {
      await mysqlPool.query(
        `UPDATE customers SET
          company_name = ?, contact_name = ?, email = ?, phone = ?,
          billing_address = ?, shipping_address = ?, gst_number = ?, updated_at = NOW()
         WHERE id = ?`,
        [
          data.company_name,
          data.contact_name,
          data.email,
          data.phone,
          data.billing_address,
          data.shipping_address,
          data.gst_number,
          id,
        ]
      );
      return getCustomerById(id);
    } catch (error) {
      console.error('MySQL updateCustomer failed:', error);
      throw new Error('Unable to update customer in MySQL.', { cause: error });
    }
  }

  const customers = await getAllCustomers();
  const index = customers.findIndex((customer) => customer.id === id);
  if (index < 0) return null;
  if (customers.some((customer) =>
    customer.id !== id && customer.email.toLowerCase() === data.email.toLowerCase()
  )) {
    throw new Error('A customer with this email address already exists.');
  }

  customers[index] = {
    ...customers[index],
    ...data,
    updated_at: new Date().toISOString(),
  };
  writeJsonFile(CUSTOMERS_STORE, customers);
  return customers[index];
}

export async function deleteCustomer(id: number): Promise<boolean> {
  const mysqlPool = await getMySqlPool();
  if (mysqlPool) {
    try {
      const [result] = await mysqlPool.query('DELETE FROM customers WHERE id = ?', [id]);
      return (result as { affectedRows: number }).affectedRows > 0;
    } catch (error) {
      console.error('MySQL deleteCustomer failed:', error);
      throw new Error('Unable to delete customer from MySQL.', { cause: error });
    }
  }

  const customers = await getAllCustomers();
  const filtered = customers.filter((customer) => customer.id !== id);
  if (filtered.length === customers.length) return false;
  writeJsonFile(CUSTOMERS_STORE, filtered);
  return true;
}

export type SaleInput = Omit<DbSale, 'id' | 'created_at' | 'updated_at'>;

function normalizeSale(sale: DbSale): DbSale {
  return {
    ...sale,
    amount: Number(sale.amount),
    sold_at: String(sale.sold_at).slice(0, 10),
  };
}

export async function getAllSales(): Promise<DbSale[]> {
  const mysqlPool = await getMySqlPool();
  if (mysqlPool) {
    try {
      const [rows] = await mysqlPool.query(
        `SELECT id, reference_no, customer_name, amount, status,
                DATE_FORMAT(sold_at, '%Y-%m-%d') AS sold_at, notes, created_at, updated_at
         FROM sales ORDER BY sold_at DESC, id DESC`
      );
      return (rows as DbSale[]).map(normalizeSale);
    } catch (error) {
      console.error('MySQL getAllSales failed:', error);
      throw new Error('Unable to load sales from MySQL.', { cause: error });
    }
  }

  return readJsonFile<DbSale[]>(SALES_STORE, []).map(normalizeSale);
}

export async function createSale(data: SaleInput): Promise<DbSale> {
  const mysqlPool = await getMySqlPool();
  if (mysqlPool) {
    try {
      const [result] = await mysqlPool.query(
        `INSERT INTO sales (reference_no, customer_name, amount, status, sold_at, notes)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [data.reference_no, data.customer_name, data.amount, data.status, data.sold_at, data.notes]
      );
      const insertId = (result as { insertId: number }).insertId;
      const [rows] = await mysqlPool.query(
        `SELECT id, reference_no, customer_name, amount, status,
                DATE_FORMAT(sold_at, '%Y-%m-%d') AS sold_at, notes, created_at, updated_at
         FROM sales WHERE id = ? LIMIT 1`,
        [insertId]
      );
      const sale = (rows as DbSale[])[0];
      if (!sale) throw new Error('Created sale could not be retrieved.');
      return normalizeSale(sale);
    } catch (error) {
      console.error('MySQL createSale failed:', error);
      throw new Error('Unable to create sale in MySQL.', { cause: error });
    }
  }

  const sales = await getAllSales();
  if (sales.some((sale) => sale.reference_no.toLowerCase() === data.reference_no.toLowerCase())) {
    throw new Error('A sale with this reference number already exists.');
  }
  const now = new Date().toISOString();
  const sale: DbSale = {
    id: sales.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1,
    ...data,
    created_at: now,
    updated_at: now,
  };
  sales.unshift(sale);
  writeJsonFile(SALES_STORE, sales);
  return sale;
}

export async function updateSaleStatus(id: number, status: SaleStatus): Promise<DbSale | null> {
  const mysqlPool = await getMySqlPool();
  if (mysqlPool) {
    try {
      await mysqlPool.query(
        'UPDATE sales SET status = ?, updated_at = NOW() WHERE id = ?',
        [status, id]
      );
      const [rows] = await mysqlPool.query(
        `SELECT id, reference_no, customer_name, amount, status,
                DATE_FORMAT(sold_at, '%Y-%m-%d') AS sold_at, notes, created_at, updated_at
         FROM sales WHERE id = ? LIMIT 1`,
        [id]
      );
      const sale = (rows as DbSale[])[0];
      return sale ? normalizeSale(sale) : null;
    } catch (error) {
      console.error('MySQL updateSaleStatus failed:', error);
      throw new Error('Unable to update sale in MySQL.', { cause: error });
    }
  }

  const sales = await getAllSales();
  const index = sales.findIndex((sale) => sale.id === id);
  if (index < 0) return null;
  sales[index] = { ...sales[index], status, updated_at: new Date().toISOString() };
  writeJsonFile(SALES_STORE, sales);
  return sales[index];
}

export async function deleteSale(id: number): Promise<boolean> {
  const mysqlPool = await getMySqlPool();
  if (mysqlPool) {
    try {
      const [result] = await mysqlPool.query('DELETE FROM sales WHERE id = ?', [id]);
      return (result as { affectedRows: number }).affectedRows > 0;
    } catch (error) {
      console.error('MySQL deleteSale failed:', error);
      throw new Error('Unable to delete sale from MySQL.', { cause: error });
    }
  }

  const sales = await getAllSales();
  const filtered = sales.filter((sale) => sale.id !== id);
  if (filtered.length === sales.length) return false;
  writeJsonFile(SALES_STORE, filtered);
  return true;
}

export async function getSalesSummary() {
  const sales = await getAllSales();
  const activeSales = sales.filter((sale) => sale.status !== 'Cancelled');
  const paidSales = sales.filter((sale) => sale.status === 'Paid');
  const outstandingSales = sales.filter((sale) =>
    sale.status === 'Pending' || sale.status === 'Overdue'
  );
  const month = new Date().toISOString().slice(0, 7);
  const sum = (items: DbSale[]) =>
    items.reduce((total, sale) => total + Math.round(sale.amount * 100), 0) / 100;

  return {
    totalSales: activeSales.length,
    totalRevenue: sum(paidSales),
    pendingPayments: sum(outstandingSales),
    monthlyRevenue: sum(paidSales.filter((sale) => sale.sold_at.startsWith(month))),
    sales,
  };
}

// ----------------------------------------------------------------------------
// Enquiries Database Operations
// ----------------------------------------------------------------------------

export async function getAllEnquiries(statusFilter?: string): Promise<DbEnquiry[]> {
  const mysqlPool = await getMySqlPool();
  if (mysqlPool) {
    try {
      let sql = 'SELECT * FROM enquiries';
      const params: unknown[] = [];
      if (statusFilter && statusFilter !== 'All') {
        sql += ' WHERE status = ?';
        params.push(statusFilter);
      }
      sql += ' ORDER BY id DESC';
      const [rows] = await mysqlPool.query(sql, params);
      return rows as DbEnquiry[];
    } catch (e) {
      console.error('MySQL getAllEnquiries failed:', e);
    }
  }

  const enquiries = readJsonFile<DbEnquiry[]>(ENQUIRIES_STORE, []);
  if (statusFilter && statusFilter !== 'All') {
    return enquiries.filter((e) => e.status === statusFilter);
  }
  return enquiries;
}

export async function getEnquiryById(id: number): Promise<DbEnquiry | null> {
  const mysqlPool = await getMySqlPool();
  if (mysqlPool) {
    try {
      const [rows] = await mysqlPool.query('SELECT * FROM enquiries WHERE id = ? LIMIT 1', [id]);
      const list = rows as DbEnquiry[];
      return list[0] || null;
    } catch (e) {
      console.error('MySQL getEnquiryById failed:', e);
    }
  }

  const list = await getAllEnquiries();
  return list.find((e) => e.id === id) || null;
}

export async function createEnquiry(data: {
  type: 'RFQ' | 'General' | 'Career' | 'Vendor';
  full_name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  attachment_path?: string;
  attachment_name?: string;
  ip_address?: string;
}): Promise<DbEnquiry> {
  const now = new Date().toISOString();
  const rand = Math.floor(1000 + Math.random() * 9000);
  const refNo = `SSI-${data.type.toUpperCase()}-${Date.now().toString().slice(-4)}${rand}`;

  const mysqlPool = await getMySqlPool();
  if (mysqlPool) {
    try {
      const [result] = await mysqlPool.query(
        `INSERT INTO enquiries 
          (reference_no, type, full_name, email, phone, company, subject, message, attachment_path, attachment_name, status, ip_address, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'New', ?, NOW(), NOW())`,
        [
          refNo,
          data.type,
          data.full_name,
          data.email,
          data.phone || null,
          data.company || null,
          data.subject,
          data.message,
          data.attachment_path || null,
          data.attachment_name || null,
          data.ip_address || null,
        ]
      );
      const insertId = (result as { insertId: number }).insertId;
      return (await getEnquiryById(insertId))!;
    } catch (e) {
      console.error('MySQL createEnquiry failed:', e);
    }
  }

  // Fallback
  const list = await getAllEnquiries();
  const newId = list.length > 0 ? Math.max(...list.map((e) => e.id)) + 1 : 1;
  const newEnquiry: DbEnquiry = {
    id: newId,
    reference_no: refNo,
    type: data.type,
    full_name: data.full_name,
    email: data.email,
    phone: data.phone,
    company: data.company,
    subject: data.subject,
    message: data.message,
    attachment_path: data.attachment_path,
    attachment_name: data.attachment_name,
    status: 'New',
    admin_notes: '',
    ip_address: data.ip_address,
    created_at: now,
    updated_at: now,
  };

  list.unshift(newEnquiry);
  writeJsonFile(ENQUIRIES_STORE, list);
  return newEnquiry;
}

export async function updateEnquiryStatus(
  id: number,
  status: 'New' | 'Pending' | 'Contacted' | 'Completed',
  adminNotes?: string
): Promise<DbEnquiry | null> {
  const mysqlPool = await getMySqlPool();
  if (mysqlPool) {
    try {
      if (adminNotes !== undefined) {
        await mysqlPool.query(
          'UPDATE enquiries SET status = ?, admin_notes = ?, updated_at = NOW() WHERE id = ?',
          [status, adminNotes, id]
        );
      } else {
        await mysqlPool.query(
          'UPDATE enquiries SET status = ?, updated_at = NOW() WHERE id = ?',
          [status, id]
        );
      }
      return await getEnquiryById(id);
    } catch (e) {
      console.error('MySQL updateEnquiryStatus failed:', e);
    }
  }

  const list = await getAllEnquiries();
  const idx = list.findIndex((e) => e.id === id);
  if (idx !== -1) {
    list[idx].status = status;
    if (adminNotes !== undefined) {
      list[idx].admin_notes = adminNotes;
    }
    list[idx].updated_at = new Date().toISOString();
    writeJsonFile(ENQUIRIES_STORE, list);
    return list[idx];
  }
  return null;
}

export async function deleteEnquiry(id: number): Promise<boolean> {
  const mysqlPool = await getMySqlPool();
  if (mysqlPool) {
    try {
      await mysqlPool.query('DELETE FROM enquiries WHERE id = ?', [id]);
      return true;
    } catch (e) {
      console.error('MySQL deleteEnquiry failed:', e);
    }
  }

  const list = await getAllEnquiries();
  const filtered = list.filter((e) => e.id !== id);
  writeJsonFile(ENQUIRIES_STORE, filtered);
  return true;
}

// ----------------------------------------------------------------------------
// Content Blocks Database Operations
// ----------------------------------------------------------------------------

export async function getContentBlocks(): Promise<DbContentBlock[]> {
  const mysqlPool = await getMySqlPool();
  if (mysqlPool) {
    try {
      const [rows] = await mysqlPool.query('SELECT * FROM content_blocks ORDER BY id ASC');
      return rows as DbContentBlock[];
    } catch (e) {
      console.error('MySQL getContentBlocks failed:', e);
    }
  }

  const initial = getInitialContentBlocks();
  return readJsonFile<DbContentBlock[]>(CONTENT_STORE, initial);
}

export async function saveContentBlock(data: {
  section_key: string;
  title?: string;
  subtitle?: string;
  content?: string;
}): Promise<DbContentBlock> {
  const now = new Date().toISOString();
  const mysqlPool = await getMySqlPool();
  if (mysqlPool) {
    try {
      await mysqlPool.query(
        `INSERT INTO content_blocks (section_key, title, subtitle, content, updated_at)
         VALUES (?, ?, ?, ?, NOW())
         ON DUPLICATE KEY UPDATE title = VALUES(title), subtitle = VALUES(subtitle), content = VALUES(content), updated_at = NOW()`,
        [data.section_key, data.title || '', data.subtitle || '', data.content || '']
      );
      const [rows] = await mysqlPool.query('SELECT * FROM content_blocks WHERE section_key = ? LIMIT 1', [data.section_key]);
      return (rows as DbContentBlock[])[0];
    } catch (e) {
      console.error('MySQL saveContentBlock failed:', e);
    }
  }

  const list = await getContentBlocks();
  const idx = list.findIndex((c) => c.section_key === data.section_key);
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...data, updated_at: now };
    writeJsonFile(CONTENT_STORE, list);
    return list[idx];
  }

  const newId = list.length > 0 ? Math.max(...list.map((c) => c.id)) + 1 : 1;
  const newBlock: DbContentBlock = {
    id: newId,
    section_key: data.section_key,
    title: data.title,
    subtitle: data.subtitle,
    content: data.content,
    updated_at: now,
  };
  list.push(newBlock);
  writeJsonFile(CONTENT_STORE, list);
  return newBlock;
}

// ----------------------------------------------------------------------------
// SEO Meta Database Operations
// ----------------------------------------------------------------------------

export async function getSeoMetaList(): Promise<DbSeoMeta[]> {
  const mysqlPool = await getMySqlPool();
  if (mysqlPool) {
    try {
      const [rows] = await mysqlPool.query('SELECT * FROM seo_meta ORDER BY id ASC');
      return rows as DbSeoMeta[];
    } catch (e) {
      console.error('MySQL getSeoMetaList failed:', e);
    }
  }

  const initial = getInitialSeoMeta();
  return readJsonFile<DbSeoMeta[]>(SEO_STORE, initial);
}

export async function saveSeoMeta(data: {
  page_path: string;
  meta_title: string;
  meta_description: string;
  keywords?: string;
  canonical_url?: string;
}): Promise<DbSeoMeta> {
  const now = new Date().toISOString();
  const mysqlPool = await getMySqlPool();
  if (mysqlPool) {
    try {
      await mysqlPool.query(
        `INSERT INTO seo_meta (page_path, meta_title, meta_description, keywords, canonical_url, updated_at)
         VALUES (?, ?, ?, ?, ?, NOW())
         ON DUPLICATE KEY UPDATE meta_title = VALUES(meta_title), meta_description = VALUES(meta_description), keywords = VALUES(keywords), canonical_url = VALUES(canonical_url), updated_at = NOW()`,
        [data.page_path, data.meta_title, data.meta_description, data.keywords || '', data.canonical_url || '']
      );
      const [rows] = await mysqlPool.query('SELECT * FROM seo_meta WHERE page_path = ? LIMIT 1', [data.page_path]);
      return (rows as DbSeoMeta[])[0];
    } catch (e) {
      console.error('MySQL saveSeoMeta failed:', e);
    }
  }

  const list = await getSeoMetaList();
  const idx = list.findIndex((s) => s.page_path === data.page_path);
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...data, updated_at: now };
    writeJsonFile(SEO_STORE, list);
    return list[idx];
  }

  const newId = list.length > 0 ? Math.max(...list.map((s) => s.id)) + 1 : 1;
  const newMeta: DbSeoMeta = {
    id: newId,
    page_path: data.page_path,
    meta_title: data.meta_title,
    meta_description: data.meta_description,
    keywords: data.keywords,
    canonical_url: data.canonical_url,
    updated_at: now,
  };
  list.push(newMeta);
  writeJsonFile(SEO_STORE, list);
  return newMeta;
}

// ----------------------------------------------------------------------------
// Admin User & Authentication Database Operations
// ----------------------------------------------------------------------------

export async function getAdminUserByUsername(username: string): Promise<DbAdminUser | null> {
  const cleanInput = (username || '').trim().toLowerCase();
  if (!cleanInput) return null;

  const mysqlPool = await getMySqlPool();
  if (mysqlPool) {
    try {
      const [rows] = await mysqlPool.query(
        'SELECT * FROM admin_users WHERE LOWER(username) = ? OR LOWER(email) = ? LIMIT 1',
        [cleanInput, cleanInput]
      );
      const list = rows as DbAdminUser[];
      if (list[0]) return list[0];
    } catch (e) {
      console.error('MySQL getAdminUserByUsername failed:', e);
    }
  }

  const users = getLocalAdminUsers();
  return (
    users.find((u) => {
      const uName = (u.username || '').toLowerCase().trim();
      const uEmail = (u.email || '').toLowerCase().trim();
      return (
        uName === cleanInput ||
        uEmail === cleanInput ||
        (cleanInput === 'admin' && (uName === 'admin' || uEmail.includes('shivshakti'))) ||
        (cleanInput.startsWith('admin@') && uName === 'admin') ||
        (cleanInput.includes('shivshakti') && uName === 'admin')
      );
    }) || null
  );
}

export async function getAdminUserByResetToken(token: string): Promise<DbAdminUser | null> {
  const mysqlPool = await getMySqlPool();
  if (mysqlPool) {
    try {
      const [rows] = await mysqlPool.query(
        'SELECT * FROM admin_users WHERE reset_token = ? AND reset_token_expiry > NOW() LIMIT 1',
        [token]
      );
      const list = rows as DbAdminUser[];
      return list[0] || null;
    } catch (e) {
      console.error('MySQL getAdminUserByResetToken failed:', e);
    }
  }

  const users = getLocalAdminUsers();
  const now = new Date().toISOString();
  return (
    users.find(
      (u) =>
        u.reset_token === token &&
        u.reset_token_expiry &&
        u.reset_token_expiry > now
    ) || null
  );
}

export async function updateAdminPassword(userId: number, newPasswordPlain: string): Promise<boolean> {
  const newHash = hashPassword(newPasswordPlain);
  const mysqlPool = await getMySqlPool();
  if (mysqlPool) {
    try {
      await mysqlPool.query(
        'UPDATE admin_users SET password_hash = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?',
        [newHash, userId]
      );
      return true;
    } catch (e) {
      console.error('MySQL updateAdminPassword failed:', e);
    }
  }

  const users = getLocalAdminUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx !== -1) {
    users[idx].password_hash = newHash;
    users[idx].reset_token = null;
    users[idx].reset_token_expiry = null;
    writeJsonFile(USERS_STORE, users);
    return true;
  }
  return false;
}

export async function setPasswordResetToken(email: string, token: string, expiryDate: Date): Promise<boolean> {
  const mysqlPool = await getMySqlPool();
  if (mysqlPool) {
    try {
      await mysqlPool.query(
        'UPDATE admin_users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?',
        [token, expiryDate, email]
      );
      return true;
    } catch (e) {
      console.error('MySQL setPasswordResetToken failed:', e);
    }
  }

  const users = getLocalAdminUsers();
  const idx = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
  if (idx !== -1) {
    users[idx].reset_token = token;
    users[idx].reset_token_expiry = expiryDate.toISOString();
    writeJsonFile(USERS_STORE, users);
    return true;
  }
  return false;
}

// ----------------------------------------------------------------------------
// Dashboard Analytics & Aggregation
// ----------------------------------------------------------------------------

export async function getDashboardStats() {
  const products = await getAllProducts(false);
  const enquiries = await getAllEnquiries();
  const customers = await getAllCustomers();

  const publishedProducts = products.filter((p) => p.is_published === 1 || p.is_published === true).length;
  const draftProducts = products.length - publishedProducts;

  const newEnquiries = enquiries.filter((e) => e.status === 'New').length;
  const pendingEnquiries = enquiries.filter((e) => e.status === 'Pending').length;
  const completedEnquiries = enquiries.filter((e) => e.status === 'Completed').length;
  const rfqCount = enquiries.filter((e) => e.type === 'RFQ').length;
  const generalEnquiryCount = enquiries.filter((e) => e.type === 'General').length;

  return {
    totalProducts: products.length,
    totalCustomers: customers.length,
    publishedProducts,
    draftProducts,
    totalEnquiries: enquiries.length,
    newEnquiries,
    pendingEnquiries,
    completedEnquiries,
    rfqCount,
    generalEnquiryCount,
    isMySqlActive: Boolean(pool && isMySqlAvailable),
    recentEnquiries: enquiries.slice(0, 5),
  };
}
