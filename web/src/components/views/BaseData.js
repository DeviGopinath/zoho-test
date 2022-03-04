import { DatePicker } from "antd";
import "antd/dist/antd.css";
import { APIService } from "../../service/api.service";
import { useState } from "react";
import { useEffect } from 'react';
import "../../style/BaseData.css";

const BaseData = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        getEmp();
    })

    const getEmp = () => {
        APIService.getData().then((response) => {
            if (
                response.status === "SUCCESS" &&
                response.data[0] !== undefined
            ) {
                setContacts(response.data);
                var data = response.data;
                console.log(data);
            }
        });
    };

    const insert = (name, phone, email) => {
        console.log(name, phone, email);
        APIService.insertData(name, phone, email).then(
            (response) => {
                if (response.status === "SUCCESS") {
                    console.log("Success");
                    getEmp();
                }
            }
        );
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        insert(
            e.target.name.value,
            e.target.phone.value,
            e.target.email.value,
        );
    };

    return (
        <div className="mainbox">
            <div className="main">
                <form onSubmit={onSubmitHandler}>
                    <div className="row basedatahead">
                        <div className="col-md-4 heading">Contact Manager </div>
                    </div>
                    <div className="row datarow">
                        <div className="col-md-3 titles">Name</div>
                        <div className="col-md-3">
                            <input
                                name="name"
                            ></input>
                        </div>
                    </div>
                    <div className="row datarow">
                        <div className="col-md-3 titles">Phone</div>
                        <div className="col-md-3">
                            <input
                                name="phone"
                            ></input>
                        </div>
                    </div>
                    <div className="row datarow">
                        <div className="col-md-3 titles">Email</div>
                        <div className="col-md-3">
                            <input
                                name="email"
                            ></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-3 submitrow">
                            <button type="submit" className="submitbtn">
                                Submit
                            </button>
                        </div>
                        <div className="col-md-6"></div>
                    </div>
                </form>
            </div>
            <div className="heading">Contacts</div>
            <div className="row titlerow">
                <div className="col-md-2">Name</div>
                <div className="col-md-2">Phone</div>
                <div className="col-md-2">Email</div>
            </div>
            <div>
                {contacts.map((item, ind) => (
                    <div className="row datarow">
                        <div className="col-md-2">{item.name}</div>
                        <div className="col-md-2">{item.phone}</div>
                        <div className="col-md-2">{item.email}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BaseData;
