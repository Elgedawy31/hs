import React from 'react'
import { CalendarCog, Send, MoreVertical } from 'lucide-react'
import UniTable from '../../UniTable'
import UniBtn from '../../UniBtn'
import DeleteConfirmation from '../../DeleteConfirmation'
import CardContainer from '../../CardContainer'

const columns = [
        {
            accessorKey: 'startDate',
            header: 'Start Date',
            size: 150,
        },
        {
            accessorKey: 'endDate',
            header: 'End Date',
            size: 150,
        },
        {
            accessorKey: 'duration',
            header: 'Duration',
            size: 120,
        },
        {
            accessorKey: 'type',
            header: 'Type',
            size: 120,
        },
        {
            accessorKey: 'memos',
            header: 'Memos',
            size: 250,
        }
    ]

const data = [
        {
            id: 1,
            startDate: '24 Apr 2025',
            endDate: '25 Apr 2025',
            duration: '1 Day',
            type: 'Casual',
            memos: 'On Vacation from Feb 2 to 5'
        },
        {
            id: 2,
            startDate: '24 Apr 2025',
            endDate: '25 Apr 2025',
            duration: '1 Day',
            type: 'Casual',
            memos: 'On Vacation from Feb 2 to 5'
        },
        {
            id: 3,
            startDate: '24 Apr 2025',
            endDate: '25 Apr 2025',
            duration: '1 Day',
            type: 'Casual',
            memos: 'On Vacation from Feb 2 to 5'
        },
        {
            id: 4,
            startDate: '24 Apr 2025',
            endDate: '25 Apr 2025',
            duration: '1 Day',
            type: 'Casual',
            memos: 'On Vacation from Feb 2 to 5'
        }
    ]

const actions = [
        {
            label: 'Edit',
            onClick: (row) => {
                console.log('Edit:', row);
            },
        },
        {
            label: 'Delete',
            onClick: (row) => {
                console.log('Delete:', row);
            },
        }
    ]


function AllLeaves() {
    const [isModalOpen, setIsModalOpen] = React.useState(false)

    const handleSendReminder = () => {
        // Add your reminder sending logic here
        console.log('Reminder sent')
        setIsModalOpen(false)
    }
    return (
        <div>
            <div className="flex items-center justify-between  mb-4">
                <div className="flex gap-2 items-center">
                    <CalendarCog className="text-2xl" />
                    <h1 className="text-xl font-medium">All Leaves</h1>
                </div>

                <div>
                    <UniBtn onClick={() => setIsModalOpen(true)} text='Send a Warning' className='bg-red-500 text-white' />
                </div>
            </div>

            <CardContainer>
                <UniTable
                    columns={columns}
                    data={data}
                    actions={actions}
                />
            </CardContainer>

            <DeleteConfirmation
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleSendReminder}
                title="Send Warning"
                Icon={Send}
                actionTxt="Send"
                fullMsg='Are you sure you want to send a warning to all employees regarding their leaves?'
            />
        </div>
    )
}

export default AllLeaves
