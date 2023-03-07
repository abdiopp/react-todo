import React, { useState } from "react";
import { toast } from "react-toastify";
import { collection, addDoc, serverTimestamp, setDoc, doc } from "firebase/firestore";
import { firestore } from "config/firebase";
import { useAuthContext } from "context/AuthContext";
import { Link } from "react-router-dom";

const initialState = {
    title: "",
    location: "",
    description: "",
};
export default function Hero() {
    window.toastify = (msg, type) => {
        switch (type) {
            case "success":
                toast.success(msg);
                break;
            case "error":
                toast.error(msg);
                break;
            default:
                toast(msg);
        }
    };

    const { user, isAuthenticated } = useAuthContext()

    console.log('user', user)
    const [todo, setTodo] = useState(initialState);
    const [isAdding, setIsAdding] = useState(false);

    let name, value;
    const handleChange = (event) => {
        name = event.target.name;
        value = event.target.value;

        setTodo({ ...todo, [name]: value });
    };

    // add data to firestore
    const handleSubmit = async () => {
        let { title, location, description } = todo;

        title = title.trim();
        location = location.trim();
        description = description.trim();

        if (!isAuthenticated) {
            return window.toastify("Please Login", "error");

        }
        if (title.length < 3) {
            window.toastify("Please Enter Your Todo Title Correctly", "error");
            return;
        }
        if (location.length < 3) {
            window.toastify("Please Enter Your Todo Location Correctly", "error");
            return;
        }
        if (description.length < 5) {
            window.toastify("Please Enter Your Todo Description Correctly", "error");
            return;
        }

        let formData = { title, location, description }


        const id = Math.random().toString(36).slice(2)

        formData.id = id
        formData.dateCreated = serverTimestamp()
        formData.createdBy = {
            email: user.email,
            fullName: user.fullName,
            uid: user.uid
        }

        createDocument(formData);

    };

    const createDocument = async (formData) => {
        setIsAdding(true)
        try {
            await setDoc(doc(firestore, "todo", formData.id), formData);
            window.toastify("Todo has been successfully added", "success");
        } catch (err) {
            console.error(err)
            window.toastify("Something went went wrong, Todo isn't added.", "error")
        }
        setIsAdding(false)
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-5">
                        <h1 className="text-primary text-center">Add Todo</h1>
                    </div>
                    <div className="card my-5 py-5">
                        <div className="card-cody">
                            <div className="container">
                                <div>
                                    <div className="row">
                                        <div className="col-12 my-3">
                                            <label htmlFor="title" className="form-label fw-semibold">
                                                Title
                                            </label>
                                            <div className="col">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="title"
                                                    id="title"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 my-3">
                                            <label
                                                htmlFor="location"
                                                className="form-label fw-semibold"
                                            >
                                                Location
                                            </label>
                                            <div className="col">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="location"
                                                    id="location"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 my-3">
                                            <label
                                                htmlFor="description"
                                                className="form-label fw-semibold"
                                            >
                                                Description
                                            </label>
                                            <div className="col">
                                                <textarea
                                                    type="text"
                                                    className="form-control"
                                                    name="description"
                                                    id="description"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12 text-center">
                                            <button
                                                className="btn btn-info col-8 mt-2"
                                                type="submit"
                                                onClick={handleSubmit}
                                                disabled={isAdding}
                                            >
                                                {!isAdding ? (
                                                    "Add Todo"
                                                ) : (
                                                    <div className="spinner-border spinner-border-sm"></div>
                                                )}
                                            </button>
                                            {isAuthenticated
                                                ? <Link className="btn btn-danger col-8 mt-2" to='/readTodo' >Read Todos</Link>
                                                : null

                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
