import {CiSearch} from 'react-icons/ci'
import { useState } from 'react'


const Inventory = () => {
    const [search, setSearch] = useState('')


    return (
        <div className="container gap-7">
            <div className='flex items-center justify-between'>
                <p className="header">Inventory</p>

                <div className='flex items-center gap-1.5 bg-white rounded-lg py-2 px-3'>
                    <input 
                        type="text" 
                        name='search'
                        className="outline-none bg-transparent text-base"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='search a product'
                    />

                    <CiSearch className='text-lg'/>
                </div>
            </div>

            <div className="bg-white flex flex-col gap-6 p-2.5 rounded-lg">
                <div className="grid grid-cols-table font-semibold gap-2.5">
                    <p>Product name</p>
                    <p>Status</p>
                    <p>Quantity Remaining</p>
                    <p>Max Quantity</p>
                    <p>Last Restock</p>
                </div>

                <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-table gap-2.5 border-b p-1.5 items-center">
                        <p>Dextromethorphan</p>
                        <p className="status-success"> Available </p>
                        <p className="qty">3</p>
                        <p>200</p>
                        <p>Tuesday, June, 2023</p>
                    </div>

                    <div className="grid grid-cols-table gap-2.5 border-b p-1.5 items-center">
                        <p>Hexylresorcinol</p>
                        <p className="status-error"> Empty </p>
                        <p className="qty">0</p>
                        <p>200</p>
                        <p>Friday, April, 2023</p>
                    </div>

                    <div className="grid grid-cols-table gap-2.5 border-b p-1.5 items-center">
                        <p>Chloroquine</p>
                        <p className="status-success"> Available </p>
                        <p className="qty">1</p>
                        <p>200</p>
                        <p>Thursday, May, 2023</p>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Inventory