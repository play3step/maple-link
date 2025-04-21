interface Props {
  selectedItem: string
}

export const ItemOption = ({ selectedItem }: Props) => {
  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-[#f8f8f8] rounded-xl shadow-md w-[360px]">
      {selectedItem}
    </div>
  )
}
