import { useEffect, useState } from "react";

function Dashboard({shop}){

  const [orders,setOrders] = useState([]);
  const [items,setItems] = useState([]);

  useEffect(()=>{

    fetch("http://localhost:5000/orders")
      .then(res=>res.json())
      .then(data=>setOrders(data));

    fetch("http://localhost:5000/items")
      .then(res=>res.json())
      .then(data=>setItems(data));

  },[]);


  const totalSales = orders.reduce(
    (sum,o)=>sum+o.total,
    0
  );


 return(

  <div className="container mt-4">

    {/* Welcome Banner */}
    <div className="card shadow p-4 mb-4 bg-light">

      <h2>Welcome to {shop.name}</h2>

      <p>
      Manage your restaurant billing, menu and orders from here.
      </p>

    </div>


    {/* Dashboard Cards */}

    <div className="row">

      <div className="col-md-4">
        <div className="card text-center shadow p-4 border-0">

          <h5>Total Orders</h5>
          <h1 className="text-primary">{orders.length}</h1>

        </div>
      </div>


      <div className="col-md-4">
        <div className="card text-center shadow p-4 border-0">

          <h5>Menu Items</h5>
          <h1 className="text-success">{items.length}</h1>

        </div>
      </div>


      <div className="col-md-4">
        <div className="card text-center shadow p-4 border-0">

          <h5>Total Sales</h5>
          <h1 className="text-danger">₹{totalSales}</h1>

        </div>
      </div>

    </div>

  </div>

)

}

export default Dashboard;