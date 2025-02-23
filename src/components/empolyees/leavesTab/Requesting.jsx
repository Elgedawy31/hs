import React from 'react'
import UniBtn from '../../UniBtn'
import { Avatar } from "@heroui/react"

function Requesting() {
  return (
    <div className="p-4 border border-borderColor rounded-lg">
      <div className="flex items-center justify-between">
        {/* Profile Section */}
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"

            className=" w-11 h-11 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium text-text">John Johnson</h3>
            <p className="text-sm text-placeholderText">Senior Product Manager</p>
          </div>
        </div>

        {/* Tags Section */}
        <div className="flex gap-2">
          <span className="px-4 py-1 text-sm bg-secondPrimaryColor text-primary rounded-full">
            Casual
          </span>
          <span className="px-4 py-1 text-sm bg-secondPrimaryColor text-primary rounded-full">
            1day
          </span>
        </div>
      </div>

      {/* Event Title */}
      <h2 className="mt-4 text-lg font-medium text-text">
        Friend's Wedding Celebration
      </h2>

      {/* Date */}
      <p className="mt-2 text-placeholderText">
        10 Apr 2025
      </p>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <UniBtn
          text="Deny"
          className="!bg-transparent border border-borderColor !text-text hover:!bg-background"
        />
        <UniBtn
          text="Approve"
          className="!bg-primary text-white"
        />
      </div>
    </div>
  )
}

export default Requesting
