module.exports = {
  format_date: (date) => {
      `${date.toLocaleTimeString()} ${
        date.getMonth() + 1
      }/${date.getDate()}/${date.getFullYear()}`;
  }
};
