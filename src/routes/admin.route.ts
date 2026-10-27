const prefix="/admin"
export const adminRoutes = [
  {
    title: "overview",
    url: "admin-dashboard",
    items: [
      {
        title: "orders",
        url: `${prefix}/orders`,
      },
    ],
  },
  {
    title: "site setting",
    url: "#",
    items: [
      {
        title: "Routing",
        url: `${prefix}/orders`,
      },
      {
        title: "Data Fetching",
        url: `${prefix}/orders`,
      },
      {
        title: "Configuring",
        url: "#",
      },
      {
        title: "Testing",
        url: "#",
      },
    ],
  },
  {
    title: "User Menuals",
    url: "#",
    items: [
      {
        title: "Components",
        url: `${prefix}/orders`,
      },

      {
        title: "CLI",
        url: `${prefix}/orders`,
      },
      {
        title: "Edge Runtime",
        url: "#",
      },
    ],
  },
  {
    title: "...",
    url: "#",
    items: [
      {
        title: "privacy policy",
        url: "#",
      },
      {
        title: "refund",
        url: "#",
      },
    ],
  },
];
