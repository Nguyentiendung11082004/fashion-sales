/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/configs/axios'
import {  useQuery } from '@tanstack/react-query'
import { Table } from 'antd';


// type Props = {}

const CategoryPage = () => {

  const {data, isLoading , isError } = useQuery({
    queryKey: ['category'],
    queryFn: async ()=>{
      try {
       const {data}= await instance.get('/api/category');
       return data
      
      } catch (error) {
        console.log(error);
      }
    }
  })
  // console.log(data);
  const dataSource = data?.data.map((category:any) => ({
    key: category.id,
    ...category,
  }));

const columns=[
  {
    key: "id",
    dataIndex: "id",
    title: "id"
  },
  {
    key: "name",
    dataIndex: "name",
    title: "Tên"
  }
]

  if(isLoading) return <div>...</div>
  console.log(data);
  if(isError) return <div>...</div>
  return (
    <>
    <div>CategoryPage</div>
    <Table dataSource={dataSource} columns={columns} />
    </>
  )
}

export default CategoryPage