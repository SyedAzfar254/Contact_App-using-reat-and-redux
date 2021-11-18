import React, { useEffect, useState } from 'react'
import { useDispatch , useSelector } from 'react-redux';
import { Link,useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditContact = () => {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [number,setNumber] = useState("");

    const {id} = useParams();

    const dispatch = useDispatch();

    const history = useHistory()
    
    const contacts = useSelector(state => state);
    const currentContact = contacts.find(contact => contact.id === parseInt(id));

    useEffect(() => {
        if(currentContact){
             setName(currentContact.name)
             setEmail(currentContact.email)
             setNumber(currentContact.number)
        } 

    }, [currentContact]) // If our current contact changes our states will also change .

        // Form Validation Here 
        const handleSubmit = (e) => {
          e.preventDefault();
  
          const checkEmail = contacts.find(contact => contact.id !== parseInt(id) && contact.email === email);
          const checkNumber = contacts.find(contact => contact.id !== parseInt(id) && contact.number === parseInt(number));
  
          if(!email || !number || !name ) {
              return toast.warning("Please Fill In All The Fields!")
          } // If there is no name or number or email then using toast warning is given.
  
          if (checkEmail){
              return toast.error("This email already exists !")
          } // If email in state and typed is same then using toast, error is given & Id is getting updated so it should not be same 
  
          if (checkNumber){
              return toast.error("This number already exists !")
          } // If number in state and  typed is same then using toast error is given
  
          const data = {
              id : parseInt(id),
              name, 
              email,
              number
          }
  
          // console.log(data)
          dispatch({type:"UPDATE_CONTACT" , payload:data});
          toast.success("Student Updated Successfully");
          history.push("/")
  
      }
   
    return (
        <div className="container">
          {currentContact? ( // if currentContact is true/present then dispaly the below form
          <>
        <h1 className="display-3 my-5 text-center"> Edit Student {id} </h1>
    <div className="row">
     <div className="col-md-6 shadow mx-auto p-5"> 
       <form onSubmit={handleSubmit}>
           <div className="form-group">
                <input type="text" placeholder="Name" className="form-control" value={name} onChange={e=> setName(e.target.value)} />
           </div>
           <div className="form-group">
                <input type="email" placeholder="Email" className="form-control" value={email} onChange={e=> setEmail(e.target.value)} />
           </div>
           <div className="form-group">
                <input type="number" placeholder="Phone Number" className="form-control" value={number} onChange={e=> setNumber(e.target.value)} />
           </div>
           <div className="form-group">
                <input type="submit" value='Update Student' className="btn btn-dark" />
                <Link to="/" className="btn btn-danger ml-3" > Cancel </Link>
           </div>
       </form>  
    </div>  
    </div>    
    </>
    ): ( // else display this h1 
     <h1 className="display-3 my-5 text-center"> Student Contact With id {id} not exists </h1>
    )}
    </div>
    )
}

export default EditContact 
