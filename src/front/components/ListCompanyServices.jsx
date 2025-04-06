import React from "react";

const ListCompanyServices = (props) => {

    return(
        <div className="list-group-item p-3">
            <h5 className="sour-gummy-head">Title: {props.service}</h5>
            <p><h5 className="sour-gummy-head">Descripcion:</h5> {props.description}</p>
            <p><h5 className="sour-gummy-head">Image:</h5> {props.image}</p>
        </div>
    );
}

export default ListCompanyServices;