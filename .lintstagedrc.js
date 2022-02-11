module.exports = {
  '*.{ts,js,json,yml,md}': 'npm run prettier -- --write',
  '*.{ts,js}': 'npm run lint -- --fix'
};
