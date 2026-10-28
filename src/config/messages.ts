
export const messages = {
  common: {
    loading: "Please wait...",
    somethingWentWrong: "Something went wrong. Please try again.",
    unauthorized: "Please log in to continue.",
    forbidden: "You do not have permission to perform this action.",
    notFound: "The requested resource was not found.",
    networkError: "Unable to connect. Please check your internet connection.",
    requestFailed: "Your request could not be completed.",
  },

  success: {
    created: "Created successfully.",
    saved: "Changes saved successfully.",
    updated: "Updated successfully.",
    deleted: "Deleted successfully.",
    copied: "Copied to clipboard.",
    login: "Logged in successfully.",
    registered: "Account created successfully.",
    logout: "Logged out successfully.",
    orderPlaced: "Your order has been placed successfully.",
    addedToCart: "Product added to cart.",
    addedToWishlist: "Product added to wishlist.",
    removedFromWishlist: "Product removed from wishlist.",
  },

  error: {
    required: "This field is required.",
    invalidEmail: "Please enter a valid email address.",
    invalidPhone: "Please enter a valid phone number.",
    passwordMismatch: "Passwords do not match.",
    invalidCredentials: "Invalid email or password.",
    emailAlreadyExists: "An account with this email already exists.",
    productNotFound: "Product not found.",
    productUnavailable: "This product is currently unavailable.",
    insufficientStock: "Requested quantity is not available.",
    cartEmpty: "Your cart is empty.",
    orderFailed: "Unable to place your order. Please try again.",
    paymentFailed: "Payment failed. Please try again.",
    uploadFailed: "File upload failed. Please try again.",
  },

  empty: {
    products: "No products found.",
    orders: "You haven't placed any orders yet.",
    cart: "Your cart is empty.",
    wishlist: "Your wishlist is empty.",
    addresses: "No saved addresses yet.",
    notifications: "You're all caught up.",
    search: "No results found. Try a different search.",
    customers: "No customers found.",
    reviews: "No reviews yet.",
    transactions: "No transactions found.",
  },

  confirmation: {
    deleteTitle: "Are you sure?",
    deleteDescription: "This action cannot be undone.",
    cancelOrderTitle: "Cancel this order?",
    cancelOrderDescription:
      "Please confirm that you want to cancel this order.",
    logoutTitle: "Log out of your account?",
  },
} as const;
