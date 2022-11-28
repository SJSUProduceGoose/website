import { useUserStore } from '@/store/user.js'

export const useApi = async (path, options={}) => {
  const config = useRuntimeConfig();
  const userStore = useUserStore();
  const headers = useRequestHeaders(['cookie'])

  const response = await useFetch(path, {
    baseURL: config.BASE_URL || config.public.BASE_URL,
    headers: {
      ...headers,
      ...(options.headers || {}),
    },
    key: path,
    ...options,
  })

  if (response.error.value) {
    // TODO: Handle errors beter here
    const error = response.error.value;
    if (error.response.status === 401) {
    userStore.setupLoginNotification({
      type: 'error',
      title: 'Error',
      message: error.data.detail,
      durration: 2000,
    });
  }
  }

  return response

}