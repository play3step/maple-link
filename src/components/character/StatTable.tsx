import DoubleStatRow from './DoubleStatRow'

interface StatTableProps {
  rows: {
    left: { label: string; value: string }
    right: { label: string; value: string }
  }[]
}

const StatTable = ({ rows }: StatTableProps) => (
  <div className="w-full flex flex-col gap-2">
    {rows.map((row, index) => (
      <DoubleStatRow
        key={index}
        left={row.left}
        right={row.right}
      />
    ))}
  </div>
)

export default StatTable
