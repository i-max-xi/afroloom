import React, { useState, useEffect, useRef } from 'react';
import AllServices from "../../../Services/usersService"; // Assuming you have a similar service for fabrics
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { confirmDialog } from 'primereact/confirmdialog';
import CustomInput from '../../../Components/Input/CustomInput';
import { ProgressSpinner } from 'primereact/progressspinner';

const ManageFabrics = () => {
  const [fabrics, setFabrics] = useState([]);
  const [selectedFabric, setSelectedFabric] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [updatedFabric, setUpdatedFabric] = useState({});
  const [expandedRows, setExpandedRows] = useState([]);
  const toast = useRef(null);

  useEffect(() => {
    const fetchFabrics = async () => {
      try {
        const response = await AllServices.getAllFabrics();
        const data = response?.docs?.map(doc => ({ ...doc.data(), id: doc.id }));
        setFabrics(data);
      } catch (error) {
        console.error('Error fetching fabrics:', error);
      }
    };

    fetchFabrics();
  }, []);

 

  const updateFabric = async () => {
    try {
      setIsLoading(true);
      const response = await AllServices.updateFabric(selectedFabric.id, updatedFabric);
      setFabrics(fabrics.map(fabric => fabric.id === selectedFabric.id ? { ...fabric, ...updatedFabric } : fabric));
      setEditDialogVisible(false);
      toast.current.show({ severity: 'success', summary: 'Success', detail: response, life: 3000 });
    } catch (error) {
      console.error('Error updating fabric:', error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to update fabric', life: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDeleteFabric = (id) => {
    confirmDialog({
      message: 'Are you sure you want to delete this fabric?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => deleteFabric(id)
    });
  };

  const deleteFabric = async (id) => {
    try {
      setIsLoading(true);
      await AllServices.deleteFabric(id);
      setFabrics(fabrics.filter(fabric => fabric.id !== id));
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Fabric deleted', life: 3000 });
    } catch (error) {
      console.error('Error deleting fabric:', error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete fabric', life: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  const itemTemplate = (rowData) => {
    const items = Array.isArray(rowData.items) ? rowData.items : [rowData.items];
    return (
      <div>
        {items.map((item, index) => (
          <div key={index} className="p-d-flex p-ai-center p-mb-2">
            {item.image && <img src={item.image} alt={item.textureName} style={{ width: '100px', height: '100px', marginRight: '10px' }} />}
            <div>
              <h6>{item.textureName}</h6>
              <p>{item.textureDescription}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };


  const editItemTemplate = (items) => {
    const itemArray = Array.isArray(items) ? items : [items];
    return (
      <ol>
        {itemArray.map((item, index) => (
          <li key={index} className="p-d-flex p-ai-center my-4">
            <div className="p-field p-mr-2">
              <label htmlFor={`image-${index}`}>Image URL</label>
              <InputText id={`image-${index}`} value={item.image || ''} onChange={(e) => {
                const newItems = [...updatedFabric.items];
                newItems[index] = { ...newItems[index], image: e.target.value };
                setUpdatedFabric({
                  ...updatedFabric,
                  items: newItems
                });
              }} />
            </div>
            <div className="p-field p-mr-2">
              <label htmlFor={`textureName-${index}`}>Texture Name</label>
              <InputText id={`textureName-${index}`} value={item.textureName || ''} onChange={(e) => {
                const newItems = [...updatedFabric.items];
                newItems[index] = { ...newItems[index], textureName: e.target.value };
                setUpdatedFabric({
                  ...updatedFabric,
                  items: newItems
                });
              }} />
            </div>
            <div className="p-field">
              <label htmlFor={`textureDescription-${index}`}>Texture Description</label>
              <InputText id={`textureDescription-${index}`} value={item.textureDescription || ''} onChange={(e) => {
                const newItems = [...updatedFabric.items];
                newItems[index] = { ...newItems[index], textureDescription: e.target.value };
                setUpdatedFabric({
                  ...updatedFabric,
                  items: newItems
                });
              }} />
            </div>
          </li>
        ))}
      </ol>
    );
  };

  return (
    <div className="p-m-3">
      <Toast ref={toast} />
      <h5 style={{ fontWeight: 'normal' }}>Manage Fabrics</h5>
      <DataTable 
        value={fabrics} 
        paginator 
        rows={10} 
        rowsPerPageOptions={[5, 10, 25]} 
        className="p-datatable-gridlines" 
        expandedRows={expandedRows} 
        onRowToggle={(e) => setExpandedRows(e.data)} 
        rowExpansionTemplate={itemTemplate}
      >
        <Column expander style={{ width: '3rem' }} />
        <Column 
          field="id" 
          header="Fabric Type"
        />
        <Column field="price" header="Price" />
        <Column
          body={(rowData) => (
            <>
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-info p-mr-2"
                onClick={() => {
                  setSelectedFabric(rowData);
                  setUpdatedFabric(rowData);
                  setEditDialogVisible(true);
                }}
              />
              <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger"
                onClick={() => confirmDeleteFabric(rowData.id)}
              />
            </>
          )}
          header="Actions"
        />
      </DataTable>

      <Dialog header="Edit Fabric" visible={editDialogVisible} onHide={() => setEditDialogVisible(false)}>
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="fabricType">Fabric Type</label>
            <InputText id="fabricType" value={updatedFabric.id || ''} readOnly />
          </div>
          <div className="p-field">
            <label htmlFor="price">Price</label>
            <CustomInput id="price" value={updatedFabric.price || ''} onChange={(e) => {
              const newFabric = {
                ...updatedFabric,
                price: e.target.value
              };
              setUpdatedFabric(newFabric);
            }} />
          </div>
          {editItemTemplate(updatedFabric.items || [])}
          <button onClick={updateFabric} type="submit" className="btn btn-warning text-white w-100 mt-4 shadow-sm position-relative">
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
    </div>
  );
};

export default ManageFabrics;
