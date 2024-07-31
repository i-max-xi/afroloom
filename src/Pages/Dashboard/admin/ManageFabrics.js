import React, { useState, useEffect } from 'react';
import AllServices from "../../../Services/usersService"; // Assuming you have a similar service for fabrics
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { confirmDialog } from 'primereact/confirmdialog';
import { Tooltip } from 'primereact/tooltip';

const ManageFabrics = () => {
  const [fabrics, setFabrics] = useState([]);
  const [selectedFabric, setSelectedFabric] = useState(null);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [updatedFabric, setUpdatedFabric] = useState({});
  const [expandedRows, setExpandedRows] = useState([]);
  const toast = React.useRef(null);

  useEffect(() => {
    const fetchFabrics = async () => {
      try {
        const response = await AllServices.getAllFabrics();
        setFabrics(response.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error('Error fetching fabrics:', error);
      }
    };

    fetchFabrics();
  }, []);

  const updateFabric = async () => {
    try {
      await AllServices.updateFabric(selectedFabric.id, updatedFabric);
      setFabrics(fabrics.map(fabric => fabric.id === selectedFabric.id ? { ...fabric, ...updatedFabric } : fabric));
      setEditDialogVisible(false);
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Fabric updated', life: 3000 });
    } catch (error) {
      console.error('Error updating fabric:', error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to update fabric', life: 3000 });
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
      await AllServices.deleteFabric(id);
      setFabrics(fabrics.filter(fabric => fabric.id !== id));
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Fabric deleted', life: 3000 });
    } catch (error) {
      console.error('Error deleting fabric:', error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete fabric', life: 3000 });
    }
  };

  const fabricTypes = (rowData) => {
    return Object.keys(rowData).filter(key => key !== 'id' && key !== 'price');
  };

  const itemTemplate = (rowData) => {
    const type = fabricTypes(rowData)[0];
    const items = rowData[type]?.items || [];
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
  <Column field="fabricType" header="Fabric Type" body={(rowData) => fabricTypes(rowData).join(', ')} />
  <Column field="price" header="Price" body={(rowData) => {
    const type = fabricTypes(rowData)[0];
    return type ? rowData[type].price : 'N/A';
  }} />
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
  <Column expander style={{ width: '3rem' }} />
</DataTable>


      <Dialog header="Edit Fabric" visible={editDialogVisible} onHide={() => setEditDialogVisible(false)}>
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="fabricType">Fabric Type</label>
            <InputText id="fabricType" value={fabricTypes(updatedFabric).join(', ')} onChange={(e) => {
              const fabricType = e.target.value;
              const oldType = fabricTypes(updatedFabric)[0];
              const newUpdatedFabric = { ...updatedFabric };
              newUpdatedFabric[fabricType] = newUpdatedFabric[oldType];
              delete newUpdatedFabric[oldType];
              setUpdatedFabric(newUpdatedFabric);
            }} />
          </div>
          {fabricTypes(updatedFabric).map(type => (
            <React.Fragment key={type}>
              <div className="p-field">
                <label htmlFor="price">Price</label>
                <InputText id="price" value={updatedFabric[type]?.price || ''} onChange={(e) => {
                  const newFabric = {
                    ...updatedFabric,
                    [type]: { ...updatedFabric[type], price: e.target.value }
                  };
                  setUpdatedFabric(newFabric);
                }} />
              </div>
            </React.Fragment>
          ))}
          <Button label="Save" icon="pi pi-check" onClick={updateFabric} />
        </div>
      </Dialog>
    </div>
  );
};

export default ManageFabrics;
