
var { poolPromise } = require("../connection/db");

exports.subscribe = async (req, res, next) => {
  try {
    const pool = await poolPromise;

    const {
        customermobile,
        amount,
        cardid,
        tranno,
        refno,
        remarks,
        trandate,
        accountno,
        clientId,
      } = req.body;

     if(clientId ==='' || clientId === null) 
     {
       return res.status(400).json({ success: false, error:'Invalid client secret' });
       next() 
      }


      const clientResult = await pool.request()
      .input("client_id", clientId)
      .execute("getClientId");
    
       const client = clientResult.recordset[0];
      
       if(!client) {
        return res.status(400).json({ success: false, error:'Unauthenticated client' });
        next() 
       
       }

    if (customermobile === '' || customermobile === null)
    {
      return res.status(400).json({ success: false, error:'Customer mobile is required' });
      next() 
     
     }
     if (cardid === '' || cardid === null)
     {
       return res.status(400).json({ success: false, error:'Customer card number is required' });
       next() 
      
      }
      if (amount === '' || amount === null)
      {
        return res.status(400).json({ success: false, error:'Amount is required' });
        next() 
       
       }
       if (amount < 5)
      {
        return res.status(400).json({ success: false, error:'Amount should be greater than 5' });
        next() 
       
       }
    const result = await pool
      .request()
      .input("customermobile", customermobile)
      .input("amount", amount)
      .input("cardid", cardid)
      .input("tranno", tranno)
      .input("trandate", trandate)
      .input("accountno", accountno)
      .input("refno", refno)
      .input("remarks", remarks)
      .execute("insertVCReceipt")
      .then((recordSet) => {
        res.status(200).json({ success: true, recordSet });
      });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: "invalid" });
   
  }
};


