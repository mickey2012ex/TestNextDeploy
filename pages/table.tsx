import * as React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { NextPage } from 'next'
import Button from '@material-ui/core/Button'
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'
import { Typography, CircularProgress } from '@material-ui/core'
import { FoodData } from '../interfaces'
import MaterialTable from 'material-table'

const IndexPage: NextPage = () => {
    return (
        <Layout title="Home | Next.js + TypeScript Example">
            <h1>Hello Next.js 👋</h1>
            <Button color="primary">Primary</Button>
            <MaterialTable
                title="Remote Data Preview"
                columns={[
                    { title: 'Id', field: 'Name' },
                    { title: 'First Name', field: 'Type' },
                    { title: 'Last Name', field: 'Address' },
                ]}
                data={query =>
                    new Promise((resolve, reject) => {
                        let url =
                            'https://script.google.com/macros/s/AKfycbzAhL5WVYqxDkzdWWg2jcXfYNVp9-2Y6LOi_-cX0A/exec?action=read'
                        url += '&row=' + query.pageSize
                        url += '&page=' + (query.page + 1)
                        fetch(url)
                            .then(response => response.json())
                            .then(result => {
                                resolve({
                                    data: result.records,
                                    page: query.page,
                                    totalCount: 2096,
                                })
                            })
                    })
                }
            />
        </Layout>
    )
}

export default IndexPage
