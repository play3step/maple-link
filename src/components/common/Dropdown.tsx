import { useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Guild, Member } from '../../types/guild'

interface Props {
  list: Guild[] | Member[]
  onSelect: (selectedName: string) => void
  type: 'guild' | 'member' // 타입을 명시적으로 전달
}

export const Dropdown = ({ list, onSelect, type }: Props) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const handleSelect = (selectedName: string) => {
    setSelectedItem(selectedName)
    onSelect(selectedName)
  }

  return (
    <Menu
      as="div"
      className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
          {selectedItem || (type === 'guild' ? '길드 선택' : '멤버 선택')}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 size-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
        <div className="py-1">
          {list.map(item => (
            <MenuItem
              key={
                type === 'guild'
                  ? (item as Guild).guildName
                  : (item as Member).name
              }>
              <p
                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden cursor-pointer"
                onClick={() =>
                  handleSelect(
                    type === 'guild'
                      ? (item as Guild).guildName
                      : (item as Member).name
                  )
                }>
                {type === 'guild'
                  ? (item as Guild).guildName
                  : (item as Member).name}
              </p>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  )
}
