export const getDateFromNow = (date) => {
  const diffTime = Math.abs(Date.now() - date);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
export const isDateOlder = (date) => date.getTime() < Date.now();
export const validTill = (validity) => {
  const months = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec',
  };
  const isExpired = isDateOlder(new Date(validity));
  if (!isExpired) {
    const date = new Date(validity);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    // return `Expires on ${day} ${months[month]} ${year}`;
    return {
      validity: true,
      heading: ` ${day} ${months[month]} ${year}`,
      para: 'You can extend extend your validity before it expires',
      button_text: 'Extend Validity',
    };
  } else {
    return {
      validity: false,
      heading: `Your account has been expired`,
      para: 'Renew your account get job updates (including contact numbers of job provider\'s)',
      button_text: 'Renew Account',
    };
  }
};
