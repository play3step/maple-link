import { Item } from '../../../types/item'

interface Props {
  selectedItem?: Item
}

export const ItemOption = ({ selectedItem }: Props) => {
  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-[#f8f8f8] rounded-xl shadow-md w-[360px]">
      {selectedItem && <img src={selectedItem.item_icon} />}
    </div>
  )
}
