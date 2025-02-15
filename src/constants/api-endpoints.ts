export const API_METHOD = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const apiEndpoints: {[key: string]: any} = {
  chatBot: '/chat-bot',
  socialSignin: {
    endpoint: '/v1/analytics/brand/getSocialSigninPage',
    method: API_METHOD.POST,
    params: {
      query: {platformName: ''},
    },
    payload: '',
  },
  socialNetworks: {
    endpoint: '/v1/analytics/socialNetworks',
    method: API_METHOD.GET,
  },
  linkedin: {
    addPage: true,
    getPages: {
      endpoint: '/v1/analytics/brand/getLinkedInCompanies',
      method: API_METHOD.POST,
      payload: '',
    },
    addPages: {
      endpoint: '/v1/analytics/brand/addLinkedinPage/',
      method: API_METHOD.POST,
      payload: '',
    },
  },

  social: {
    addPage: true,
    getSocialAnalyticsStatistics: {
      endpoint: '/v1/analytics/brand/getSummaryStatistics',
      method: API_METHOD.POST,
      params: {
        query: {fromDate: '', toDate: '', timezone: ''},
      },
      payload: '',
    },
  },

  facebook: {
    addPage: true,
    getPages: {
      endpoint: '/v1/analytics/brand/getFacebookPages',
      method: API_METHOD.POST,
      payload: '',
    },
    addPages: {
      endpoint: '/v1/analytics/brand/addFacebookPage/',
      method: API_METHOD.POST,
      payload: '',
    },
    getFacebookStatistics: {
      endpoint: '/v1/analytics/brand/getFacebookStatistics',
      method: API_METHOD.POST,
      params: {
        query: {fromDate: '', toDate: '', timezone: ''},
      },
      payload: '',
    },
  },
  instagram: {
    addPage: false,
  },
  twitter: {
    addPage: false,
    getTwitterStatistics: {
      endpoint: '/v1/analytics/brand/getTwitterStatistics',
      method: API_METHOD.POST,
      params: {
        query: {fromDate: '', toDate: '', timezone: ''},
      },
      payload: '',
    },
  },
  web: {
    addPage: false,
    getWebStatistics: {
      endpoint: '/v1/analytics/brand/getWebStatistics',
      method: API_METHOD.POST,
      params: {
        query: {fromDate: '', toDate: '', timezone: ''},
      },
      payload: '',
    },
  },
  gmb: {
    addPage: false,
    getGoogleStatistics: {
      endpoint: '/v1/analytics/brand/getGoogleStatistics',
      method: API_METHOD.POST,
      params: {
        query: {fromDate: '', toDate: '', timezone: ''},
      },
      payload: '',
    },
  },
  createBrand: {
    endpoint: '/v1/analytics/brand/create-brand',
    method: API_METHOD.GET,
  },
  userProfile: {
    endpoint: '/v1/userProfile',
    method: API_METHOD.GET,
  },
  updateBrandName: {
    endpoint: '/v1/analytics/brand/update-brand-name-image',
    method: API_METHOD.POST,
    params: {
      path: {brandId: ''},
      query: {name: '', image: ''},
    },
    payload: '',
  },
  getSummaryStatistics: {
    endpoint: '/v1/analytics/brand/getSummaryStatistics',
    method: API_METHOD.POST,
    params: {
      query: {fromDate: '', toDate: '', timezone: ''},
    },
    payload: '',
  },
  getLinkedinStatistics: {
    endpoint: '/v1/analytics/brand/getLinkedinStatistics',
    method: API_METHOD.POST,
    params: {
      query: {fromDate: '', toDate: '', timezone: ''},
    },
    payload: '',
  },
  getInstagramStatistics: {
    endpoint: '/v1/analytics/brand/getInstagramStatistics',
    method: API_METHOD.POST,
    params: {
      query: {fromDate: '', toDate: '', timezone: ''},
    },
    payload: '',
  },
  updatePassword: {
    endpoint: '/v1/updatePassword',
    method: API_METHOD.PUT,
    payload: {isNewUser: 'false', oldPassword: '', newPassword: ''},
  },
  deleteUser: {
    endpoint: '/v1/userProfile',
    method: API_METHOD.DELETE,
    payload: {email: ''},
  },
  paymentIntent: {
    endpoint: '/v1/payment/payment-intent',
    method: API_METHOD.POST,
    payload: {
      amount: 0.0,
      currency: '',
      paymentMethod: '',
    },
  },
  updateProfile: {
    endpoint: '/v1/updateProfile',
    method: API_METHOD.PUT,
    payload: {
      fullName: '',
      userName: '',
      phoneNumber: '',
      country: '',
      zipcode: '',
      state: '',
      ageGroup: '',
      address: '',
      city: '',
      aptSuite: '',
      businessWebsiteUrl: '',
      businessCategory: '',
      businessType: '',
      businessDescription: '',
      channelName: '',
      businessName: '',
      operationalLocation: '',
    },
  },
  // products dashboard apis
  getProductAnalyticsList: {
    endpoint: '/v1/analytics/brand/getProductAnalytics',
    method: API_METHOD.POST,
    params: {
      query: {fromDate: '', toDate: ''},
    },
  },

  getDashboardSocialStatistics: {
    endpoint: '/v1/analytics/brand/getDashboardSummaryStatistics',
    method: API_METHOD.POST,
    params: {
      query: {fromDate: '', toDate: '', timezone: ''},
    },
  },

  geFollowersStatistics: {
    endpoint: '/v1/analytics/brand/getFollowersStatistics',
    method: API_METHOD.POST,
    params: {
      query: {fromDate: '', toDate: ''},
    },
  },

  getAllPosts: {
    endpoint: '/v1/analytics/brand/getScheduledPosts',
    method: API_METHOD.POST,
    params: {
      query: {fromDate: '', toDate: '', timezone: ''},
    },
  },

  deletePost: {
    endpoint: '/v1/analytics/brand/deleteScheduledPost',
    method: API_METHOD.DELETE,
    params: {
      query: {postId: ''},
    },
  },

  getStripeCustomer: {
    endpoint: '/v1/payment/get-Customer',
    method: API_METHOD.GET,
  },

  registerStripeCustomer: {
    endpoint: '/v1/payment/register-Customer',
    method: API_METHOD.POST,
  },

  createStripeSubscription: {
    endpoint: '/v1/payment/create-Subscription',
    method: API_METHOD.POST,
    params: {
      query: {
        priceId: '',
        customerId: '',
      },
    },
  },

  getCustomerCurrentCard: {
    endpoint: '/v1/payment/get-Cards',
    method: API_METHOD.GET,
    params: {
      query: {
        customerId: '',
      },
    },
  },

  paymentHistory: {
    endpoint: '/v1/payment/get-Payment-History',
    method: API_METHOD.GET,
  },

  addPaymentHistory: {
    endpoint: '/v1/payment/add-Payment-History',
    method: API_METHOD.POST,
    params: {
      query: {
        packageName: '',
        paymentStatus: '',
        stripeSubscriptionId: '',
      },
    },
  },

  getCurrentPackage: {
    endpoint: '/v1/payment/get-Current-Package',
    method: API_METHOD.GET,
  },

  cancelSubscription: {
    endpoint: '/v1/payment/cancel-Subscription',
    method: API_METHOD.PUT,
    params: {
      query: {
        subscriptionId: '',
      },
    },
  },

  generatePost: {
    endpoint: '/v1/analytics/creator/generate-post',
    method: API_METHOD.GET,
    params: {
      query: {
        purpose: '',
        prefTone: '',
        // website: '',
        hashtags: '',
        // imageUrl:
        //   '',
        imageUrl:
          'https://lusso-marketplace-dev.s3.us-east-2.amazonaws.com/products/7bb031c443caa509b8a10d93166fb61b6345fada61ba63970fb693412e203684/banner/download.png',
        style: ""
        },
    },
    payload: '',
  },
  regeneratePost: {
    endpoint: '/v1/analytics/creator/regenerate-post',
    method: API_METHOD.GET,
    params: {
      query: {
        post: '',
        suggestions : '',
        count: "",
      },
    },
    payload: '',
  },
  regenerateImage: {
    endpoint: '/v1/analytics/creator/regenerate-image',
    method: API_METHOD.GET,
    params: {
      query: {
        purpose: '',
        prefTone: '',
        // website: 'Test.com',
        // hashtags: true,
        imageUrl:
          '',
        // imageUrl:
        //   'https://lusso-marketplace-dev.s3.us-east-2.amazonaws.com/products/7bb031c443caa509b8a10d93166fb61b6345fada61ba63970fb693412e203684/banner/download.png',
        post: '',
        // post: 'What could be the possible technology for calling in the near future and for the transportation?',
        // count: 0,
        style: ""
      },
    },
    payload: '',
  },

  getProductsList : {
    endpoint: '/v1/products',
    method: API_METHOD.GET,
    params: {
      query: {
        page: 1,
        size: 10,
        status:'active',
        category: '',
        subCategory: "",
        searchValue: "",
        sortBy: ""
      },
    },
  }
};
