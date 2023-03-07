import React, { useContext, useEffect, useState } from 'react'
import { collection, getDocs, deleteDoc, doc, setDoc, where } from "firebase/firestore";
import { firestore } from 'config/firebase';
import { AuthContext } from 'context/AuthContext';


export default function ReadTodo() {

    const { user } = useContext(AuthContext)


    const [todo, setTodo] = useState([])

    const [forDelete, setForDelete] = useState({})

    const handleChange = e => {
        setForDelete({ ...forDelete, [e.target.name]: e.target.value })
    }

    const fetchDocuments = async () => {

        let array = []

        const querySnapshot = await getDocs(collection(firestore, "todo"), where("createdBy.uid", "==", user.uid));
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            data.id = doc.id
            array.push(data)

        });

        setTodo(array)
    }

    useEffect(() => {
        fetchDocuments()
    }, [])


    const handleEdit = (data) => {
        setForDelete(data)
    }

    const handleUpdate = async (data) => {

        await setDoc(doc(firestore, "todo", data.id), data, { merge: true });


        let newtodo = todo.map((olddata) => {
            if (olddata.id === data.id) {
                return data
            } else {
                return olddata
            }
        })

        setTodo(newtodo)

        setForDelete({})

    }
    const handleDelete = async (data) => {

        await deleteDoc(doc(firestore, "todo", data.id));

        let newtodo = todo.filter((newdata) => {
            return data.id !== newdata.id
        })

        setTodo(newtodo)
    }




    return (
        <>

            <div className='py-5 w-100'>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h1 className="text-dark text-center">Projects</h1>
                            <hr />
                            {todo.length > 0
                                ? <div className="table-responsive">
                                    <table className="table table-info rounded table-striped">
                                        <thead>
                                            <tr>
                                                <th className=" text-center align-middle" scope="col">#</th>
                                                <th className=" text-center align-middle" scope="col">Title</th>
                                                <th className=" text-center align-middle" scope="col">Location</th>
                                                <th className=" text-center align-middle" scope="col">Description</th>
                                                <th className=" text-center align-middle" scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {todo.map((data, i) => {
                                                return <tr key={i}>
                                                    <th className=" text-center align-middle" scope="row">{i + 1}</th>
                                                    <td className=" text-center align-middle">{data.title}</td>
                                                    <td className=" text-center align-middle">{data.location}</td>
                                                    <td className=" text-center align-middle">{data.description}</td>
                                                    <td className='text-center'>
                                                        <button className='btn btn-sm btn-info col-12' data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => { handleEdit(data) }}>Update</button>
                                                        <button className='btn btn-sm btn-danger col-12 mt-1' onClick={() => { handleDelete(data) }}>Delete</button>
                                                    </td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                : <div className="text-center text-primary">No Projects</div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="editModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit {forDelete.title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-3">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Title" name='title' value={forDelete.title} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Location" name='location' value={forDelete.location} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Description" name='description' value={forDelete.description} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { handleUpdate(forDelete) }}>Update</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
