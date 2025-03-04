interface Props {
  children: React.ReactNode
}

export const GuildItme = ({ children }: Props) => {
  return (
    <div className="p-small bg-secondary rounded-3xl text-small">
      {children}
    </div>
  )
}
