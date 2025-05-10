interface SelectGuildFormProps {
  guildName: string
  setGuildName: (value: string) => void
  guildWorld: string
  setGuildWorld: (value: string) => void
  onSubmit?: (e: React.FormEvent) => void
}

export const SelectGuildForm = ({
  guildName,
  setGuildName,
  guildWorld,
  setGuildWorld
}: SelectGuildFormProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="guildName"
            className="block text-sm font-medium text-gray-700 mb-1">
            길드 이름
          </label>
          <input
            type="text"
            id="guildName"
            value={guildName}
            onChange={e => setGuildName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="길드 이름을 입력하세요"
            required
          />
        </div>

        <div>
          <label
            htmlFor="guildWorld"
            className="block text-sm font-medium text-gray-700 mb-1">
            월드
          </label>
          <select
            id="guildWorld"
            value={guildWorld}
            onChange={e => setGuildWorld(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            required>
            <option value="">월드를 선택하세요</option>
            <option value="에오스">에오스</option>
            <option value="핼리오스">핼리오스</option>
            <option value="스카니아">스카니아</option>
            <option value="베라">베라</option>
            <option value="루나">루나</option>
            <option value="제니스">제니스</option>
            <option value="크로아">크로아</option>
            <option value="유니온">유니온</option>
            <option value="엘리시움">엘리시움</option>
            <option value="이노시스">이노시스</option>
            <option value="레드">레드</option>
            <option value="오로라">오로라</option>
            <option value="아케인">아케인</option>
            <option value="노바">노바</option>
          </select>
        </div>
      </div>
    </div>
  )
}
