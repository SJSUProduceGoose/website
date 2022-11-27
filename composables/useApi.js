import { useUserStore } from '@/store/user.js'

export const useApi = async (path, options={}) => {
  const config = useRuntimeConfig();
  const userStore = useUserStore();
  const headers = useRequestHeaders(['cookie'])

  try {
    return await useFetch(path, {
      baseURL: config.public.BASE_URL,
      headers: {
        ...headers,
        ...(options.headers || {}),
      },
      key: path,
      ...options,
    })
  } catch (error) {
    console.error(error);
    if (error.response.status === 401) {
      userStore.setupLoginNotification({
        type: 'error',
        title: 'Error',
        message: error.data.detail,
        durration: 2000,
      });
      navigateTo('/login')
    }
    throw error
  }
  
}