
export default {
    Base: '/api',
    Users: {
      Base: '/users',
      Get: '/?',
      count: '/count',
      Add: '/:id',
      getById : '/:id',
    },

    Addresses: {
      Base: '/addresses',
      add:'/',
      update: '/:userId',
      getById : '/:userId',
    },
    Posts: {
      Base: '/posts',
      add:'/',
      delete: '/:id',
      Get : '/?',
    },
  } as const;