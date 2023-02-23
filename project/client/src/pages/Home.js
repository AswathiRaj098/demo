import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./Home.css";
import {toast} from "react-toastify";
import axios from "axios";


const Home = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const deleteContact = (id) => {
        if (
            window.confirm("Are you sure that you wanted to delete?")
        ) {
            axios.delete(`http://localhost:5000/api/remove/${id}`);
            toast.success("Deleted Successfully");
            setTimeout(() => loadData(), 200);
        }
    };

    return (
        <div style={{marginTop: "50px"}}>
            <strong style={{fontFamily: 'Roboto, Helvetica, sans-serif'}}><h2 style={{ color: 'darkmagenta'}}>STUDENT MANAGEMENT DETAILS</h2></strong>
            <Link to='/addContact'>
                <button className="btn btn-contact" onClick={'/addContact'}>Add Student</button>
            </Link>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>SNo.</th>
                        <th style={{textAlign: "center"}}>First_Name</th>
                        <th style={{textAlign: "center"}}>Last_Name</th>
                        <th style={{textAlign: "center"}}>Fathers_Name</th>
                        <th style={{textAlign: "center"}}>Mothers_Name</th>
                        <th style={{textAlign: "center"}}>Email</th>
                        <th style={{textAlign: "center"}}>Contact</th>
                        <th style={{textAlign: "center"}}>Education</th>
                        <th style={{textAlign: "center"}}>Address</th>
                        <th style={{textAlign: "center"}}>University</th>
                        <th style={{textAlign: "center"}}>Country</th>
                        <th style={{textAlign: "center"}}>Action</th>
                    </tr>
                </thead>
                 <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <th scope="row">{index+1}</th>
                                <td>{item.firstname}</td>
                                <td>{item.lastname}</td>
                                <td>{item.fathersname}</td>
                                <td>{item.mothersname}</td>
                                <td>{item.email}</td>
                                <td>{item.contact}</td>
                                <td>{item.education}</td>
                                <td>{item.address}</td>
                                <td>{item.university}</td>
                                <td>{item.country}</td>
                                <td>
                                    <Link to={`/update/${item.id}`}>
                                        <button className="btn btn-edit" onClick={'/update'}>Edit</button>
                                    </Link>
                                    <button className="btn btn-delete" onClick={() => deleteContact(item.id)}>Delete</button>
                                    <Link to={`/view/${item.id}`}>
                                        <button className="btn btn-edit" onClick={'/view'}>View</button>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                 </tbody>
            </table>
        </div>
    );
};

export default Home;