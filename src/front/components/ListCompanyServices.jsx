import React from "react";

const ListCompanyServices = (props) => {
  return (
    <div className="list-group-item p-3">
      <h5 className="sour-gummy-head">Title: {props.service}</h5>

      <p>
        <h5 className="sour-gummy-head">Descripcion:</h5>
        {props.description}
      </p>

      <div>
        <h5 className="sour-gummy-head">Image:</h5>
        {props.image ? (
          <img
            src={props.image}
            alt="Service"
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginTop: "8px"
            }}
          />
        ) : (
          <p className="text-muted"><em>No image provided.</em></p>
        )}
      </div>
    </div>
  );
};

export default ListCompanyServices;
