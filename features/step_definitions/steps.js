module.exports = function() {
  this.Given(/^I open Google's search page$/, client => {
    client
      .url('http://google.com')
      .waitForElementVisible('body', 1000);
  });

  this.Then(/^the title is "([^"]*)"$/, (client, title) => {
    client.assert.title(title);
  });

  this.Then(/^the Google search form exists$/, client => {
    client.assert.visible('input[name="que"]');
  });
};
