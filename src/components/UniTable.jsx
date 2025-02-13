import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from '@tanstack/react-table'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Checkbox from './Checkbox'

const UniTable = ({ columns, data, actions, onRowSelect }) => {
  const [rowSelection, setRowSelection] = useState({})
  const [activeMenu, setActiveMenu] = useState(null)
  const [isClosing, setIsClosing] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })

  const handleMenuToggle = (e, rowId) => {
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()
    const isBottom = window.innerHeight - rect.bottom < 200

    if (activeMenu === rowId) {
      setIsClosing(true)
      setTimeout(() => {
        setActiveMenu(null)
        setIsClosing(false)
      }, 200)
    } else {
      setActiveMenu(rowId)
      setIsClosing(false)
      setMenuPosition({
        top: isBottom ? 'auto' : rect.bottom + 8,
        bottom: isBottom ? window.innerHeight - rect.top + 8 : 'auto',
        left: rect.right - 192, // 192px = menu width (w-48 = 12rem = 192px)
      })
    }
  }
  
  const table = useReactTable({
    data,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    columns: [
      // User provided columns
      ...columns,
      // Actions column
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <div className="relative">
            <button
              onClick={(e) => handleMenuToggle(e, row.id)}
              className="p-1 hover:bg-background rounded-full ml-auto block"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {activeMenu === row.id && createPortal(
              <>
                {/* Backdrop */}
                <div 
                  className={`fixed inset-0  z-40 ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}
                  onClick={(e) => handleMenuToggle(e, null)}
                />
                {/* Menu */}
                <div 
                  className="fixed z-50"
                  style={{
                    ...menuPosition,
                    transform: `scale(${isClosing ? 0.95 : 1})`,
                    opacity: isClosing ? 0 : 1,
                    transition: 'all 0.2s ease-out'
                  }}
                >
                  <div className="w-48 bg-body rounded-xl shadow-xl overflow-hidden backdrop-blur-sm">
                    <div className="p-2 space-y-1">
                      {actions?.map((action, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation()
                            action.onClick(row.original)
                            setActiveMenu(null)
                          }}
                          className="flex items-center w-full px-3 py-2.5 text-sm text-text hover:bg-background rounded-lg gap-3 transition-colors duration-150 group"
                        >
                          {action.label === 'Edit' && (
                            <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                          {action.label === 'Delete' && (
                            <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                          {action.label === 'View Details' && (
                            <svg className="w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                          <span className="group-hover:text-text">{action.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>,
              document.body
            )}
          </div>
        ),
        size: 80,
      },
    ],
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (activeMenu !== null) {
        setIsClosing(true)
        setTimeout(() => {
          setActiveMenu(null)
          setIsClosing(false)
        }, 200)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Notify parent of selection changes
  useEffect(() => {
    if (onRowSelect) {
      const selectedRows = table.getSelectedRowModel().rows
      onRowSelect(selectedRows.map(row => row.original))
    }
  }, [rowSelection])

  return (
    <div className="overflow-visible">
      <table className="min-w-full divide-y divide-borderColor">
        <thead className="bg-body border-b border-borderColor">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-sm font-semibold text-text uppercase tracking-wider"
                  style={{ width: header.getSize() }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-background divide-y divide-borderColor">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-background">
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-text font-medium"
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="py-3 flex items-center justify-end gap-2 text-sm font-medium">
        <span>
          {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getPrePaginationRowModel().rows.length
          )}{' '}
          of {table.getPrePaginationRowModel().rows.length}
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-1 hover:bg-background rounded disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-1 hover:bg-background rounded disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default UniTable
