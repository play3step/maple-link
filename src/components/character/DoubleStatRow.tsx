interface StatRow {
  label: string
  value: string
}

interface DoubleStatRowProps {
  left: StatRow
  right: StatRow
}

const DoubleStatRow = ({ left, right }: DoubleStatRowProps) => (
  <div className="flex justify-between text-sm gap-2.5">
    <div className="flex-1 flex">
      <span className="font-semibold text-left">{left.label}</span>
      <span className="flex-1 text-right">{left.value}</span>
    </div>
    <div className="flex-1 flex">
      <span className="font-semibold text-left">{right.label}</span>
      <span className="flex-1 text-right">{right.value}</span>
    </div>
  </div>
)

export default DoubleStatRow
