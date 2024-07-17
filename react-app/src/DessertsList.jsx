function DessertsList(props) {    
    const desserts = props.desserts.map((dessert) =>   (
        <li key={dessert.id}>
          {dessert.name} - {dessert.calories} calories
        </li>    

    ))  
    console.log("desserts", desserts)  
    return (
      <ul>{desserts}</ul>
      
    )
    
  }
  
  export default DessertsList;
  
  