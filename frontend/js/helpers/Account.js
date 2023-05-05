$(document).ready(() => {
  function addNewAccount(event) {
    event.preventDefault();
    const accountInput = $('.createNewAccount input[type="text"]').val();
    $.ajax({
      method: "post",
      data: {
        newAccount: accountInput,
      },
      url: "http://localhost:3000/accounts",
      dataType: "json",
    }).done((data) => {
      console.log("Username: ", data);
    });
  }

  $("#accountForm").on("submit", (e) => addNewAccount(e));
});
