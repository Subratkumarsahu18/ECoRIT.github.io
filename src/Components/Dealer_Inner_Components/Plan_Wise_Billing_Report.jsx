import React, { useState } from 'react';
import ViewPlanForm from './Inner_Plan_Components/ViewPlanForm';
import ViewPlanReport from './Inner_Plan_Components/ViewPlanReport';

const PlanWiseReportBillling=() =>{
  const [viewdetaills, setviewdetaills] = useState(false);
  const setviewfn=()=>{
    setviewdetaills(true);
  }
  const disableviewfn=()=>{
    setviewdetaills(false);
  }
  return (
    
    <>
   {!viewdetaills &&<ViewPlanForm setviewfn={setviewfn}/>}
   {viewdetaills && <ViewPlanReport disableviewfn={disableviewfn}/>}
    </>
  );
}

export default PlanWiseReportBillling;
