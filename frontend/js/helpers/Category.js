//////////////////////// Add categories ////////////////////////
export function addCategory(){

  const val=$('.category input[type="text"]').val();

  $.ajax({
      method: "post",
      data: {
          newCategory: val
      },
      url: `http://localhost:3000/categories`,
      dataType: "json",
  }).done((data) => {
        $(".category select option.addNewCategory").remove()
        $(".category select").append(`<option value='${data["id"]}'>${data["name"]}</option>`);
        $(".category select").append(`<option class="addNewCategory">+Add New Category</option>`);
        $(".category .hidden").css("display", "none")
        $('.category input[type="text"]').val("");
  });
}

//////////////////////// Get Categories ////////////////////////
export function getCategory(){

  $.ajax({
      method: "get",
      url: `http://localhost:3000/categories`,
      dataType: "json",
  }).done((data) => {
      data.forEach((val,index)=>{
          $(".category select").append(`<option value='${val["id"]}'>${val["name"]}</option>`);
      });

      if($(".category select option.addNewCategory")!==true){
        $(".category select").append(`<option class="addNewCategory">+Add New Category</option>`);
        }
  });
}

//////////////////////// Get Accounts ////////////////////////
export function getAccount(){

  $.ajax({
      method: "get",
      url: `http://localhost:3000/accounts`,
      dataType: "json",
  }).done((data) => {
      data.forEach((val,index)=>{
          const option=`<option value='${val["id"]}'>${val["username"]}</option>`;
          $(".appendAccount").append(option);
          const li=`<li class="liFlex"><div class='${val["id"]}'>${val["username"]}</div><div>0</div></li>`;
          $(".summary ul").append(li);
      })
  });
}

//////////////////////// Switch Radio buttons ////////////////////////
export function SwitchRadiobuttons(){

  $(".fromTo").css("display","none");
  $('.radioFlex input[value="deposit"], .radioFlex input[value="withdraw"]').on("click", ()=>{
      $(".fromTo").css("display","none");
      $(".summaryAccout").css("display","block");
  })

  $('.radioFlex input[value="transfer"]').on("click", ()=>{
    $(".fromTo").css("display","block");
    $(".summaryAccout").css("display","none");
    });
}
//////////////////////// Toggle Add New Account ////////////////////////
export function toggleAddNewAccount(){
    const add=$(".category select option.addNewCategory")
        if(add.is(":selected")==true){
            $(".category .hidden").css("display", "block")
        }else if(add.is(":selected")!==true){
            $(".category .hidden").css("display", "none")
        }
}

export default {addCategory, getCategory, getAccount, SwitchRadiobuttons}