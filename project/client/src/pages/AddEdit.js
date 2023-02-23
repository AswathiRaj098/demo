import React, {useState, useEffect} from "react";
import { useHistory, useParams, Link} from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    firstname: "",
    lastname: "",
    fathersname: "",
    mothersname: "",
    email: "",
    contact: "",
    education: "",
    address: "",
    university: "",
    country: "",
};

const AddEdit = () => {
    const [state, setState] = useState(initialState);

    const {firstname, lastname, fathersname, mothersname, email, contact, education, address, university, country} = state;
    
    const history = useHistory();

    const {id} = useParams();
    
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/get/${id}`)
            .then((resp) => setState({ ...resp.data[0] }));
    }, [id]);
    
    const handleSubmit= (e) => {
        e.preventDefault();
        if(!firstname || !lastname || !fathersname || !mothersname || !email || !contact || !education || !address || !university || !country) {
            toast.error("Please provide value into each input field");
        } else {
            if (!id) {
                axios.post("http://localhost:5000/api/post", {
                    firstname,
                    lastname,
                    fathersname,
                    mothersname,
                    email,
                    contact,
                    education,
                    address,
                    university,
                    country
                }).then(() => {
                    setState({firstname: "", lastname: "", fathersname: "", mothersname: "", email: "", contact: "", education: "", address: "", university: "", country: "" });
                })
                .catch((err) => toast.error(err.response.data));
                toast.success("Added Successfully");
            } else {
                axios.put(`http://localhost:5000/api/update/${id}`, {
                    firstname,
                    lastname,
                    fathersname,
                    mothersname,
                    email,
                    contact,
                    education,
                    address,
                    university,
                    country
                }).then(() => {
                    setState({firstname: "", lastname: "", fathersname: "", mothersname: "", email: "", contact: "", education: "", address: "", university: "", country: "" });
                })
                .catch((err) => toast.error(err.response.data));
                toast.success("Updated Successfully");
            }
            
            setTimeout(() => history.push("/"), 200);
        }
    };

    const handleInputChange = (e) => {
        const {name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    return (
        <div style={{marginTop: "100px"}}>
           <form style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"
           }}
           onSubmit={handleSubmit}
           >
            <label>First Name</label>
            <input type="text" id="firstname" name="firstname" placeholder="Your firstname..." value={firstname || ""} onChange={handleInputChange}/>
            <label htmlFor="lastname">Last Name</label>
            <input type="text" id="lastname" name="lastname" placeholder="Your lastname..." value={lastname || ""} onChange={handleInputChange}/>
            <label htmlFor="fathersname">Fathers Name</label>
            <input type="text" id="fathersname" name="fathersname" placeholder="Your fathersname..." value={fathersname || ""} onChange={handleInputChange}/>
            <label htmlFor="mothersname">Mothers Name</label>
            <input type="text" id="mothersname" name="mothersname" placeholder="Your mothersname..." value={mothersname || ""} onChange={handleInputChange}/>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Your mail Id ..." value={email || ""} onChange={handleInputChange}/>
            <label htmlFor="contact">Contact</label>
            <input type="number" id="contact" name="contact" placeholder="Your contact No..." value={contact || ""} onChange={handleInputChange}/>
            <label htmlFor="education">Education</label>
            <input type="text" id="education" name="education" placeholder="Your education..." value={education || ""} onChange={handleInputChange}/>
            <label htmlFor="address">Address</label>
            <input type="text" id="address" name="address" placeholder="Your address..." value={address || ""} onChange={handleInputChange}/>
            <label htmlFor="university">University</label>
            <input type="text" id="university" name="university" placeholder="Your university..." value={university || ""} onChange={handleInputChange}/>
            <label htmlFor="country">Country</label>
            <input type="text" id="country" name="country" placeholder="Your country..." value={country || ""} onChange={handleInputChange}/>
            <input type="submit" value={id ? "Update" : "Save"} onClick={'/'}/>
            <Link to="/">
                <input type="button" value="Go Back" onClick={'/'}/>
            </Link>
           </form>
        </div>
    );
};

export default AddEdit;