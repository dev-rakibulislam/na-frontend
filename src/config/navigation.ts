const dashboardPrefix = "/dashboard";
const prefix = "/admin";

export const storeNavigation = [
  { title: "Home", url: "/" },
  { title: "Products", url: "/products" },
  { title: "Categories", url: "/categories" },
  { title: "My Wishlist", url: `${dashboardPrefix}/wishlist` },
];

export const customerRoute = [
  // Dashboard Overview
  {
    title: "Dashboard",
    url: dashboardPrefix,
    items: [{ title: "Overview", url: dashboardPrefix }],
  },

  // Shopping & Orders
  {
    title: "Shopping",
    url: "#",
    items: [
      { title: "My Orders", url: `${dashboardPrefix}/orders` },
      { title: "My Wishlist", url: `${dashboardPrefix}/wishlist` },
      { title: "Returns & Refunds", url: `${dashboardPrefix}/returns` },
      { title: "Reviews & Ratings", url: `${dashboardPrefix}/reviews` },
      { title: "Coupons", url: `${dashboardPrefix}/coupons` },
      { title: "Loyalty Points", url: `${dashboardPrefix}/loyalty` },
    ],
  },

  // Personal Account Settings
  {
    title: "Account",
    url: "#",
    items: [
      { title: "My Profile", url: `${dashboardPrefix}/profile` },
      { title: "Address Book", url: `${dashboardPrefix}/addresses` },
      { title: "Payments", url: `${dashboardPrefix}/payments` },
      { title: "Security", url: `${dashboardPrefix}/security` },
    ],
  },

  // Notifications
  {
    title: "Notifications",
    url: "#",
    items: [{ title: "My Notifications", url: `${dashboardPrefix}/notifications` }],
  },

  // Customer Support
  {
    title: "Support",
    url: "#",
    items: [{ title: "Help & Support", url: `${dashboardPrefix}/support` }],
  },

  // Account Actions
  {
    title: "Account Actions",
    url: "#",
    items: [
      {
        title: "Logout",
        url: "#",
        // IMPORTANT: Handle logout separately in the sidebar component.
        // Clear authentication state and redirect to login.
      },
    ],
  },
] ;

export const adminRoute = [
  // Dashboard Overview
  {
    title: "Dashboard",
    url: prefix,
    items: [
      {
        title: "Overview",
        url: prefix,
      },
    ],
  },

  // Product Management
  {
    title: "Catalog",
    url: "#",
    items: [
      { title: "Products", url: `${prefix}/products` },
      { title: "Categories", url: `${prefix}/categories` },
      { title: "Brands", url: `${prefix}/brands` },
      { title: "Product Variants", url: `${prefix}/variants` },
      { title: "Product Reviews", url: `${prefix}/reviews` },
    ],
  },

  // Inventory Management
  {
    title: "Inventory",
    url: "#",
    items: [
      { title: "Stock Management", url: `${prefix}/inventory` },
      { title: "Stock History", url: `${prefix}/inventory/history` },
    ],
  },

  // Order Management
  {
    title: "Sales",
    url: "#",
    items: [
      { title: "Orders", url: `${prefix}/orders` },
      { title: "Shipping", url: `${prefix}/shipping` },
      { title: "Returns & Refunds", url: `${prefix}/returns` },
      { title: "Abandoned Carts", url: `${prefix}/abandoned-carts` },
    ],
  },

  // Customer Management
  {
    title: "Customers",
    url: "#",
    items: [
      { title: "All Customers", url: `${prefix}/customers` },
      { title: "Customer Groups", url: `${prefix}/customer-groups` },
    ],
  },

  // Payments & Finance
  {
    title: "Finance",
    url: "#",
    items: [
      { title: "Payments", url: `${prefix}/payments` },
      { title: "Refund History", url: `${prefix}/refunds` },
      { title: "Transactions", url: `${prefix}/transactions` },
    ],
  },

  // Promotions & Marketing
  {
    title: "Marketing",
    url: "#",
    items: [
      { title: "Coupons & Discounts", url: `${prefix}/coupons` },
      { title: "Banners & Sliders", url: `${prefix}/banners` },
      { title: "Announcements", url: `${prefix}/announcements` },
      { title: "Newsletter", url: `${prefix}/newsletter` },
    ],
  },

  // Homepage & Storefront Content
  {
    title: "Storefront",
    url: "#",
    items: [
      { title: "Homepage Builder", url: `${prefix}/homepage` },
      { title: "Pages", url: `${prefix}/pages` },
      { title: "Navigation Menus", url: `${prefix}/menus` },
    ],
  },

  // Reports & Analytics
  {
    title: "Analytics",
    url: "#",
    items: [
      { title: "Sales Reports", url: `${prefix}/reports/sales` },
      { title: "Product Reports", url: `${prefix}/reports/products` },
      { title: "Customer Reports", url: `${prefix}/reports/customers` },
    ],
  },

  // Store Configuration
  {
    title: "Settings",
    url: "#",
    items: [
      { title: "General Settings", url: `${prefix}/settings/general` },
      { title: "Branding & Theme", url: `${prefix}/settings/branding` },
      { title: "Shipping Settings", url: `${prefix}/settings/shipping` },
      { title: "Payment Settings", url: `${prefix}/settings/payments` },
      { title: "Tax Settings", url: `${prefix}/settings/tax` },
      { title: "SEO Settings", url: `${prefix}/settings/seo` },
      {
        title: "Notifications Settings",
        url: `${prefix}/settings/notifications`,
      },
    ],
  },

  // Admin Users & Permissions
  {
    title: "Administration",
    url: "#",
    items: [
      { title: "Admin Users", url: `${prefix}/admins` },
      { title: "Roles & Permissions", url: `${prefix}/roles` },
      { title: "Activity Logs", url: `${prefix}/activity-logs` },
    ],
  },

  // System & Maintenance
  {
    title: "System",
    url: "#",
    items: [
      { title: "Audit Logs", url: `${prefix}/audit-logs` },
      { title: "System Health", url: `${prefix}/system-health` },
    ],
  },
];
