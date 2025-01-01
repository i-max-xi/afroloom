import React, { useState, useEffect } from "react";
import AllServices from "../../../Services/usersService"; // Make sure the path is correct
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { ProgressSpinner } from "primereact/progressspinner";

const ContactDetails = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [fieldToEdit, setFieldToEdit] = useState("");
  const [fieldArray, setFieldArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = React.useRef(null);

  useEffect(() => { 
    const fetchContacts = async () => {
      try {
        const response = await AllServices.getAllcontactDetails();
        setContacts(
          response.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
        );
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const openEditDialog = (contact) => {
    setSelectedContact(contact);
  };

  const addItem = (field) => {
    setSelectedContact({
      ...selectedContact,
      [field]: [...selectedContact[field], ""],
    });
  };

  const removeItem = (field, index) => {
    const updatedField = selectedContact[field].filter((_, i) => i !== index);
    setSelectedContact({ ...selectedContact, [field]: updatedField });
  };

  const updateItem = (e, field, index) => {
    const updatedField = selectedContact[field].map((item, i) =>
      i === index ? e.target.value : item,
    );
    setSelectedContact({ ...selectedContact, [field]: updatedField });
  };

  const saveContact = async () => {
    setIsLoading(true);
    try {
      await AllServices.updatecontactDetail(
        selectedContact.id,
        selectedContact,
      );
      setContacts(
        contacts.map((contact) =>
          contact.id === selectedContact.id ? selectedContact : contact,
        ),
      );
      setSelectedContact(null);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Contact updated",
        life: 3000,
      });
    } catch (error) {
      console.error("Error updating contact:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to update contact",
        life: 3000,
      });
    }
    setIsLoading(false);
  };

  const renderEditDialog = () => {
    if (!selectedContact) return null;

    return (
      <Dialog
        className="w-75"
        header="Edit Contact Details"
        visible={!!selectedContact}
        modal
        onHide={() => setSelectedContact(null)}
      >
        {["call", "email", "location"].map((field) => (
          <div key={field} className="p-field">
            <h5>{field.charAt(0).toUpperCase() + field.slice(1)}</h5>
            {selectedContact[field].map((item, index) => (
              <div key={index} className="p-inputgroup ">
                <InputText
                  value={item}
                  onChange={(e) => updateItem(e, field, index)}
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-danger"
                  onClick={() => removeItem(field, index)}
                />
              </div>
            ))}
            <button
              onClick={() => addItem(field)}
              className="btn btn-primary text-white w-100 mb-4 mt-2"
            >
              Add {field}
            </button>
          </div>
        ))}
        <div className="p-dialog-footer">
          <button
            onClick={saveContact}
            type="submit"
            className="btn btn-warning text-white w-100 mt-4 shadow-sm position-relative"
          >
            <span className="spinner-container">
              {isLoading && (
                <ProgressSpinner
                  style={{ width: "1.5rem", height: "1.5rem" }}
                  strokeWidth="8"
                  fill="var(--surface-ground)"
                  className="position-absolute top-50 start-50 translate-middle"
                />
              )}
            </span>
            Save
          </button>
        </div>
      </Dialog>
    );
  };

  const renderArrayField = (field) => (rowData) => {
    return rowData[field].join(", ");
  };

  const renderEditButton = (rowData) => {
    return (
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-success"
        onClick={() => openEditDialog(rowData)}
      />
    );
  };

  return (
    <div className="p-m-3">
      <Toast ref={toast} />
      <h5 style={{ fontWeight: "normal" }}>Manage Contact Details</h5>
      <DataTable
        value={contacts}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="p-datatable-gridlines"
      >
        <Column field="call" header="Call" body={renderArrayField("call")} />
        <Column field="email" header="Email" body={renderArrayField("email")} />
        <Column
          field="location"
          header="Location"
          body={renderArrayField("location")}
        />
        <Column
          header="Actions"
          body={renderEditButton}
          style={{ textAlign: "center", width: "10em" }}
        />
      </DataTable>
      {renderEditDialog()}
    </div>
  );
};

export default ContactDetails;
