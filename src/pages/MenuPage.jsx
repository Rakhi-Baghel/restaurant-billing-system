import { useEffect, useState } from "react";

function MenuPage(){

  const [items,setItems] = useState([]);
  const [name,setName] = useState("");
  const [price,setPrice] = useState("");
  const [editId,setEditId] = useState(null);

  useEffect(()=>{

    fetch("http://localhost:5000/items")
      .then(res=>res.json())
      .then(data=>setItems(data));

  },[]);


  const saveItem = ()=>{

    if(!name || !price){
      alert("Enter item name and price");
      return;
    }

    if(editId){

      fetch(`http://localhost:5000/items/${editId}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({name,price})
      })
      .then(res=>res.json())
      .then(()=>{

        setItems(items.map(i=>
          i.id===editId ? {id:editId,name,price} : i
        ));

        setEditId(null);
        setName("");
        setPrice("");

      });

    }else{

      fetch("http://localhost:5000/items",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({name,price})
      })
      .then(res=>res.json())
      .then(data=>{

        setItems([...items,data]);

        setName("");
        setPrice("");

      });

    }

  };


  const deleteItem = (id)=>{

    fetch(`http://localhost:5000/items/${id}`,{
      method:"DELETE"
    });

    setItems(items.filter(i=>i.id!==id));

  };


  const editItem = (item)=>{

    setName(item.name);
    setPrice(item.price);
    setEditId(item.id);

  };


  return(

    <div className="container mt-4">

      <h2>Menu Management</h2>

      <div className="card p-3 mb-4 shadow">

        <div className="d-flex gap-2">

          <input
          className="form-control"
          placeholder="Item Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          />

          <input
          className="form-control"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
          />

          <button
          className="btn btn-primary"
          onClick={saveItem}
          >
            {editId ? "Update" : "Add"}
          </button>

        </div>

      </div>


      <table className="table">

        <thead>

          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {items.map(item=>(

            <tr key={item.id}>

              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>₹{item.price}</td>

              <td>

                <button
                className="btn btn-warning btn-sm me-2"
                onClick={()=>editItem(item)}
                >
                  Edit
                </button>

                <button
                className="btn btn-danger btn-sm"
                onClick={()=>deleteItem(item.id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default MenuPage;