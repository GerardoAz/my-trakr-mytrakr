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
      const username = `<option value='${data["id"]}'>${data["username"]}</option>`;
      $(".appendAccount").append(username);
      const li = `<li class="liFlex"><div class="${data["id"]}">${data["username"]}</div><div class="balance">0</div></li>`;
      $("div .summary ul").append(li);
    });
  }

  $("#accountForm").on("submit", (e) => addNewAccount(e));
});
