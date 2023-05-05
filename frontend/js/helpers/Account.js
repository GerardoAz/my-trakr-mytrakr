function addNewAccount() {
  const accountInput = $(".createNewAccount input[type=text]").val();
  $.ajax({
    method: "post",
    data: {
      username: accountInput,
    },
    URL: "http://localhost:3000/accounts",
    dataType: "json",
  }).done((data) => {
    console.log("Username: ", data);
  });
}

$(".createNewAccounnt button").on("click", addNewAccount());
