export const errorToast = (err) => {
  let errMsg = 'OOPS! ';
  let errTitle = 'Some thing went Wrong';
  if (err.response) {
    if (err.response.status === 400) {
      errTitle = 'OOPS! an error ocurred ';
      errMsg = 'You entered inValid data.';
    } else if (err.response.status === 401 || err.status === 403) {
      errTitle = 'Access Denied';
      errMsg = 'Invalid credentials ';
    } else if (err.response.status === 404) {
      errTitle = ' Not Found ';
      errMsg = 'Page not found';
    } else if (err.response.status === 409) {
      errTitle = ' Conflict ocurred';
      errMsg = 'The Data you entered already exist';
    } else if (err.response.status === 500) {
      errTitle = ' Server error';
      errMsg = 'Some error ocurred in server';
    } else if (err.response.status === 503) {
      errTitle = ' Service unavailable';
      errMsg = 'Sorry, The Service not available';
    }
  } else if (err.request) {
    errTitle = 'Network error';
    errMsg = 'Please check your network connection';
  }
  return { title: errTitle, msg: errMsg };
};

export const showErrorToast = (toast, err) => {
  if (err.response) {
    const { title, msg } = errorToast(err);
    toast({
      title: title,
      description: err.response?.data?.error?.message ?? msg,
      status: 'error',
      duration: 2000,
      isClosable: true,
    });
  } else if (err.request) {
    toast({
      title: 'Network Error.',
      description: 'Please check your network connection.',
      status: 'error',
      duration: 2000,
      isClosable: true,
    });
  }
};
