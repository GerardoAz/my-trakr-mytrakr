$(document).ready(() => {

    //////////////////////// Add Transactions ////////////////////////
        $(".addTransaction").on("click", (e)=>{
            e.preventDefault();
    
            let accountId;
            let accountIdFrom;
            let accountIdTo;
    
            if(
            $('.radioFlex input[value="deposit"]').is(":checked")||
            $('.radioFlex input[value="withdraw"]').is(":checked")
            ){
                accountId=parseInt($(".summaryAccout .appendAccount option:selected").attr("value"));
                accountIdFrom=null;
                accountIdTo=null;
            }else if($('.radioFlex input[value="transfer"]').is(":checked")){
                accountIdFrom=parseInt($(".fromTo .from option:selected").attr("value"));
                accountIdTo=parseInt($(".fromTo .to option:selected").attr("value"));
            }
            const type=$('.radioFlex input[type="radio"]:checked').next().text();
            const amount=parseInt($('.amount input[type="number"]').val());
            const categoryId=parseInt($(".category select option:selected").attr("value"));
            const description=$('.description input[type="text"]').val();
            const stringified=JSON.stringify(
                {
                accountId:accountId, // account ID for Deposits or Withdraws
                accountIdFrom:accountIdFrom, // sender ID if type = 'Transfer', otherwise null
                accountIdTo:accountIdTo, // receiver ID if type = 'Transfer', otherwise null,
                type:type, // 'Deposit', 'Withdraw', 'Transfer'
                amount:amount, // amount of the transaction
                categoryId:categoryId, // category ID
                description:description // description of the transaction
                }
            );
    
            if(!amount){
                alert("Please enter amount.")
            };
    
            $.ajax({
                method: "post",
                data: {
                    newTransaction:stringified
                },
                url: `http://localhost:3000/transactions`,
                dataType: "json",
            }).done((data) => {
            
                $('.amount input[type="number"]').val("");
                $('.description input[type="text"]').val("");
    
                const summary=$(".liFlex div[class="+data[0]["accountId"]+"]").next();
                
                if(data[0]["type"]=='Deposit'){
                    summary.text(parseInt(summary.text())+parseInt(data[0]["amount"]));
                }else if(data[0]["type"]=='Withdraw'){
                    summary.text(parseInt(summary.text())-parseInt(data[0]["amount"]));
                }else if(data[0]["type"]=='Transfer' && accountIdFrom!==accountIdTo){
                    const sender=$(".liFlex div[class="+data[1]["accountId"]+"]").next();
                    const receiver=$(".liFlex div[class="+data[0]["accountId"]+"]").next();
                    sender.text(parseInt(sender.text())-parseInt(data[0]["amount"]));
                    receiver.text(parseInt(receiver.text())+parseInt(data[0]["amount"]));
                }else{
                    alert("Please choose different accounts.");
                }
            });
        });
    
    //////////////////////// Get Transactions ////////////////////////
    
        $.ajax({
            method: "get",
            url: `http://localhost:3000/transactions`,
            dataType: "json",
        }).done((data) => {
    
        for(let key2 in data){
            for(let key in data[key2]){
            const type=data[key2][key]["type"];
            const accountId=data[key2][key]["accountId"];
            const from=data[key2][key]["accountIdFrom"];
            const to=data[key2][key]["accountIdTo"];
            const amount=parseInt(data[key2][key]["amount"]);
            const summaryAccount=$(".liFlex div[class="+accountId+"]").next();
    
            if(type=="Deposit"){
                summaryAccount.text(parseInt(summaryAccount.text())+amount);
            }else if(type=="Withdraw"){
                summaryAccount.text(parseInt(summaryAccount.text())-amount);
            }else if(type=="Transfer" && accountId==from){
                summaryAccount.text(parseInt(summaryAccount.text())-amount);
            }else if(type=="Transfer" && accountId==to){
                summaryAccount.text(parseInt(summaryAccount.text())+amount);
            };
    
            };
        };
            
        });
    });