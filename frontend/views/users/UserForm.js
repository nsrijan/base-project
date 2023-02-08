import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useEffect } from "react";
import { useForm, Form } from "../../components/hooks/useForm";

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

const initialFValues = {
  id: "",
  name: "",
  address: "",
  balance: "",
  clientId: "",
  deliverable: "",
  hasSeparateRate: "",
  phone: "",
};

export default function UserForm(props) {
  const { addOrEdit, recordForEdit } = props;

  // const validate = (fieldValues = values) => {
  //   let temp = { ...errors };
  //   if ("fullName" in fieldValues)
  //     temp.fullName = fieldValues.fullName ? "" : "This field is required.";
  //   if ("email" in fieldValues)
  //     temp.email = /$^|.+@.+..+/.test(fieldValues.email)
  //       ? ""
  //       : "Email is not valid.";
  //   if ("mobile" in fieldValues)
  //     temp.mobile =
  //       fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required.";
  //   if ("departmentId" in fieldValues)
  //     temp.departmentId =
  //       fieldValues.departmentId.length != 0 ? "" : "This field is required.";
  //   setErrors({
  //     ...temp,
  //   });

  //   if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  // };

  // uncomment below line if you want to pass validate as well
  // const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
  //   useForm(initialFValues, true, validate);

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (validate()) {
    addOrEdit(values, resetForm);
    // }
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <div className="card p-fluid">
        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="name2">Name</label>
            <InputText id="name2" type="text" />
          </div>
          <div className="field col">
            <label htmlFor="email2">Email</label>
            <InputText id="email2" type="text" value={values.balance} />
          </div>
        </div>

        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="name2">Name</label>
            <InputText id="name2" type="text" />
          </div>
          <div className="field col">
            <label htmlFor="email2">Email</label>
            <InputText id="email2" type="text" />
          </div>
        </div>
      </div>

      <div className="flex justify-content-between">
        <Button
          label="Save"
          icon="pi pi-check"
          className="p-button-primary"
        ></Button>
        <Button
          label="Reset"
          icon="pi pi-check"
          className="p-button-danger"
        ></Button>
      </div>

      {/* <Grid container>
        <Grid item xs={12} md={6} mb="0.5rem" mt="1rem">
          <Controls.Input
            name="id"
            label="Id"
            value={values.id}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6} mb="0.5rem" mt="1rem">
          <Controls.Input
            label="Name"
            name="name"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
          />
        </Grid>
        <Grid item xs={12} md={6} mb="0.5rem">
          <Controls.Input
            label="Address"
            name="address"
            value={values.address}
            onChange={handleInputChange}
            error={errors.address}
          />
        </Grid>
        <Grid item xs={12} md={6} mb="0.5rem">
          <Controls.Input
            label="Phone"
            name="phone"
            value={values.phone}
            onChange={handleInputChange}
            error={errors.phone}
          />
        </Grid>
        <Grid item xs={12} md={6} mb="0.5rem">
          <Controls.Button type="submit" text="Submit" />
          <span> </span>
          <Controls.Button text="Reset" color="default" onClick={resetForm} />
        </Grid>
      </Grid>
     */}
    </Form>
  );
}
