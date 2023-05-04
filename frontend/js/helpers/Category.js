$(document).ready(() => {

    //////////////////////// Add categories ////////////////////////
          $(".category button").on("click", (e)=>{
            e.preventDefault();
            const val=$('.category input[type="text"]').val();
            
          $.ajax({
            method: "post",
            data: {
              newCategory: val
            },
            url: `http://localhost:3000/categories`,
            dataType: "json",
          }).done((data) => {
              $(".category select").append(`<option value='${data["id"]}'>${data["name"]}</option>`);
              $('.category input[type="text"]').val("");
            });
        })
    
    //////////////////////// Get Categories ////////////////////////
        $.ajax({
                method: "get",
                url: `http://localhost:3000/categories`,
                dataType: "json",
              }).done((data) => {
                data.forEach((val,index)=>{
                $(".category select").append(`<option value='${val["id"]}'>${val["name"]}</option>`);
                });
              });
    
    //////////////////////// Get Accounts ////////////////////////
          $.ajax({
            method: "get",
            url: `http://localhost:3000/accounts`,
            dataType: "json",
          }).done((data) => {
                data.forEach((val,index)=>{
                console.log("Index:",index,"Value",val);
                const option=`<option value='${val["id"]}'>${val["username"]}</option>`;
                $(".appendAccount").append(option);
                const li=`<li class="liFlex"><div class='${val["id"]}'>${val["username"]}</div><div>0</div></li>`;
                $(".summary ul").append(li);
                })
              });
    
    //////////////////////// Switch Radio buttons ////////////////////////
        $(".fromTo").css("display","none");
        $('.radioFlex input[value="deposit"], .radioFlex input[value="withdraw"]').on("click", ()=>{
            $(".fromTo").css("display","none");
            $(".summaryAccout").css("display","block");
        })
        
        $('.radioFlex input[value="transfer"]').on("click", ()=>{
            $(".fromTo").css("display","block");
            $(".summaryAccout").css("display","none");
        });
    });
