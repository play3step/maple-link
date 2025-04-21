import { Slot } from './Slot'

const CharacterInventory = () => {
  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-[#f8f8f8] rounded-xl shadow-md w-full max-w-[600px]">
      <div className="flex justify-between w-full">
        {/* 왼쪽 5행 2열 */}
        <div className="grid grid-rows-5 grid-cols-2 gap-2">
          {[...Array(10)].map((_, i) => (
            <Slot
              key={`left-${i}`}
              item={`left-${i}`}
            />
          ))}
        </div>

        {/* 가운데 캐릭터 + 아래 슬롯 3개 */}
        <div className="flex flex-col justify-end items-center px-4 gap-8">
          <div className="w-24 h-24 bg-gray-300 rounded-full border border-gray-500 mb-2" />
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <Slot
                key={`bottom-${i}`}
                item={`bottom-${i}`}
              />
            ))}
          </div>
        </div>

        {/* 오른쪽 5행 2열 */}
        <div className="grid grid-rows-5 grid-cols-2 gap-2">
          {[...Array(10)].map((_, i) => (
            <Slot
              key={`right-${i}`}
              item={`right-${i}`}
            />
          ))}
        </div>
      </div>

      {/* 아래 포켓, 벳지 */}
      <div className="flex gap-4">
        <Slot
          key="pocket"
          item="pocket"
        />
        <Slot
          key="badge"
          item="badge"
        />
      </div>
    </div>
  )
}

export default CharacterInventory
