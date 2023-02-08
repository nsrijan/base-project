import getConfig from "next/config";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { Rating } from "primereact/rating";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { classNames } from "primereact/utils";
import React, { useEffect, useRef, useState } from "react";
import GenericService from "../../service/GenericService";

const UsersList = ({ users }) => {
  let emptyUser = {
    id: "",
    name: "",
    address: "",
    balance: "",
    clientId: "",
    deliverable: "",
    hasSeparateRate: "",
    phone: "",
  };

  const [apiEntity, setApiEntity] = useState("customers");
  const [allUsers, setAllUsers] = useState(users);
  const [userDialog, setUserDialog] = useState(false);
  const [deleteUserDialog, setDeleteUserDialog] = useState(false);
  const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
  const [user, setUser] = useState(emptyUser);
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const contextPath = getConfig().publicRuntimeConfig.contextPath;
  const router = useRouter();

  // useEffect(() => {
  //   const userService = new UserService();
  //   userService.getUsers().then((data) => setUsers(data));
  // }, []);

  const formatCurrency = (value) => {
    if (!value) return;
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const openNew = () => {
    setUser(emptyUser);
    setSubmitted(false);
    setUserDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setUserDialog(false);
  };

  const hideDeleteUserDialog = () => {
    setDeleteUserDialog(false);
  };

  const hideDeleteUsersDialog = () => {
    setDeleteUsersDialog(false);
  };

  // const addOrEdit = async (user) => {
  //   console.log("🚀 ~ file: index.js:73 ~ addOrEdit ~ user", user);
  //   setSubmitted(true);

  //   try {
  //     const response = await fetch("http://localhost:8081/api/customers", {
  //       method: "POST",
  //       body: JSON.stringify(user),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }

  //   setUsers(_users);
  //   setUserDialog(false);
  //   setUser(emptyUser);
  //   router.push("/users");
  // };

  const saveUser = async () => {
    setSubmitted(true);

    if (user.name.trim()) {
      let _allUsers = [...users];
      let _user = { ...user };
      // if (user.id) {
      try {
        GenericService.add(user, apiEntity);
      } catch (error) {
        console.error(error);
      }

      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "User Updated",
        life: 3000,
      });
      // }

      // setUsers(_users);
      setUserDialog(false);
      setUser(emptyUser);
      router.reload();
    }
  };

  const editUser = (user) => {
    setUser({ ...user });
    setUserDialog(true);
  };

  const confirmDeleteUser = (user) => {
    setUser(user);
    setDeleteUserDialog(true);
  };

  const deleteUser = async () => {
    try {
      GenericService.delete(`${user.id}`, apiEntity);

      setDeleteUserDialog(false);
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "User Deleted",
        life: 3000,
      });
    } catch (error) {
      console.error(error);
      setDeleteUserDialog(false);
      toast.current.show({
        severity: "error",
        summary: "Failed",
        detail: "User Delete Failed",
        life: 3000,
      });
    }
    router.reload();
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < allUsers.length; i++) {
      if (users[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteUsersDialog(true);
  };

  const deleteSelectedUsers = () => {
    let _allUsers = users.filter((val) => !selectedUsers.includes(val));
    setUsers(_allUsers);
    setDeleteUsersDialog(false);
    setSelectedUsers(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Users Deleted",
      life: 3000,
    });
  };

  const onHasSeparateRateChange = (e) => {
    let _user = { ...user };
    _user["hasSeparateRate"] = e.value;
    setUser(_user);
  };

  const onDeliverableChange = (e) => {
    let _user = { ...user };
    _user["deliverable"] = e.value;
    setUser(_user);
  };

  const handleRadio = (e, name) => {
    const val = e.target.value === "true" ? true : false;
    let _user = { ...user };
    _user[`${name}`] = val;

    setUser(_user);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _user = { ...user };
    _user[`${name}`] = val;

    setUser(_user);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            label="New"
            icon="pi pi-plus"
            className="p-button-success mr-2"
            onClick={openNew}
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            className="p-button-danger"
            onClick={confirmDeleteSelected}
            disabled={!selectedUsers || !selectedUsers.length}
          />
        </div>
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <FileUpload
          mode="basic"
          accept="image/*"
          maxFileSize={1000000}
          label="Import"
          chooseLabel="Import"
          className="mr-2 inline-block"
        />
        <Button
          label="Export"
          icon="pi pi-upload"
          className="p-button-help"
          onClick={exportCSV}
        />
      </React.Fragment>
    );
  };

  const codeBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Code</span>
        {rowData.id}
      </>
    );
  };

  const nameBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Name</span>
        {rowData.name}
      </>
    );
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Image</span>
        <img
          src={`${contextPath}/demo/images/user/${rowData.image}`}
          alt={rowData.image}
          className="shadow-2"
          width="100"
        />
      </>
    );
  };

  const priceBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Price</span>
        {formatCurrency(rowData.balance)}
      </>
    );
  };

  const phoneBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Price</span>
        {formatPhoneNumber(rowData.phone)}
      </>
    );
  };

  const formatPhoneNumber = (value) => {
    if (!value) return;
    return value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editUser(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteUser(rowData)}
        />
      </>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Manage Users</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  const userDialogFooter = (
    <>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveUser}
      />
    </>
  );
  const deleteUserDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteUserDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteUser}
      />
    </>
  );
  const deleteUsersDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteUsersDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedUsers}
      />
    </>
  );

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          <Toolbar
            className="mb-4"
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          ></Toolbar>

          <DataTable
            ref={dt}
            value={allUsers}
            selection={selectedUsers}
            onSelectionChange={(e) => setSelectedUsers(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} allUsers"
            globalFilter={globalFilter}
            emptyMessage="No USERS found."
            header={header}
            responsiveLayout="scroll"
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "4rem" }}
            ></Column>
            <Column
              field="id"
              header="Id"
              sortable
              body={codeBodyTemplate}
              headerStyle={{ minWidth: "3rem" }}
            ></Column>
            <Column
              field="name"
              header="Name"
              sortable
              body={nameBodyTemplate}
              headerStyle={{ minWidth: "15rem" }}
            ></Column>
            {/* <Column header="Image" body={imageBodyTemplate}></Column> */}
            <Column
              field="balance"
              header="Balance"
              body={priceBodyTemplate}
              sortable
            ></Column>
            <Column
              field="phone"
              header="Phone"
              sortable
              body={phoneBodyTemplate}
              headerStyle={{ minWidth: "10rem" }}
            ></Column>

            <Column
              header="Action"
              body={actionBodyTemplate}
              headerStyle={{ minWidth: "10rem" }}
            ></Column>
          </DataTable>

          <Dialog
            visible={userDialog}
            style={{ width: "450px" }}
            header="User Details"
            modal
            className="p-fluid"
            footer={userDialogFooter}
            onHide={hideDialog}
          >
            {user.image && (
              <img
                src={`${contextPath}/demo/images/user/${user.image}`}
                alt={user.image}
                width="150"
                className="mt-0 mx-auto mb-5 block shadow-2"
              />
            )}
            <div className="field">
              <label htmlFor="name">Name</label>
              <InputText
                id="name"
                value={user.name}
                onChange={(e) => onInputChange(e, "name")}
                required
                autoFocus
                className={classNames({
                  "p-invalid": submitted && !user.name,
                })}
              />
              {submitted && !user.name && (
                <small className="p-invalid">Name is required.</small>
              )}
            </div>
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <InputNumber
                id="phone"
                value={user.phone}
                onValueChange={(e) => onInputChange(e, "phone")}
                integeronly
                required
              />
            </div>

            <div className="field">
              <label htmlFor="balance">Balance</label>
              <InputNumber
                id="balance"
                value={user.balance}
                onValueChange={(e) => onInputChange(e, "balance")}
                mode="currency"
                currency="USD"
                // locale="en-US"
                required
              />
            </div>

            <div className="field">
              <label className="mb-3">Has Separate Rate</label>
              <div className="formgrid grid">
                <div className="field-radiobutton col-6">
                  <RadioButton
                    inputId="Yes"
                    name="hasSeparateRate"
                    value="true"
                    onChange={(e) => handleRadio(e, "hasSeparateRate")}
                    checked={user.hasSeparateRate}
                  />
                  <label htmlFor="Yes">Yes</label>
                </div>
                <div className="field-radiobutton col-6">
                  <RadioButton
                    inputId="No"
                    name="hasSeparateRate"
                    value="false"
                    onChange={(e) => handleRadio(e, "hasSeparateRate")}
                    checked={!user.hasSeparateRate}
                  />
                  <label htmlFor="No">No</label>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="mb-3">Deliverable</label>
              <div className="formgrid grid">
                <div className="field-radiobutton col-6">
                  <RadioButton
                    inputId="deliverableYes"
                    name="deliverable"
                    value="true"
                    onChange={(e) => handleRadio(e, "deliverable")}
                    checked={user.deliverable}
                  />

                  <label htmlFor="deliverableYes">Yes</label>
                </div>
                <div className="field-radiobutton col-6">
                  <RadioButton
                    inputId="deliverableNo"
                    name="deliverable"
                    value="false"
                    onChange={(e) => handleRadio(e, "deliverable")}
                    checked={!user.deliverable}
                  />
                  <label htmlFor="deliverableNo">No</label>
                </div>
              </div>
            </div>
          </Dialog>

          <Dialog
            visible={deleteUserDialog}
            style={{ width: "450px" }}
            header="Confirm"
            modal
            footer={deleteUserDialogFooter}
            onHide={hideDeleteUserDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {user && (
                <span>
                  Are you sure you want to delete <b>{user.name}</b>?
                </span>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={deleteUsersDialog}
            style={{ width: "450px" }}
            header="Confirm"
            modal
            footer={deleteUsersDialogFooter}
            onHide={hideDeleteUsersDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {user && (
                <span>
                  Are you sure you want to delete the selected allUsers?
                </span>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
