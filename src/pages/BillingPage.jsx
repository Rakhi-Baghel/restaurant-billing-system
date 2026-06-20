import { useState, useEffect } from "react";

function BillingPage() {
  const [items, setItems] = useState([]);
  const [bill, setBill] = useState([]);
  const [qty, setQty] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const handleQty = (id, value) => {
    setQty({ ...qty, [id]: Number(value) });
  };

  const addItem = (item) => {
    const quantity = qty[item.id] || 1;

    const existing = bill.find(b => b.id === item.id);

    if (existing) {
      setBill(
        bill.map(b =>
          b.id === item.id
            ? { ...b, qty: b.qty + quantity }
            : b
        )
      );
    } else {
      setBill([...bill, { ...item, qty: quantity }]);
    }
  };

  const removeItem = (id) => {
    setBill(bill.filter(item => item.id !== id));
  };

  const total = bill.reduce((sum, item) => sum + item.price * item.qty, 0);
  
  const generateBill = () => {

  fetch("http://localhost:5000/create-order",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      items:bill,
      total:total
    })
  })
  .then(res=>res.json())
  .then(data=>{
    alert("Bill Saved!");
    setBill([]);
  });

};

const clearBill = () => {
  setBill([]);
};

const printBill = () => {
  console.log("Print clicked")

  if (bill.length === 0) {
    alert("No items in bill");
    return;
  }

  const logo = "https://cdn-icons-png.flaticon.com/512/3075/3075977.png";

  let html = `
  <html>
  <head>
  <title>Bill</title>
  </head>

  <body style="font-family:Arial;text-align:center">

  <img src="${logo}" width="60"/>

  <h2>Burger King</h2>
  <p>Fast Food Restaurant</p>

  <h2>Restaurant Bill</h2>

  <hr/>
  `;

  bill.forEach(item => {

    html += `
      <p>
      ${item.name} x ${item.qty}
      = ₹${item.price * item.qty}
      </p>
    `;

  });

  html += `
  <hr/>
  <h3>Total ₹${total}</h3>

  <p>Thank You Visit Again</p>

  </body>
  </html>
  `;

  const win = window.open("", "", "width=300,height=500");

  win.document.write(html);
  win.document.close();
  win.print();

};

  return (
    <div className="container mt-4">

      <div className="row">

        {/* MENU */}
        <div className="col-md-6">
          <h4>Menu</h4>

          {items.map(item => (
            <div key={item.id} className="card p-2 mb-2 d-flex flex-row justify-content-between align-items-center">

              <div>
                {item.name} - ₹{item.price}
              </div>

              <div className="d-flex gap-2">

                <select
                  className="form-select form-select-sm"
                  style={{width:"70px"}}
                  onChange={(e)=>handleQty(item.id,e.target.value)}
                >
                  {[1,2,3,4,5].map(n=>(
                    <option key={n}>{n}</option>
                  ))}
                </select>

                <button
                  className="btn btn-sm btn-primary"
                  onClick={()=>addItem(item)}
                >
                  Add
                </button>

              </div>
            </div>
          ))}

        </div>

        {/* BILL */}
        <div className="col-md-6">
          <h4>Current Bill</h4>

          {bill.map(item=>(
            <div key={item.id} className="d-flex justify-content-between border-bottom py-1">

              <span>
                {item.name} x {item.qty}
              </span>

              <span>
                ₹{item.price * item.qty}

                <button
                  className="btn btn-sm btn-danger ms-2"
                  onClick={()=>removeItem(item.id)}
                >
                  X
                </button>
              </span>

            </div>
          ))}

          <hr/>

          <h5>Total: ₹{total}</h5>

          <button
          className="btn btn-secondary m-2"
          onClick={clearBill}
          >
            Reset Bill
          </button>

          <button
          className="btn btn-success m-3"
          onClick={generateBill}
          >
            Generate Bill
          </button>

          <button
          className="btn btn-dark m-2"
          onClick={printBill}
          >
           Print Bill
          </button>

        </div>

      </div>

    </div>
  );
}

export default BillingPage;