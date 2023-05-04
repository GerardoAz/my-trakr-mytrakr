export function addNewAccount(newAccount) {
  let newAccount = {
    newAccount: "",
  };
  post("http://localhost:3000/accounts");
}
