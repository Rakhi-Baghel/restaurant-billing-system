import { useEffect, useState } from "react";

function HistoryPage(){

  const [orders,setOrders] = useState([]);
  const [selected,setSelected] = useState(null);

  useEffect(()=>{

    fetch("http://localhost:5000/orders")
      .then(res=>res.json())
      .then(data=>setOrders(data));

  },[]);


  const viewBill = (id)=>{

    fetch(`http://localhost:5000/order/${id}`)
      .then(res=>res.json())
      .then(data=>{

        const items = JSON.parse(data.items);

        setSelected({
          ...data,
          items:items
        });

      });

  };


  return(

    <div className="container mt-4">

      <h2>Bill History</h2>

      <table className="table mt-3">

        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {orders.map(order=>(
            <tr key={order.id}>

              <td>{order.id}</td>

              <td>{new Date(order.date).toLocaleString()}</td>

              <td>₹{order.total}</td>

              <td>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={()=>viewBill(order.id)}
                >
                  View
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>


      {selected && (

        <div className="card p-3 mt-4">

          <h4>Bill #{selected.id}</h4>

          {selected.items.map((item,i)=>(
            <div key={i}>

              {item.name} x {item.qty} =
              ₹{item.price * item.qty}

            </div>
          ))}

          <hr/>

          <h5>Total: ₹{selected.total}</h5>

        </div>

      )}

    </div>

  );

}

export default HistoryPage;