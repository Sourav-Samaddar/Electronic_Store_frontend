import React, { useCallback, useMemo, useRef, useState } from 'react'
import {AgGridReact} from 'ag-grid-react'
//import "ag-grid-enterprise";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getAllUsers } from '../../services/user.service';
import { toast } from 'react-toastify';
import { Button, Col, Container, Row } from 'react-bootstrap';
import './AdminUserTabular.css'
import profileImage from "../../assets/default_profile.jpg"
import { getUserImageUrl } from '../../services/helper.service';
import ImageViewComp from '../../components/ImageViewComp';
import { Link } from 'react-router-dom';
const AdminUserTabular = () => {

  const genderSel = ['Male','Female'];
  const userColumnDefs = [
    {headerName: "", field: "imageName",editable:false,
    filter:false, floatingFilter:false,sortable:false,minWidth: 69, width: 69,maxWidth: 69,
    cellRenderer:(params)=>
        <ImageViewComp 
            compId={params.data.userId} 
            imageName={params.value}
            getImageUrl={getUserImageUrl}
            defaultStyle={profileStyle}
            defaultImage={profileImage}
        />
    },
    {headerName: "Name", field: "name", checkboxSelection:true,
     headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true},
    {headerName: "Email", field: "email", editable:false},
    {headerName: "Gender", field: "gender", cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: genderSel,
      },
    },
    {headerName: "About", field: "about"},
    // {headerName: "Action",field:"email",editable:false,
    //  filter:false, floatingFilter:false,sortable:false,
    // cellRenderer:(params)=>
    // <Button variant='info' onClick={()=>actionButton(params)} size='sm'>
    //   Save
    // </Button>}
  ]

  const profileStyle = {
    height: "50px",
    width: "50px",
    borderRadius: "50%",
    objectFit: "cover"
    }

  const defaultColumDef = {sortable:true, editable:true,
     filter:true, floatingFilter:true, resizable: true, flex:1}

  const [userData,setUserData] = useState(undefined)

  const [gridApi,setGridApi]=useState()
  
  const rowClassRules = useMemo(() => {
    return {
      // row style function
      'blank-user': (params) => {
        var gender = params.data.gender;
        return (gender !== 'Male' && gender !== 'Female');
      },
      'female-user': (params) => {
        var gender = params.data.gender;
        return (gender === 'Female');
      },
      
    };
  }, []);

  const onGridReady = useCallback((params) => {
    getUsers(0,100,'name','asc')
    setGridApi(params)
    //expandFilters(params, "name");
  }, []);

  const getUsers = (pageNumber,pageSize,sortBy,sortDirection) =>{
  
    getAllUsers(pageNumber,pageSize,sortBy,sortDirection)
    .then(userResp => {
      //console.log(userResp)
      setUserData(userResp)
    }).catch(err=>{
      //console.log(err)
      toast.error('Error loading all users')
    })
  }

  const gridRef = useRef();
  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  const actionButton=(params)=>{
    //console.log(params);
  }

  const rowSelectionType='multiple'

  //function will trigger once selection changed
  const onSelectionChanged=(event)=>{
    //console.log(event.api.getSelectedRows())
  }

  const onPaginationChange=(pageSize)=>{
    gridApi.api.paginationSetPageSize(Number(pageSize))
  }

  const expandFilters = (params, ...filters) => {
    const applyFilters = filters?.length > 0 ? filters : null;
    params.api.getToolPanelInstance("filters").expandFilters(applyFilters);
  };

  const applyQuickFilter = (e) => {
    const searchText = e.target.value;
    gridApi.api.setQuickFilter(searchText);
  };
  
  const rowStyle = { background: "#c9daf8" };

  // set background colour on even rows again, this looks bad, should be using CSS classes
  const getRowStyle = params => {
    const rowIndex = params.node.rowIndex;

              return {
                //backgroundColor: rowIndex % 2 === 0 ? "#c9daf8" : "#6d9eeb",
                marginTop: rowIndex === 0 ? "0" : `${10 * rowIndex}px`,
                borderRadius: "8px",
                border: "none",
              };
  };

  return (
    <Container>

        <Container fluid>
          <Row>
            <Col xs={2}>
              <select onChange={(e)=>onPaginationChange(e.target.value)}>
                <option value='10'>10</option>
                <option value='25'>25</option>
                <option value='50'>50</option>
                <option value='100'>100</option>
              </select>
              <Button className='ms-2' variant='info' onClick={onBtnExport} size='sm'>Export</Button>
            </Col>
            
            <Col xs={{offset:8,span:2}}>
              <Button as={Link} to='/admin/users'>Show in Card Layout</Button>
            </Col>
          </Row>
        </Container>
        
        <div className="ag-theme-alpine mt-2"
        style={{
            height: '550px',
        }}>
            <AgGridReact 
            ref={gridRef}
            rowHeight='50'
            rowData={userData?.content} 
            columnDefs={userColumnDefs} 
            defaultColDef={defaultColumDef}
            onGridReady={onGridReady}
            rowStyle={rowStyle}
            getRowStyle={getRowStyle}
            rowClassRules={rowClassRules}
            rowSelection={rowSelectionType}
            onSelectionChanged={onSelectionChanged}
            rowMultiSelectWithClick={true}
            suppressRowClickSelection={true}
            pagination={true}
            paginationPageSize={10}
            // sideBar={{
            //   toolPanels: [
            //     {
            //       id: "columns",
            //       labelDefault: "Columns",
            //       labelKey: "columns",
            //       iconKey: "columns",
            //       toolPanel: "agColumnsToolPanel",
            //       toolPanelParams: {
            //         suppressPivotMode: true,
            //         suppressRowGroups: true,
            //         suppressValues: true,
            //         suppressColumnFilter: false,
            //         suppressColumnSelectAll: false,
            //       },
            //     },
            //     {
            //       id: "filters",
            //       labelDefault: "Filters",
            //       labelKey: "filters",
            //       iconKey: "filter",
            //       toolPanel: "agFiltersToolPanel",
            //       toolPanelParams: {
            //         suppressFilterSearch: false,
            //       },
            //     },
            //     {
            //       id: "QuickSearch",
            //       labelDefault: "Quick Search",
            //       labelKey: "QuickSearch",
            //       iconKey: "menu",
            //       toolPanel: () => (
            //         <div>
            //           <h4>Global Search</h4>
            //           <input
            //             placeholder="Search..."
            //             type="search"
            //             style={{
            //               width: 190,
            //               height: 35,
            //               outline: "none",
            //               border: "none",
            //               borderBottom: `1px #181616 solid`,
            //               padding: `0 5px`,
            //             }}
            //             onChange={applyQuickFilter}
            //           />
            //         </div>
            //       ),
            //     },
            //   ],
            //   // defaultToolPanel: "QuickSearch",
            //   // position: "right",
            // }}
            />
        </div>
    </Container>
    
  )
}

export default AdminUserTabular