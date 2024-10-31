const districts = [
  { name: 'Alappuzha', isHidden: true },
  { name: 'Ernakulam', isHidden: false },
  { name: 'Idukki', isHidden: true },
  { name: 'Kannur', isHidden: true },
  { name: 'Kasaragod', isHidden: true },
  { name: 'Kollam', isHidden: true },
  { name: 'Kottayam', isHidden: false },
  { name: 'Kozhikode', isHidden: false },
  { name: 'Malappuram', isHidden: false },
  { name: 'Palakkad', isHidden: true },
  { name: 'Pathanamthitta', isHidden: true },
  { name: 'Thrissur', isHidden: false },
  { name: 'Thiruvananthapuram', isHidden: false },
  { name: 'Wayanad', isHidden: true },
];

export const getDistricts = (includeHidden = false) => {
  if (includeHidden) {
    return districts.map((district) => district.name);
  } else return districts.filter((district) => !district.isHidden).map((district) => district.name);
};

export const getDistrictsForFilter = (includeHidden = false) => {
  const options = ['All'];
  if (includeHidden) {
    const districtsArray = districts.map((district) => district.name);
    return options.concat(districtsArray);
  } else {
    const districtsArray = districts
      .filter((district) => !district.isHidden)
      .map((district) => district.name);
    return options.concat(districtsArray);
  }
};
