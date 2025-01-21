import React from 'react';
import AdminOrder from '../../pages/admin/AdminOrder';
import { useNavigate } from 'react-router-dom';

const AdminLayout = () => {
    const navigate = useNavigate();
    
    const handleSubmit= ()=>{
        navigate('/')
      


    }
  return (

    <div >

         AdminLayout

        <AdminOrder/>

    {/* <button onClick={handleSubmit} >page to users</button> */}

    <button onClick={handleSubmit} > page to orders</button>
        
       
        </div>
  );
};

export default AdminLayout; 
