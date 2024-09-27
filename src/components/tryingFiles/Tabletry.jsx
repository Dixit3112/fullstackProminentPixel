import 'smart-webcomponents-react/source/styles/smart.default.css';
import { Grid } from 'smart-webcomponents-react/grid';
import { useEffect, useState } from 'react';

export default function UserTableHome() {

    const [dataSource, setDataSource] = useState(() => {

        const savedData = localStorage.getItem('employeeData');
        return savedData ? JSON.parse(savedData) : [
            { "idmUserName": "Ydiyora", "firstName": "Yati", "lastName": "Diyora", "primaryEmail": "Yati.Diyora@gmail.com", "productName": "Caramel Latte" },
            { "idmUserName": "Ssweet", "firstName": "Steven", "lastName": "Sweet", "primaryEmail": "Steven.Sweet@gmail.com", "productName": "Caramel Latte" },
            { "idmUserName": "Dsarapdadiya", "firstName": "Dipraj", "lastName": "Sarapdadiya", "primaryEmail": "dipraj.sarapdadiya@gmail.com", "productName": "Green Tea" },
            { "idmUserName": "Lmoulder", "firstName": "Lisa", "lastName": "Moulder", "primaryEmail": "Lisa.Moulder@gmail.com", "productName": "Caramel Latte" },
            { "idmUserName": "Joh41", "firstName": "Jason", "lastName": "Ohh", "primaryEmail": "jason.oh@gmail.com", "productName": "Milk" },
            { "idmUserName": "Kkepler", "firstName": "Kris", "lastName": "Kepler", "primaryEmail": "kris.kepler@gmail.com", "productName": "Caffe Americano" },
            { "idmUserName": "Lpeck", "firstName": "Lynne", "lastName": "Peck", "primaryEmail": "lynne.peck@gmail.com", "productName": "Caramel Latte" },
            { "idmUserName": "Nitin_nasit", "firstName": "Nitin", "lastName": "Nasit", "primaryEmail": "nitin.nasit@gmail.com", "productName": "Caffe Americano" },
            { "idmUserName": "Vpaliwar", "firstName": "Vivek", "lastName": "Paliwar", "primaryEmail": "vivek.paliwar@gmail.com", "productName": "Espresso con Panna" },
            { "idmUserName": "Mlauer", "firstName": "Maryanne", "lastName": "Lauer", "primaryEmail": "Maryanne.Lauer@gmail.com", "productName": "Green Tea" },
            { "idmUserName": "Sdevling", "firstName": "Sven", "lastName": "Devling", "primaryEmail": "sven.Devling@gmail.com", "productName": "Espresso Truffle" },
            { "idmUserName": "Pburke", "firstName": "Petra", "lastName": "Burke", "primaryEmail": "petra.burke@gmail.com", "productName": "Peppermint Mocha Twist" },
            { "idmUserName": "Mjohnes", "firstName": "Marco", "lastName": "Johnes", "primaryEmail": "Marco.Johnes@gmail.com", "productName": "Caffe Mocha" }
        ]
    });

    const columns = [
        {
            label: 'Action',
            dataField: 'action',
            template: 'custom',
            formatFunction(settings) {
                settings.template = `<div class="w-full flex justify-center bg-green-100"><button onclick="handleCellUpdate('${settings.row.data}')" class="p-0 text-white bg-blue-900 w-[100px] rounded-full">Action</button></div>`;
            },
        },
        {
            label: 'First Name',
            dataField: 'firstName'
        },
        {
            label: 'Last Name',
            dataField: 'lastName'
        },
        {
            label: 'Primary Email',
            dataField: 'primaryEmail'
        },
        {
            label: 'Department',
            dataField: 'department'
        },
        {
            label: 'Designation',
            dataField: 'designation',
        },
        {
            label: 'Contact No.',
            dataField: 'phoneNo',
        },
    ]
    useEffect(() => {
        localStorage.setItem('userDataTable', JSON.stringify(dataSource));
    }, [dataSource])

    const handleCellUpdate = (event) => {
        const { dataField, value, row } = event.detail;
        const updatedData = [...dataSource];
        updatedData[row.index][dataField] = value;
        setDataSource(updatedData);
    }
    const behavior = {
        columnResizeMode: 'growAndShrink'
    }

    const appearance = {
        alternationCount: 2,
        showRowHeader: true,
        showRowHeaderSelectIcon: true,
        showRowHeaderFocusIcon: true
    }

    const paging = {
        enabled: true
    }

    const pager = {
        visible: true
    }

    const sorting = {
        enabled: true
    }

    const editing = {
        enabled: true
    }

    const selection = {
        enabled: true,
        allowCellSelection: true,
        allowRowHeaderSelection: true,
        allowColumnHeaderSelection: true,
        mode: 'extended'
    }

    return (
        <div className='flex justify-center items-center flex-col'>
            <div className='text-center bg-slate-800 text-sky-600'>The Grid in this demo displays data in a series of rows and columns. This
                is the simplest case when the Grid is bound to a local data source.</div>
            <Grid
                dataSource={dataSource}
                columns={columns}
                appearance={appearance}
                behavior={behavior}
                selection={selection}
                paging={paging}
                pager={pager}
                sorting={sorting}
                editing={editing}
                onCellUpdate={handleCellUpdate}
            >
            </Grid>
        </div>
    );
}

// powercfg/batteryreport
