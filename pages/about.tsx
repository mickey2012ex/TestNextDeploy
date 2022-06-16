import * as React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'
import { sampleUserData } from '../utils/data'
import myJson from '../data/jsonData.json'

const AboutPage = () => {
    const columns = ['Name', 'Title', 'Location']

    const options: MUIDataTableOptions = {
        filterType: 'dropdown',
        responsive: 'vertical',
    }

    const data = myJson.records.map(i => {
        return [i.Name, i.Type, i.Address]
    })

    return (
        <Layout title="About | Next.js + TypeScript Example">
            <h1>About</h1>
            <p>This is the about page</p>
            <MUIDataTable title="All User" data={data} columns={columns} options={options}></MUIDataTable>
            <p>
                <Link href="/">
                    <a>Go home</a>
                </Link>
            </p>
        </Layout>
    )
}

export default AboutPage
