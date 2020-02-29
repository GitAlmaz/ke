import React from "react";
import { PatientAdmin } from "../admin/patient";
import RenderDetail from "./RenderDetail";
import RenderList from "./RenderList";

const patientAdmin = new PatientAdmin();
const View = () => (
  <div>
    <RenderList admin={patientAdmin} />
    <RenderDetail admin={patientAdmin} />
  </div>
);

export default View;
