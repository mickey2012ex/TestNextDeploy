import * as React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { NextPage } from 'next'
import Button from '@material-ui/core/Button'
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'
import { Typography, CircularProgress } from '@material-ui/core'
import { FoodData } from '../interfaces'

const IndexPage: NextPage = () => {
    const [state, setState] = React.useState({
        page: 1,
        count: 1,
        row: 10,
        data: [['Loading Data...']],
        isLoading: false,
    })

    // get data
    const getData = () => {
        setState(prev => ({
            ...prev,
            isLoading: true,
        }))

        xhrRequest(
            `https://script.google.com/macros/s/AKfycbzAhL5WVYqxDkzdWWg2jcXfYNVp9-2Y6LOi_-cX0A/exec?action=read`
        ).then((res: any) => {
            setState(prev => ({ ...prev, data: res.data, isLoading: false, count: 2096 }))
        })
    }

    // mock async function
    const xhrRequest = (url?: string) => {
        console.log('22===' + state.page)
        return new Promise(async (resolve, reject) => {
            const total = 124 // mock record count from server
            // mock page data
            console.log('223')
            const res = await fetch(url + `&page=${state.page + 1}&row=${state.row}`)
            console.log('224')
            const srcData = await res.json()

            const data = Object.keys(srcData.records).map(i => {
                return [srcData.records[i].Name, srcData.records[i].Type, srcData.records[i].Address]
            })

            //const maxRound = Math.floor(Math.random() * 2) + 1
            //const data = [...Array(maxRound)].reduce(acc => acc.push(...srcData.records) && acc, [])
            //console.log(data)
            resolve({
                data,
                total,
            })
        })
    }

    const changePage = (page: number) => {
        setState(prev => ({
            ...prev,
            page: page,
            isLoading: true,
        }))

        console.log('changePage====' + state.page)
        xhrRequest(
            `https://script.google.com/macros/s/AKfycbzAhL5WVYqxDkzdWWg2jcXfYNVp9-2Y6LOi_-cX0A/exec?action=read`
        ).then((res: any) => {
            setState({ page: page, row: state.row, data: res.data, isLoading: false, count: 2096 })
        })
    }

    const columns = ['Name', 'Type', 'Address']
    const { data, page, count, isLoading } = state

    const options: MUIDataTableOptions = {
        filter: true,
        filterType: 'dropdown',
        responsive: 'stacked',
        serverSide: true,
        count: count,
        page: page,

        onTableChange: (action: any, tableState: any) => {
            //console.log(action, tableState)
            // a developer could react to change on an action basis or
            // examine the state as a whole and do whatever they want
            //console.log(tableState.page + '!!!!!!!!!!!!')

            switch (action) {
                case 'changePage':
                    var page = tableState.page
                    changePage(page)
                    break
            }
        },
        onChangeRowsPerPage: (onChangeRowsPerPage: number) => {
            alert(onChangeRowsPerPage)
            setState(prev => ({
                ...prev,
                row: onChangeRowsPerPage,
            }))
            changePage(state.page)
        },
    }

    React.useEffect(() => {
        getData()
        return () => {
            getData()
        }
    }, [])

    return (
        <Layout title="Home | Next.js + TypeScript Example">
            <h1>Hello Next.js 2022👋</h1>
            <Button color="primary">Primary</Button>
            <MUIDataTable
                title={
                    <Typography>
                        ACME Employee list
                        {isLoading && (
                            <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />
                        )}
                    </Typography>
                }
                data={data}
                columns={columns}
                options={options}
            />
            <p>
                <Link href="/about">
                    <a>About</a>
                </Link>
            </p>
        </Layout>
    )
}

export default IndexPage
